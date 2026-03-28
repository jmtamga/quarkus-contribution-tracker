import {
  Component,
  inject,
  EventEmitter,
  Output,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  effect,
} from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';

import { RouterOutlet, RouterModule, Router } from '@angular/router';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ContributionsService } from '../../../core/services/contributions.service';
import { PdfExportService } from '../../../core/services/pdf-export.service';
import { Contribution, ContributionCategory, getCategoryLabel } from '../../../core/models/contribution.model';

import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog.component';

@Component({
  selector: 'app-contribution-list',
  standalone: true,
  imports: [
    CurrencyPipe,
    DatePipe,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule,
    MatDialogModule,
    MatButtonModule,
    MatToolbarModule,
  ],
  templateUrl: './contribution-list.component.html',
  styleUrl: './contribution-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContributionListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  contributionsService = inject(ContributionsService);
  pdf = inject(PdfExportService);
  dialog = inject(MatDialog);
  router = inject(Router);
  @Output() edit = new EventEmitter<any>();

  displayedColumns: string[] = ['date', 'amount', 'donor', 'beneficiary', 'category', 'modification'];
  dataSource: MatTableDataSource<Contribution>;

  constructor() {
    const contributions = this.contributionsService.contributions();
    this.dataSource = new MatTableDataSource(contributions);

    // Mettre a jour la dataSource quand les contributions changent
    effect(() => {
      const updatedContributions = this.contributionsService.contributions();
      this.dataSource.data = updatedContributions;
    });
  }

  ngOnInit() {
    this.contributionsService.refresh();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getCategoryLabel(c: ContributionCategory) {
    return getCategoryLabel(c);
  }

  onEditRowClicked(c: Contribution) {
    console.log('to edit', c);
    this.router.navigate(['/contributionform', c.id]);
  }

  confirmDelete(c: Contribution) {
    console.log('to delete', c);

    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmation',
        message: 'Voulez-vous vraiment supprimer cette contribution ?',
      },
    });

    ref.afterClosed().subscribe((result) => {
      if (result === true) {
        this.contributionsService.delete(c.id);
        this.dataSource.data = this.contributionsService.contributions();
      }
    });
  }

  contributionSortChange(sortState: Sort) {
    if (sortState.direction) {
      console.log(`Sorted ${sortState.direction}ending`);
    } else {
      console.log('Sorting cleared');
    }
  }

  exportListPdf() {
    this.pdf.export(this.dataSource.data);
  }

  newContribution() {
    this.router.navigate(['/contributionform']);
  }
}
