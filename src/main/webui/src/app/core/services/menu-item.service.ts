import { Injectable } from '@angular/core';
import { MenuItem } from '../models/menu-item.model';

@Injectable({
  providedIn: 'root',
})
export class AppMenuService {
  private readonly menuItems: MenuItem[] = [
    {
      icon: 'home',
      label: 'Home',
      path: '/home',
      selected: true,
      title: 'Go home',
    },
    {
      icon: 'dashboard',
      label: 'Dashboard',
      path: '/dashboard',
      selected: false,
      title: 'Go dashbord',
    },
    {
      icon: 'volunteer_activism',
      label: 'Contributions',
      path: '/contributionlist',
      selected: false,
      title: 'Liste des contributions',
    },

    {
      icon: 'credit_card',
      label: 'Ajout contribution',
      path: '/contributionform',
      selected: false,
      title: 'Nouvelle contribution',
    },

    {
      icon: 'info',
      label: 'A propos',
      path: '/about',
      selected: false,
      title: 'A propos',
    },
  ];

  getAll(): MenuItem[] {
    return this.menuItems;
  }
}
