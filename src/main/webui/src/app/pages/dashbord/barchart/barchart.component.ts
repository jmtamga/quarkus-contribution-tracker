import { Component, inject, ViewChild } from '@angular/core';
import { effect } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartEvent } from 'chart.js';

import { StatsService } from '../../../core/services/stats.service';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './barchart.component.html',
  styleUrl: './barchart.component.html',
})
export class BarchartComponent {
  statsService = inject(StatsService);
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
    datasets: [
      {
        data: this.statsService.monthlyTotals(),
        label: 'Contributions mensuelles',
      },
    ],
  };

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };

  constructor() {
    effect(() => {
      this.barChartData.datasets[0].data = this.statsService.monthlyTotals();
      // Ensure the chart is redrawn after datasets are updated
      // schedule microtask so ViewChild is present when possible
      Promise.resolve().then(() => this.chart?.update());
    });
  }

  public chartClicked({ event, active }: { event?: ChartEvent; active?: object[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent; active?: object[] }): void {
    console.log(event, active);
  }
}
