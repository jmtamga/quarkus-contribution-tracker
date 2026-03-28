// shared/loader/loader.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderService } from '../../core/loader/loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    @if (loader.loading$ | async) {
      <div class="overlay">
        <mat-progress-spinner mode="indeterminate" diameter="60" strokeWidth="5" />
      </div>
    }
  `,
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  constructor(public loader: LoaderService) {}
}
