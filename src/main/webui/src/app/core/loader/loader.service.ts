import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Utilisation manuelle (si besoin):
 *
 * this.loaderService.show();
 *
 * this.http.get(...).subscribe({
 *  next: () => {},
 *  complete: () => this.loaderService.hide()
 * });
 */
@Injectable({ providedIn: 'root' })
export class LoaderService {
  private requests = 0;
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  show() {
    this.requests++;
    this.loadingSubject.next(true);
  }

  hide() {
    this.requests--;
    if (this.requests <= 0) {
      this.requests = 0;
      this.loadingSubject.next(false);
    }
  }
}
