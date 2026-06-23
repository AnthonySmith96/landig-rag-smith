import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { ChatWidgetComponent } from './features/chat/chat-widget.component';
import { LandingComponent } from './features/landing/landing.component';
import { LegalModalComponent } from './shared/components/legal-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LandingComponent, ChatWidgetComponent, LegalModalComponent],
  template: `
    <app-landing (openChat)="openChat()" (openLegal)="legalKey.set($event)"></app-landing>
    <app-chat-widget [isOpen]="chatOpen()" (opened)="openChat()" (closed)="closeChat()"></app-chat-widget>
    <app-legal-modal [documentKey]="legalKey()" (closed)="legalKey.set(null)"></app-legal-modal>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  protected readonly chatOpen = signal(false);
  protected readonly legalKey = signal<string | null>(null);

  protected openChat(): void {
    this.chatOpen.set(true);
  }

  protected closeChat(): void {
    this.chatOpen.set(false);
  }
}
