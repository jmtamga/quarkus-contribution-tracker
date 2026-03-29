import { Component, inject, ViewChild, computed, signal } from '@angular/core';
import { effect } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartEvent } from 'chart.js';

import { StatsService } from '../../../core/services/stats.service';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [BaseChartDirective, MatFormFieldModule, MatSelectModule],
  templateUrl: './barchart.component.html',
  styleUrl: './barchart.component.scss',
})
export class BarchartComponent {
  statsService = inject(StatsService);
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  selectedYear = signal<number | null>(this.statsService.currentYear());

  yearOptions = computed(() => {
    const years = new Set<number>(this.statsService.transactions().map((t) => t.date.getFullYear()));
    const currentYear = this.statsService.currentYear();
    years.add(currentYear);
    for (let i = 1; i <= 5; i++) {
      years.add(currentYear - i);
    }
    return Array.from(years).sort((a, b) => b - a);
  });

  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
    datasets: [
      {
        data: this.statsService.monthlyTotalsBy(this.selectedYear() ?? undefined),
        label: `Contributions mensuelles (${this.selectedYear()})`,
      },
    ],
  };

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };

  constructor() {
    effect(() => {
      const year = this.selectedYear();
      this.barChartData.datasets[0].data = this.statsService.monthlyTotalsBy(year ?? undefined);
      this.barChartData.datasets[0].label = year
        ? `Contributions mensuelles (${year})`
        : 'Contributions mensuelles (toutes années)';
      // Ensure the chart is redrawn after datasets are updated
      // schedule microtask so ViewChild is present when possible
      Promise.resolve().then(() => this.chart?.update());
    });
  }

  public chartClicked({ event, active }: { event?: ChartEvent; active?: object[] }): void {
    console.log(event, active);
  }

  public onYearChange(value: string | number): void {
    this.selectedYear.set(value === 'all' ? null : Number(value));
  }

  public chartHovered({ event, active }: { event?: ChartEvent; active?: object[] }): void {
    console.log(event, active);
  }
}
