import { ChangeDetectionStrategy, Component, output } from '@angular/core';

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

  protected openAssistant(): void {
    this.openChat.emit();
  }
}
