import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';

import { PortfolioProject } from '../../core/models/portfolio.models';

@Component({
  selector: 'app-portfolio-strip',
  standalone: true,
  templateUrl: './portfolio-strip.component.html',
  styleUrl: './portfolio-strip.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioStripComponent {
  projects = input<PortfolioProject[]>([]);

  protected readonly currentPage = signal(0);
  protected readonly pageSize = 3;

  protected readonly visibleProjects = computed(() => {
    const start = this.currentPage() * this.pageSize;
    return this.projects().slice(start, start + this.pageSize);
  });

  protected readonly totalPages = computed(() => {
    return Math.max(1, Math.ceil(this.projects().length / this.pageSize));
  });

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
