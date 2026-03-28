import { Component, Input } from '@angular/core';
import { MenuItem } from '../core/models/menu-item.model';

import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatIconModule, CommonModule, RouterModule, MatListModule],
  templateUrl: './app-menu.component.html',
  styleUrl: './app-menu.component.scss',
})
export class AppMenuComponent {
  @Input({ required: true }) menuItems: MenuItem[] = [];
  @Input({ required: true }) isCollapsed = false;

  ngOnInit() {}
}
