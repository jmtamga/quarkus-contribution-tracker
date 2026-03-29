import { Component, inject, computed, signal } from '@angular/core';
import { effect } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartEvent, ChartData } from 'chart.js';

import { ContributionsService } from '../../../core/services/contributions.service';
import { ContributionCategory, getCategoryLabel } from '../../../core/models/contribution.model';

import { StatsService } from '../../../core/services/stats.service';

@Component({
  selector: 'app-piechart',
  imports: [BaseChartDirective, MatFormFieldModule, MatSelectModule],
  templateUrl: './piechart.component.html',
  styleUrl: './piechart.component.scss',
})
export class PiechartComponent {
  statsService = inject(StatsService);

  contributionsService = inject(ContributionsService);

  doughnutChartType = 'doughnut' as const;

  selectedYear = signal<number | null>(this.statsService.currentYear());

  yearOptions = computed(() => {
    const years = new Set<number>(this.contributionsService.contributions().map((t) => t.date.getFullYear()));
    const currentYear = this.statsService.currentYear();
    years.add(currentYear);
    // Ajouter les 5 dernières annees
    for (let i = 1; i <= 5; i++) {
      years.add(currentYear - i);
    }
    const result = Array.from(years).sort((a, b) => b - a);
    console.log('yearOptions:', result);
    return result;
  });

  pieChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'left',
      },
    },
  };

  categoryChartData = computed<ChartData<'doughnut'>>(() => {
    const year = this.selectedYear();
    const stats = this.statsService.categoryTotalsBy(year ?? undefined);
    return {
      labels: stats.map(([cat]) => getCategoryLabel(cat)),
      datasets: [
        {
          data: stats.map(([, total]) => (total === 0 ? 0.0001 : total)),
          label: year ? `Par catégorie (${year})` : 'Par catégorie (toutes années)',
          type: 'doughnut',
        },
      ],
    };
  });

  onYearChange(value: string): void {
    this.selectedYear.set(value === 'all' ? null : Number(value));
  }

  constructor() {
    effect(() => {
      // Mise en comm
      //this.barChartData.datasets[0].data = this.service.monthlyTotals();
    });
  }

  public chartClicked({ event, active }: { event?: ChartEvent; active?: object[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent; active?: object[] }): void {
    console.log(event, active);
  }
}
