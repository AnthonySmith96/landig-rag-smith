import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { Reel } from '../../core/models/reels.models';

@Component({
  selector: 'app-reels-strip',
  standalone: true,
  templateUrl: './reels-strip.component.html',
  styleUrl: './reels-strip.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReelsStripComponent {
  reels = input<Reel[]>([]);
  protected readonly visibleReels = computed(() => this.reels().slice(0, 4));

  protected primaryUrl(reel: Reel): string | null {
    if (!reel.urls) {
      return null;
    }

    return reel.urls['youtube'] ?? reel.urls['tiktok'] ?? reel.urls['instagram'] ?? reel.urls['url'] ?? null;
  }
}
