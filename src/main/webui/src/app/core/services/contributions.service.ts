import { Injectable, inject, signal, effect, DestroyRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, EMPTY } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Contribution } from '../models/contribution.model';
import { environment } from '../../../environments/environment';

import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ContributionsService {
  private http = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  private readonly url = `${environment.url.endpoint}/api/contributions`;

  /* =======================
     STATE
     ======================= */
  private readonly _contributions = signal<Contribution[]>([]);
  readonly contributions = this._contributions.asReadonly();

  private readonly _reload = signal<number>(0);
  readonly error = signal<string | null>(null);

  readonly loading = signal(false);

  /* =======================
     EFFECTS
     ======================= */
  constructor() {
    effect(() => {
      // dependance explicite => declenche l'effet
      this._reload();

      this.loading.set(true);
      this.error.set(null);

      this.http
        .get<Contribution[]>(`${this.url}/all`)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (data) => {
            this._contributions.set(
              data.map((c) => ({
                ...c,
                date: new Date(c.date),
              })),
            );
            this.loading.set(false);
          },
          error: (err) => {
            this.error.set(err?.message || 'Erreur lors du chargement');
            this.loading.set(false);
            console.error('Erreur chargement contributions:', err);
          },
        });
    });
  }

  refresh(): void {
    this._reload.update((v) => v + 1);
  }

  add(contribution: Contribution) {
    return this.http.post(`${this.url}/add`, contribution).pipe(
      // effet => reload
      tap(() => this.refresh()),
    );
  }

  update(contribution: Contribution) {
    return this.http.put(`${this.url}/update`, contribution).pipe(tap(() => this.refresh()));
  }

  store(contribution: Contribution) {
    return contribution.id ? this.update(contribution) : this.add(contribution);
  }

  delete(id: number | undefined) {
    return this.http.delete(`${this.url}/delete/${id}`).pipe(tap(() => this.refresh()));
  }

  findById(id: number) {
    return this.http.get<Contribution>(`${this.url}/find/${id}`);
  }
}
