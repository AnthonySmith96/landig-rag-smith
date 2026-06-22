import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { ChatPopup } from '../../core/models/chat.models';

@Component({
  selector: 'app-popup-renderer',
  standalone: true,
  template: `
    @if (popup(); as item) {
      <aside class="popup-panel neo-shadow" aria-label="Contenido sugerido">
        <div class="popup-header">
          <strong>{{ item.title }}</strong>
          <span>{{ item.provider }}</span>
        </div>

        @if (item.type === 'iframe' && safeIframeUrl(); as iframeUrl) {
          <iframe
            [src]="iframeUrl"
            [title]="item.title"
            sandbox="allow-scripts allow-same-origin allow-presentation"
            referrerpolicy="strict-origin-when-cross-origin"
            loading="lazy">
          </iframe>
        } @else if (item.type === 'link') {
          <a class="popup-link neo-action" [href]="item.url" target="_blank" rel="noreferrer">Abrir recurso</a>
        } @else if (item.type === 'modal') {
          <div class="modal-resource">
            <span class="material-symbols-outlined" aria-hidden="true">open_in_new</span>
            <a [href]="item.url" target="_blank" rel="noreferrer">{{ item.title }}</a>
          </div>
        }
      </aside>
    }
  `,
  styles: `
    .popup-panel {
      border: 4px solid var(--color-primary);
      background: var(--color-bg);
      padding: 1rem;
    }

    .popup-header {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      border-bottom: 3px solid var(--color-primary);
      padding-bottom: 0.75rem;
      font-family: var(--font-headline);
      text-transform: uppercase;
    }

    .popup-header span {
      color: var(--color-blue);
      font-weight: 900;
    }

    iframe {
      display: block;
      width: 100%;
      aspect-ratio: 16 / 9;
      margin-top: 1rem;
      border: 3px solid var(--color-primary);
      background: var(--color-primary);
    }

    .popup-link,
    .modal-resource a {
      display: inline-block;
      margin-top: 1rem;
      border: 4px solid var(--color-primary);
      background: var(--color-yellow);
      color: var(--color-primary);
      box-shadow: 6px 6px 0 0 var(--color-primary);
      padding: 0.75rem 1rem;
      font-family: var(--font-headline);
      font-weight: 900;
      text-transform: uppercase;
      text-decoration: none;
    }

    .modal-resource {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-top: 1rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopupRendererComponent {
  readonly popup = input<ChatPopup | null>(null);

  private readonly sanitizer = inject(DomSanitizer);

  protected readonly safeIframeUrl = computed<SafeResourceUrl | null>(() => {
    const popup = this.popup();
    if (!popup || popup.type !== 'iframe' || !isAllowedIframeUrl(popup.url, popup.provider)) {
      return null;
    }

    return this.sanitizer.bypassSecurityTrustResourceUrl(popup.url);
  });
}

function isAllowedIframeUrl(value: string, provider: string): boolean {
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase();
    const allowedDomains: Record<string, string[]> = {
      youtube: ['youtube.com', 'www.youtube.com', 'youtube-nocookie.com', 'www.youtube-nocookie.com'],
      tiktok: ['tiktok.com', 'www.tiktok.com'],
      instagram: ['instagram.com', 'www.instagram.com'],
      genially: ['genially.com', 'view.genial.ly'],
      external: []
    };

    const domains = allowedDomains[provider] ?? [];
    return domains.some((domain) => host === domain || host.endsWith(`.${domain}`));
  } catch {
    return false;
  }
}
