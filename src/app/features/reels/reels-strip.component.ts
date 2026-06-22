import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

import { Reel } from '../../core/models/reels.models';
import { PocketBaseService } from '../../core/services/pocketbase.service';

@Component({
  selector: 'app-reels-strip',
  standalone: true,
  templateUrl: './reels-strip.component.html',
  styleUrl: './reels-strip.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReelsStripComponent {
  private readonly pocketBase = inject(PocketBaseService);

  protected readonly reels = signal<Reel[]>([]);
  protected readonly isLoading = signal(true);
  protected readonly error = signal('');
  protected readonly visibleReels = computed(() => this.reels().slice(0, 4));

  constructor() {
    void this.load();
  }

  protected primaryUrl(reel: Reel): string | null {
    if (!reel.urls) {
      return null;
    }

    return reel.urls['youtube'] ?? reel.urls['tiktok'] ?? reel.urls['instagram'] ?? reel.urls['url'] ?? null;
  }

  private async load(): Promise<void> {
    try {
      this.reels.set(await this.pocketBase.getActiveReels());
    } catch {
      this.error.set('Los reels no están disponibles.');
    } finally {
      this.isLoading.set(false);
    }
  }
}
