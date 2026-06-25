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

  protected readonly currentPage = signal(0);
  protected readonly pageSize = 3;

  protected readonly visibleProjects = computed(() => {
    const start = this.currentPage() * this.pageSize;
    return this.projects().slice(start, start + this.pageSize);
  });

  protected readonly totalPages = computed(() => {
    return Math.max(1, Math.ceil(this.projects().length / this.pageSize));
  });

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

  protected nextPage(): void {
    if (this.currentPage() < this.totalPages() - 1) {
      this.currentPage.update(p => p + 1);
    }
  }

  protected prevPage(): void {
    if (this.currentPage() > 0) {
      this.currentPage.update(p => p - 1);
    }
  }
}
