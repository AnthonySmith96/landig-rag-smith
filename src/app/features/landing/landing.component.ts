import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';

import { SocialProtocol } from '../../core/models/social.models';
import { PortfolioProject } from '../../core/models/portfolio.models';
import { Reel } from '../../core/models/reels.models';
import { PocketBaseService } from '../../core/services/pocketbase.service';
import { SiteConfigService } from '../../core/services/site-config.service';
import { ContactStripComponent } from '../contact/contact-strip.component';
import { PortfolioStripComponent } from '../portfolio/portfolio-strip.component';
import { ReelsStripComponent } from '../reels/reels-strip.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [PortfolioStripComponent, ReelsStripComponent, ContactStripComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingComponent {
  readonly openLegal = output<'privacy' | 'terms'>();

  protected readonly siteConfig = inject(SiteConfigService);
  private readonly pocketBase = inject(PocketBaseService);

  protected readonly protocols = signal<SocialProtocol[]>([]);
  protected readonly projects = signal<PortfolioProject[]>([]);
  protected readonly reels = signal<Reel[]>([]);

  constructor() {
    void this.loadAll();
  }

  private async loadAll(): Promise<void> {
    try {
      this.protocols.set(await this.pocketBase.getSocialProtocols());
    } catch {}
    try {
      this.projects.set(await this.pocketBase.getActiveProjects());
    } catch {}
    try {
      this.reels.set(await this.pocketBase.getActiveReels());
    } catch {}
  }
}
