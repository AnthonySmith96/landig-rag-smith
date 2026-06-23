import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';

import { SocialProtocol } from '../../core/models/social.models';
import { PocketBaseService } from '../../core/services/pocketbase.service';
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
  readonly openChat = output<void>();
  readonly openLegal = output<string>();

  private readonly pocketBase = inject(PocketBaseService);
  protected readonly protocols = signal<SocialProtocol[]>([]);

  constructor() {
    void this.loadSocialProtocols();
  }

  protected openAssistant(): void {
    this.openChat.emit();
  }

  private async loadSocialProtocols(): Promise<void> {
    try {
      const list = await this.pocketBase.getSocialProtocols();
      this.protocols.set(list);
    } catch {
      this.protocols.set([]);
    }
  }
}
