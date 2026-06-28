import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, computed, effect, inject, input, output, signal, viewChild, OnInit } from '@angular/core';

import { ChatMessage, ChatPopup } from '../../core/models/chat.models';
import { PortfolioProject } from '../../core/models/portfolio.models';
import { Reel } from '../../core/models/reels.models';
import { ChatService } from '../../core/services/chat.service';
import { PocketBaseService } from '../../core/services/pocketbase.service';
import { SiteConfigService } from '../../core/services/site-config.service';
import { TurnstileService } from '../../core/services/turnstile.service';
import { PopupRendererComponent } from './popup-renderer.component';

import { MarkdownPipe } from '../../shared/pipes/markdown.pipe';

const USER_ID_KEY = 'as_user_id';

@Component({
  selector: 'app-chat-widget',
  standalone: true,
  imports: [PopupRendererComponent, MarkdownPipe],
  templateUrl: './chat-widget.component.html',
  styleUrl: './chat-widget.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatWidgetComponent implements AfterViewInit, OnInit {
  readonly isOpen = input(false);
  readonly opened = output<void>();
  readonly closed = output<void>();

  protected readonly siteConfig = inject(SiteConfigService);
  private readonly chat = inject(ChatService);
  private readonly pocketBase = inject(PocketBaseService);
  private readonly turnstile = inject(TurnstileService);
  private readonly turnstileHost = viewChild<ElementRef<HTMLDivElement>>('turnstileHost');
  private readonly feedContainer = viewChild<ElementRef<HTMLDivElement>>('feedContainer');
  private readonly sessionId = makeSessionId();
  private readonly userId = getOrCreateUserId();

  protected readonly draft = signal('');
  protected readonly selectedLanguage = signal('Español');
  protected readonly messages = signal<ChatMessage[]>([]);
  protected readonly isLoading = signal(false);
  protected readonly isHistoryLoading = signal(false);
  protected readonly hasMoreHistory = signal(false);
  protected readonly historyOffset = signal(0);
  protected readonly error = signal('');
  protected readonly suggestedReelIds = signal<string[]>([]);
  protected readonly suggestedProjectIds = signal<string[]>([]);
  protected readonly activePopup = signal<ChatPopup | null>(null);
  protected readonly projects = signal<PortfolioProject[]>([]);
  protected readonly reels = signal<Reel[]>([]);
  protected readonly avatarUrl = signal<string | null>(null);

  protected readonly suggestedProjects = computed(() => {
    const ids = new Set(this.suggestedProjectIds());
    return this.projects().filter((project) => ids.has(project.id));
  });

  protected readonly suggestedReels = computed(() => {
    const ids = new Set(this.suggestedReelIds());
    return this.reels().filter((reel) => ids.has(reel.id));
  });

  constructor() {
    void this.loadSuggestionsSource();

    effect(() => {
      const container = this.feedContainer()?.nativeElement;
      this.messages();
      this.isLoading();

      // Initialize default language
      const langs = this.siteConfig.supportedLanguages();
      if (langs.length > 0 && this.selectedLanguage() === 'Español' && !langs.includes('Español')) {
        this.selectedLanguage.set(langs[0]);
      }

      if (container) {
        setTimeout(() => {
          container.scrollTo({
            top: container.scrollHeight,
            behavior: 'smooth'
          });
        }, 50);
      }
    });
  }

  ngOnInit(): void {
    void this.loadHistory();
  }

  protected async loadHistory(): Promise<void> {
    if (this.isHistoryLoading()) return;
    this.isHistoryLoading.set(true);
    try {
      const response = await this.chat.getHistory(this.userId, this.historyOffset());
      
      const newMessages: ChatMessage[] = [];
      // History is ordered by -created, so the first item is the newest in the batch.
      // We want to insert them at the top in chronological order.
      // So we reverse the batch before adding.
      const reversedBatch = [...response.items].reverse();

      for (const item of reversedBatch) {
        newMessages.push({
          id: `${item.id}_user`,
          role: 'user',
          text: item.user_message,
          createdAt: item.created_at
        });
        newMessages.push({
          id: `${item.id}_assistant`,
          role: 'assistant',
          text: item.assistant_response,
          createdAt: item.created_at + 1,
          outOfBounds: item.out_of_bounds
        });
      }

      this.messages.update(prev => {
        // If this is the first load and we got nothing, show welcome message
        if (prev.length === 0 && newMessages.length === 0) {
          return [{
            id: makeMessageId(),
            role: 'assistant',
            text: this.siteConfig.welcomeMessage(),
            createdAt: Date.now()
          }];
        }
        return [...newMessages, ...prev];
      });

      this.historyOffset.set(response.next_offset || 0);
      this.hasMoreHistory.set(response.next_offset !== null);
    } catch {
      // Fall silent on history error, just show welcome if empty
      this.messages.update(prev => {
        if (prev.length === 0) {
          return [{
            id: makeMessageId(),
            role: 'assistant',
            text: this.siteConfig.welcomeMessage(),
            createdAt: Date.now()
          }];
        }
        return prev;
      });
    } finally {
      this.isHistoryLoading.set(false);
    }
  }

  protected close(): void {
    this.closed.emit();
  }

  protected open(): void {
    this.opened.emit();
  }

  protected updateDraft(event: Event): void {
    const target = event.target;
    if (target instanceof HTMLInputElement) {
      this.draft.set(target.value);
    }
  }

  protected updateLanguage(event: Event): void {
    const target = event.target;
    if (target instanceof HTMLSelectElement) {
      this.selectedLanguage.set(target.value);
    }
  }

  protected handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      void this.send();
    }
  }

  protected async send(): Promise<void> {
    const message = this.draft().trim();
    if (!message || this.isLoading()) {
      return;
    }

    const host = this.turnstileHost()?.nativeElement;
    if (!host) {
      this.error.set('El reto de seguridad aún no está listo.');
      return;
    }

    this.appendMessage('user', message);
    this.draft.set('');
    this.error.set('');
    this.isLoading.set(true);

    try {
      const token = await this.turnstile.execute(host);
      const response = await this.chat.sendMessage(message, this.sessionId, this.userId, token, this.selectedLanguage());
      this.appendMessage('assistant', response.answer, response.out_of_bounds, response.cta ?? undefined);
      this.suggestedReelIds.set(response.suggested_reels);
      this.suggestedProjectIds.set(response.suggested_projects);
      this.activePopup.set(response.popup);
    } catch (err) {
      console.error('Error al enviar mensaje en el chat:', err);
      this.error.set('No pude completar la solicitud. Intenta de nuevo.');
      this.appendMessage('system', 'SISTEMA: Hubo un problema de conexión. Por favor, intenta de nuevo.');
    } finally {
      this.isLoading.set(false);
    }
  }

  private appendMessage(role: ChatMessage['role'], text: string, outOfBounds = false, cta?: { label: string; href: string }): void {
    this.messages.update((messages) => [
      ...messages,
      {
        id: makeMessageId(),
        role,
        text,
        createdAt: Date.now(),
        outOfBounds,
        cta
      }
    ]);
  }

  private async loadSuggestionsSource(): Promise<void> {
    try {
      const [projects, reels] = await Promise.all([
        this.pocketBase.getActiveProjects(),
        this.pocketBase.getActiveReels()
      ]);
      this.projects.set(projects);
      this.reels.set(reels);
    } catch {
      this.projects.set([]);
      this.reels.set([]);
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.updateFabPosition();
    }, 0);
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.updateFabPosition();
  }

  @HostListener('window:resize', [])
  onWindowResize(): void {
    this.updateFabPosition();
  }

  private updateFabPosition(): void {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }
    const fab = document.querySelector('.chat-fab') as HTMLElement;
    const footer = document.querySelector('.footer');
    if (!fab || !footer) return;

    const footerRect = footer.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    if (footerRect.top < viewportHeight) {
      const visibleFooterHeight = viewportHeight - footerRect.top;
      fab.style.bottom = `${visibleFooterHeight + 24}px`;
    } else {
      fab.style.bottom = '';
    }
  }
}

function makeSessionId(): string {
  if (crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `session_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

function makeMessageId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

function getOrCreateUserId(): string {
  if (typeof localStorage === 'undefined') {
    return crypto.randomUUID ? crypto.randomUUID() : `user_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  }

  let userId = localStorage.getItem(USER_ID_KEY);
  if (!userId) {
    userId = crypto.randomUUID ? crypto.randomUUID() : `user_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(USER_ID_KEY, userId);
  }
  return userId;
}
