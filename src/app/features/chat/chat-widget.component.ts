import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, computed, effect, inject, input, output, signal, viewChild } from '@angular/core';

import { ChatMessage, ChatPopup } from '../../core/models/chat.models';
import { PortfolioProject } from '../../core/models/portfolio.models';
import { Reel } from '../../core/models/reels.models';
import { ChatService } from '../../core/services/chat.service';
import { PocketBaseService } from '../../core/services/pocketbase.service';
import { TurnstileService } from '../../core/services/turnstile.service';
import { PopupRendererComponent } from './popup-renderer.component';

@Component({
  selector: 'app-chat-widget',
  standalone: true,
  imports: [PopupRendererComponent],
  templateUrl: './chat-widget.component.html',
  styleUrl: './chat-widget.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatWidgetComponent implements AfterViewInit {
  readonly isOpen = input(false);
  readonly opened = output<void>();
  readonly closed = output<void>();

  private readonly chat = inject(ChatService);
  private readonly pocketBase = inject(PocketBaseService);
  private readonly turnstile = inject(TurnstileService);
  private readonly turnstileHost = viewChild<ElementRef<HTMLDivElement>>('turnstileHost');
  private readonly feedContainer = viewChild<ElementRef<HTMLDivElement>>('feedContainer');
  private readonly sessionId = makeSessionId();

  protected readonly draft = signal('');
  protected readonly messages = signal<ChatMessage[]>([
    {
      id: makeMessageId(),
      role: 'assistant',
      text: 'Hola. Pregúntame sobre mi experiencia, proyectos, contenido o stack técnico.',
      createdAt: Date.now()
    }
  ]);
  protected readonly isLoading = signal(false);
  protected readonly error = signal('');
  protected readonly suggestedReelIds = signal<string[]>([]);
  protected readonly suggestedProjectIds = signal<string[]>([]);
  protected readonly activePopup = signal<ChatPopup | null>(null);
  protected readonly projects = signal<PortfolioProject[]>([]);
  protected readonly reels = signal<Reel[]>([]);

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
      const response = await this.chat.sendMessage(message, this.sessionId, token);
      this.appendMessage('assistant', response.answer, response.out_of_bounds);
      this.suggestedReelIds.set(response.suggested_reels);
      this.suggestedProjectIds.set(response.suggested_projects);
      this.activePopup.set(response.popup);
    } catch {
      this.error.set('El asistente no pudo completar la solicitud.');
      this.appendMessage('system', 'SISTEMA: La solicitud falló antes de completarse.');
    } finally {
      this.isLoading.set(false);
    }
  }

  private appendMessage(role: ChatMessage['role'], text: string, outOfBounds = false): void {
    this.messages.update((messages) => [
      ...messages,
      {
        id: makeMessageId(),
        role,
        text,
        createdAt: Date.now(),
        outOfBounds
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
