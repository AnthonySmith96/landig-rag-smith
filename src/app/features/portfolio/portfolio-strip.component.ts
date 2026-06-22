import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

import { PortfolioProject } from '../../core/models/portfolio.models';
import { PocketBaseService } from '../../core/services/pocketbase.service';

@Component({
  selector: 'app-portfolio-strip',
  standalone: true,
  templateUrl: './portfolio-strip.component.html',
  styleUrl: './portfolio-strip.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioStripComponent {
  private readonly pocketBase = inject(PocketBaseService);

  protected readonly projects = signal<PortfolioProject[]>([]);
  protected readonly isLoading = signal(true);
  protected readonly error = signal('');
  protected readonly visibleProjects = computed(() => this.projects().slice(0, 3));

  constructor() {
    void this.load();
  }

  private async load(): Promise<void> {
    try {
      this.projects.set(await this.pocketBase.getActiveProjects());
    } catch {
      this.error.set('El portafolio no está disponible.');
    } finally {
      this.isLoading.set(false);
    }
  }
}
