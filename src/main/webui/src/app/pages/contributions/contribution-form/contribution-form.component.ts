import { Component, ChangeDetectionStrategy, signal, inject, computed } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { form, FormField, required, submit, schema, min } from '@angular/forms/signals';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule, MatDatepickerIntl } from '@angular/material/datepicker';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatCardModule } from '@angular/material/card';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

import { ContributionsService } from '../../../core/services/contributions.service';
import { Contribution, ContributionCategory, getCategoryLabel } from '../../../core/models/contribution.model';

import { filter } from 'rxjs/operators';

type typeAdd = 'ADD' | 'ADD_AND_TERMINATE';

@Component({
  selector: 'app-contribution-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatCardModule,
    MatDatepickerModule,
    FormField,
    MatTimepickerModule,
    MatButtonModule,
  ],
  templateUrl: './contribution-form.component.html',
  styleUrl: './contribution-form.component.scss',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContributionFormComponent {
  contributionsService = inject(ContributionsService);
  router = inject(Router);

  categories: ContributionCategory[] = ['EDUCATION', 'ENVIRONMENT', 'HEALTH', 'HUMANITARIEN', 'AIDE_SOCIALE', 'OTHER'];

  private route = inject(ActivatedRoute);

  contributionId: string | null;

  selectedCategory = 'HUMANITARIEN';
  pageTitle = signal('Nouvelle contribution');

  private readonly _adapter = inject<DateAdapter<unknown, unknown>>(DateAdapter);
  private readonly _intl = inject(MatDatepickerIntl);
  private readonly _locale = signal(inject<unknown>(MAT_DATE_LOCALE));
  readonly dateFormatString = computed(() => {
    let ret = this._locale() === 'fr' ? 'DD/MM/YYYY' : '';
    return ret;
  });

  contributionModel = signal<Contribution>({
    id: undefined,
    amount: 0,
    date: new Date(),
    beneficiary: '',
    donor: '',
    category: 'HUMANITARIEN',
    notes: '',
  });

  readonly contributionForm = form(
    this.contributionModel,
    schema<Contribution>((schemaPath) => {
      required(schemaPath.amount, { message: 'Le montant est obligatoire' });
      min(schemaPath.amount, 1);

      required(schemaPath.date, { message: 'Le date est obligatoire' });
      required(schemaPath.beneficiary, { message: 'Le bénéficiaire est obligatoire' });
      required(schemaPath.category, { message: 'La catégorie est obligatoire' });
    }),
  );

  constructor() {
    const snapshot = this.route.snapshot;
    this.contributionId = snapshot.paramMap.get('id');

    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      console.log('prev:', event.url);
    });

    console.log({
      url: snapshot.url,
      params: snapshot.params,
      queryParams: snapshot.queryParams,
    });
  }

  ngOnInit() {
    this.french();
    if (this.contributionId) {
      let id = parseInt(this.contributionId, 10);

      this.contributionsService.findById(id).subscribe((c) => {
        this.pageTitle.set("Modification d'une contribution");
        if (c !== null) {
          this.contributionForm().reset(c);
        } else {
          console.log('Contributin avec Id introuvable', id);
        }
      });
    } else {
      this.pageTitle.set('Nouvelle contribution');
    }
  }

  getCategoryLabel(category: ContributionCategory) {
    return getCategoryLabel(category);
  }

  french() {
    this._locale.set('fr');
    this._adapter.setLocale(this._locale());
    this.updateCloseButtonLabel('Fermer le calendrier');
  }

  updateCloseButtonLabel(label: string) {
    this._intl.closeCalendarLabel = label;
    this._intl.changes.next();
  }

  onSubmit(event: Event, typeAdd?: typeAdd) {
    event.preventDefault();

    submit(this.contributionForm, async () => {
      const theContribution = this.contributionModel();
      this.contributionsService.store(theContribution).subscribe((result) => {
        if (typeAdd == 'ADD_AND_TERMINATE') {
          this.retourListeContributions();
        } else {
          this.resetContributionForm();
        }
      });
    });
  }

  retourListeContributions() {
    this.router.navigate(['/contributionlist']);
  }

  resetContributionForm() {
    this.contributionForm().reset({
      id: undefined,
      amount: 0,
      date: new Date(),
      beneficiary: '',
      donor: '',
      category: 'HUMANITARIEN',
      notes: '',
    });
  }
}
