import { ChangeDetectionStrategy, Component, computed, effect, inject, input, output, signal } from '@angular/core';

import { PocketBaseService } from '../../core/services/pocketbase.service';

@Component({
  selector: 'app-legal-modal',
  standalone: true,
  template: `
    @if (documentKey()) {
      <div class="modal-overlay" (click)="close()">
        <div class="modal-container" (click)="$event.stopPropagation()">
          <header class="modal-header">
            <h2>{{ title() }}</h2>
            <button type="button" class="close-btn neo-action" (click)="close()" aria-label="Cerrar">
              <span class="material-symbols-outlined" aria-hidden="true">close</span>
            </button>
          </header>

          <div class="modal-body">
            @if (isLoading()) {
              <div class="status-container">
                <span class="material-symbols-outlined spinner" aria-hidden="true">hourglass_empty</span>
                <p>Cargando documento...</p>
              </div>
            } @else if (error()) {
              <div class="status-container status-container--error">
                <span class="material-symbols-outlined" aria-hidden="true">warning</span>
                <p>{{ error() }}</p>
              </div>
            } @else {
              <div class="modal-content">
                @for (para of paragraphs(); track para) {
                  <p [class.legal-subheading]="isSubheading(para)">{{ para }}</p>
                }
              </div>
            }
          </div>
        </div>
      </div>
    }
  `,
  styles: `
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(26, 26, 26, 0.75);
      backdrop-filter: blur(8px);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
    }

    .modal-container {
      position: relative;
      width: min(100%, 760px);
      max-height: 85vh;
      border: 4px solid var(--color-primary);
      background: var(--color-bg-bright);
      box-shadow: 8px 8px 0 0 var(--color-primary);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      animation: modalEnter 200ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    @keyframes modalEnter {
      from {
        opacity: 0;
        transform: scale(0.96) translateY(10px);
      }
      to {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }

    .modal-header {
      padding: 1.25rem 1.5rem;
      border-bottom: 4px solid var(--color-primary);
      background: var(--color-yellow);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }

    .modal-header h2 {
      margin: 0;
      font-family: var(--font-headline);
      font-size: clamp(1.2rem, 3.5vw, 1.8rem);
      font-weight: 900;
      text-transform: uppercase;
      color: var(--color-primary);
    }

    .close-btn {
      background: white;
      border: 3px solid var(--color-primary);
      color: var(--color-primary);
      width: 2.5rem;
      height: 2.5rem;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 3px 3px 0 0 var(--color-primary);
    }

    .close-btn:hover {
      background: var(--color-red);
      color: white;
    }

    .modal-body {
      flex: 1;
      overflow-y: auto;
      background: var(--color-bg-bright);
    }

    .modal-content {
      padding: 2rem 2.25rem;
      font-family: var(--font-body);
      color: var(--color-primary);
      line-height: 1.65;
      font-size: 1.05rem;
    }

    .modal-content p {
      margin: 0 0 1.25rem 0;
    }

    .modal-content p:last-child {
      margin-bottom: 0;
    }

    .legal-subheading {
      font-family: var(--font-headline);
      font-weight: 700;
      font-size: 1.2rem;
      margin-top: 1.75rem !important;
      margin-bottom: 0.75rem !important;
      color: var(--color-primary);
      text-transform: uppercase;
    }

    .status-container {
      padding: 4rem 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      font-family: var(--font-headline);
      font-weight: 700;
      font-size: 1.2rem;
      color: var(--color-muted);
    }

    .status-container--error {
      color: var(--color-red);
    }

    .spinner {
      font-size: 3rem;
      animation: spin 1.5s linear infinite;
    }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LegalModalComponent {
  readonly documentKey = input<string | null>(null);
  readonly closed = output<void>();

  private readonly pocketBase = inject(PocketBaseService);

  protected readonly document = signal<{ title: string; content: string } | null>(null);
  protected readonly isLoading = signal(false);
  protected readonly error = signal('');

  protected readonly title = computed(() => {
    return this.document()?.title || (this.documentKey() === 'privacy' ? 'Política de Privacidad' : 'Términos del Servicio');
  });

  protected readonly paragraphs = computed(() => {
    const content = this.document()?.content;
    if (!content) return [];
    return content.split('\n\n').map(p => p.trim()).filter(p => p.length > 0);
  });

  constructor() {
    effect(() => {
      const key = this.documentKey();
      if (key) {
        void this.loadDocument(key);
      } else {
        this.document.set(null);
        this.error.set('');
      }
    });
  }

  protected close(): void {
    this.closed.emit();
  }

  protected isSubheading(text: string): boolean {
    return /^\d+\./.test(text) || (text === text.toUpperCase() && text.length < 100);
  }

  private async loadDocument(key: string): Promise<void> {
    this.isLoading.set(true);
    this.error.set('');
    this.document.set(null);

    try {
      const doc = await this.pocketBase.getLegalDocument(key);
      if (doc) {
        this.document.set(doc);
      } else {
        this.error.set('No se pudo encontrar el documento legal.');
      }
    } catch {
      this.error.set('Error de conexión al cargar el documento.');
    } finally {
      this.isLoading.set(false);
    }
  }
}
