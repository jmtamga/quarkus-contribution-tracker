import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule, Router } from '@angular/router';

import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { ContributionsService } from '../../core/services/contributions.service';
import { StatsService } from '../../core/services/stats.service';

export interface TabItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-dashbord.component',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, MatTabsModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.scss',
})
export class DashbordComponent implements OnInit {
  dashboardService = inject(StatsService);
  router = inject(Router);
  contributionsService = inject(ContributionsService);

  total = () => this.contributionsService.contributions().reduce((sum, t) => sum + t.amount, 0);

  tabs: TabItem[] = [
    {
      label: 'Contribution par mois',
      icon: 'bar_chart',
      route: 'chart',
    },

    {
      label: 'Contribution par catégorie',
      icon: 'pie_chart',
      route: 'piechart',
    },
  ];

  ngOnInit() {
    this.router.navigate(['/dashboard/chart']);
  }
}
