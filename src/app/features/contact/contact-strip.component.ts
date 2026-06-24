import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SiteConfigService } from '../../core/services/site-config.service';

@Component({
  selector: 'app-contact-strip',
  standalone: true,
  template: `
    <section class="contact-band" id="connect" aria-labelledby="contact-title">
      <div>
        <h2 id="contact-title">Contacto</h2>
        <p>{{ siteConfig.contactTagline() }}</p>
      </div>
      <a class="neo-action" [href]="'mailto:' + siteConfig.contactEmail()">{{ siteConfig.contactCta() }}</a>
    </section>
  `,
  styles: `
    .contact-band {
      position: relative;
      width: min(100%, 1120px);
      margin: 5rem auto 0;
      border: 4px solid var(--color-primary);
      background: var(--color-primary);
      color: var(--color-yellow);
      padding: clamp(1.5rem, 4vw, 3rem);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
      overflow: hidden;
      box-shadow: 6px 6px 0 0 var(--color-primary);
    }

    .contact-band::after {
      content: "";
      position: absolute;
      right: -4rem;
      bottom: -4rem;
      width: 12rem;
      height: 12rem;
      border: 4px solid var(--color-yellow);
      transform: rotate(12deg);
      opacity: 0.24;
    }

    .contact-band > * {
      position: relative;
      z-index: 1;
    }

    h2 {
      margin: 0;
      font-family: var(--font-headline);
      font-size: clamp(2rem, 6vw, 4rem);
      font-weight: 900;
      text-transform: uppercase;
    }

    p {
      margin: 0.5rem 0 0;
      color: white;
      font-size: 1.1rem;
    }

    a {
      border: 4px solid var(--color-primary);
      background: var(--color-yellow);
      color: var(--color-primary);
      box-shadow: 6px 6px 0 0 white;
      padding: 1rem 1.25rem;
      font-family: var(--font-headline);
      font-weight: 900;
      text-transform: uppercase;
      text-decoration: none;
      white-space: nowrap;
    }

    @media (max-width: 720px) {
      .contact-band {
        align-items: flex-start;
        flex-direction: column;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactStripComponent {
  protected readonly siteConfig = inject(SiteConfigService);
}
