import { Component, signal, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

import { ThemeService } from './core/services/theme.service';
import { Theme } from './core/models/theme.model';

import { AppMenuService } from './core/services/menu-item.service';
import { AppMenuComponent } from './menu/app-menu.component';
import { MenuItem } from './core/models/menu-item.model';

import { environment } from '../environments/environment';

import { LoaderComponent } from './shared/loader/loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatSidenav,
    CommonModule,
    MatMenuModule,
    AppMenuComponent,
    LoaderComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly title = signal('Contribution tracker');

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile = true;
  isCollapsed = true;

  darkMode = false;

  menu: MenuItem[];

  constructor(
    private titleService: Title,
    private themeService: ThemeService,
    private appMenuService: AppMenuService,
    private breakpointObserver: BreakpointObserver,
  ) {
    this.menu = this.appMenuService.getAll();
    this.titleService.setTitle('Contribution tracker');
  }

  ngOnInit() {
    console.log('environment', environment.production);

    this.breakpointObserver.observe(['(max-width: 800px)']).subscribe((screenSize: BreakpointState) => {
      if (screenSize.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }

  toggleMenu() {
    if (this.isMobile) {
      this.sidenav.toggle();
      this.isCollapsed = false; // On mobile, the menu can never be collapsed
    } else {
      this.sidenav.open(); // On desktop/tablet, the menu can never be fully closed
      this.isCollapsed = !this.isCollapsed;
    }
  }

  toggleTheme() {
    this.darkMode = !this.darkMode;
    this.themeService.enableDarkTheme(this.darkMode);
  }

  getThemes(): Theme[] {
    return this.themeService.getThemes();
  }
  setTheme(themeId: string) {
    this.themeService.setTheme(themeId);
  }
}
