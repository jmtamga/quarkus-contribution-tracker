import { Injectable, Inject, signal, effect } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Theme } from '../models/theme.model';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly themes: Theme[] = [
    { id: 'deep-blue-dark', primary: '#1976D2', displayName: 'Deep Blue' },
    { id: 'green', primary: '#00796B', displayName: 'Green' },
    { id: 'orange', primary: '#E65100', displayName: 'Orange' },
    { id: 'rose', primary: '#a73453', displayName: 'Rose' },
    { id: 'purple', primary: '#6200EE', displayName: 'Purple' },
    { id: 'red', primary: '#C2185B', displayName: 'Red' },
  ];

  currentTheme = signal<Theme>(this.themes[2]);

  constructor(@Inject(DOCUMENT) private document: Document) {}

  enableDarkTheme(enable: boolean): void {
    const body = this.document.body;
    if (enable) {
      body.style.colorScheme = 'dark';
    } else {
      body.style.colorScheme = 'light';
    }
  }

  getThemes(): Theme[] {
    return this.themes;
  }

  setTheme(themeId: string): void {
    const theme = this.themes.find((t) => t.id === themeId);
    if (theme) {
      this.currentTheme.set(theme);
    }
  }
  updateThemeClass = effect(() => {
    const theme = this.currentTheme();
    this.document.body.classList.remove(...this.themes.map((t) => `${t.id}-theme`));
    this.document.body.classList.add(`${theme.id}-theme`);
  });
}
