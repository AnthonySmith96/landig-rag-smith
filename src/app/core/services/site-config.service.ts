import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Title, Meta } from '@angular/platform-browser';

import { environment } from '../../../environments/environment';

export interface SiteConfig {
  brand_name: string;
  site_title: string;
  site_description: string;
  hero_line_1: string;
  hero_line_2: string;
  hero_line_3: string;
  hero_paragraph: string;
  cta_text: string;
  welcome_message: string;
  chat_header: string;
  footer_brand: string;
  footer_text: string;
  contact_tagline: string;
  contact_cta: string;
  contact_email: string;
  persona_name: string;
  avatar_url: string | null;
}

@Injectable({ providedIn: 'root' })
export class SiteConfigService {
  private readonly http = inject(HttpClient);
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);

  readonly brandName = signal('Anthony Smith');
  readonly heroLine1 = signal('Diseñando');
  readonly heroLine2 = signal('el software');
  readonly heroLine3 = signal('del mañana');
  readonly heroParagraph = signal('Experto en arquitectura e implementación de software empresarial potenciado por Inteligencia Artificial. Integración de chatbots, agentes autónomos y arquitecturas de alto rendimiento para desplegar ecosistemas escalables y eficientes.');
  readonly ctaText = signal('Contrátame');
  readonly welcomeMessage = signal('¿Qué onda? Soy Anthony 👋 Pregúntame lo que quieras sobre tech, IA, desarrollo de software o los temas de mis reels.');
  readonly chatHeader = signal('Chat con Anthony');
  readonly footerBrand = signal('CyberIndustree');
  readonly footerText = signal('Hecho con 🖤 por Cyberindustree');
  readonly contactTagline = signal('Arquitectura técnica, sistemas Angular y productos con IA aplicada.');
  readonly contactCta = signal('Hablemos');
  readonly contactEmail = signal('contact@anthonysmith.org');
  readonly personaName = signal('Anthony');
  readonly avatarUrl = signal<string | null>(null);

  async loadConfig(): Promise<void> {
    try {
      const baseUrl = environment.pocketBaseUrl || '';
      const config = await firstValueFrom(this.http.get<SiteConfig>(`${baseUrl}/api/custom/site-config`));
      
      this.brandName.set(config.brand_name);
      this.heroLine1.set(config.hero_line_1);
      this.heroLine2.set(config.hero_line_2);
      this.heroLine3.set(config.hero_line_3);
      this.heroParagraph.set(config.hero_paragraph);
      this.ctaText.set(config.cta_text);
      this.welcomeMessage.set(config.welcome_message);
      this.chatHeader.set(config.chat_header);
      this.footerBrand.set(config.footer_brand);
      this.footerText.set(config.footer_text);
      this.contactTagline.set(config.contact_tagline);
      this.contactCta.set(config.contact_cta);
      this.contactEmail.set(config.contact_email);
      this.personaName.set(config.persona_name);
      this.avatarUrl.set(config.avatar_url ? `${baseUrl}${config.avatar_url}` : null);

      if (config.site_title) {
        this.titleService.setTitle(config.site_title);
      }
      if (config.site_description) {
        this.metaService.updateTag({ name: 'description', content: config.site_description });
      }
    } catch {
      console.warn('Failed to load site config from backend. Using defaults.');
    }
  }
}
