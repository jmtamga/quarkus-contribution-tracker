import { Injectable, computed, inject } from '@angular/core';
import { ContributionsService } from './contributions.service';
import { ContributionCategory, Contribution } from '../../core/models/contribution.model';

@Injectable({ providedIn: 'root' })
export class StatsService {
  private contributionsService = inject(ContributionsService);

  readonly transactions = this.contributionsService.contributions;

  readonly currentYear = computed(() => new Date().getFullYear());

  totalYear = computed(() => this.totalYearBy(this.currentYear()));

  totalYearBy(year?: number): number {
    return this.transactions()
      .filter((t) => (year ? t.date.getFullYear() === year : true))
      .reduce((sum, t) => sum + t.amount, 0);
  }

  monthlyTotals = computed(() => this.monthlyTotalsBy(this.currentYear()));

  monthlyTotalsBy(year?: number): number[] {
    const months = Array(12).fill(0);
    this.transactions()
      .filter((t) => (year ? t.date.getFullYear() === year : true))
      .forEach((t) => {
        months[t.date.getMonth()] += t.amount;
      });
    return months;
  }

  averagePerMonth = computed(() => this.totalYear() / 12);

  categoryTotalsYear = computed(() => this.categoryTotalsBy(this.currentYear()));

  categoryTotalsBy(year?: number): Array<[ContributionCategory, number]> {
    const map = new Map<ContributionCategory, number>();

    this.transactions()
      .filter((t) => (year ? t.date.getFullYear() === year : true))
      .forEach((t) => {
        map.set(t.category, (map.get(t.category) ?? 0) + t.amount);
      });

    return Array.from(map.entries());
  }
}
