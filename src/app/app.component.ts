import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { ChatWidgetComponent } from './features/chat/chat-widget.component';
import { LandingComponent } from './features/landing/landing.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LandingComponent, ChatWidgetComponent],
  template: `
    <app-landing (openChat)="openChat()"></app-landing>
    <app-chat-widget [isOpen]="chatOpen()" (opened)="openChat()" (closed)="closeChat()"></app-chat-widget>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  protected readonly chatOpen = signal(false);

  protected openChat(): void {
    this.chatOpen.set(true);
  }

  protected closeChat(): void {
    this.chatOpen.set(false);
  }
}
