import { Routes } from '@angular/router';
import { DashbordComponent } from './pages/dashbord/dashbord.component';
import { HomeComponent } from './pages/home/home.component';

import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'dashboard',
    component: DashbordComponent,
    children: [
      {
        path: 'chart',
        loadComponent: () => import('./pages/dashbord/barchart/barchart.component').then((m) => m.BarchartComponent),
      },

      {
        path: 'piechart',
        loadComponent: () => import('./pages/dashbord/piechart/piechart.component').then((m) => m.PiechartComponent),
      },
    ],
  },
  {
    path: 'contributionlist',
    loadComponent: () =>
      import('./pages/contributions/contribution-list/contribution-list.component').then(
        (m) => m.ContributionListComponent
      ),
  },
  {
    path: 'contributionform/:id',
    loadComponent: () =>
      import('./pages/contributions/contribution-form/contribution-form.component').then(
        (m) => m.ContributionFormComponent
      ),
  },

  {
    path: 'contributionform',
    loadComponent: () =>
      import('./pages/contributions/contribution-form/contribution-form.component').then(
        (m) => m.ContributionFormComponent
      ),
  },
  {
    path: 'about',
    component: AboutComponent,
  },
];
