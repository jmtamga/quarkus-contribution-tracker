import { Injectable } from '@angular/core';

import { Contribution } from '../models/contribution.model';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({ providedIn: 'root' })
export class PdfExportService {
  export(contributions: Contribution[]) {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Contribution Tracker – Transactions', 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [['Date', 'Montant (€)', 'Bénéficiaire', 'Description']],
      body: contributions.map((c) => [
        new Date(c.date).toLocaleDateString(),
        c.amount.toFixed(2),
        c.beneficiary,
        c.notes ?? '',
      ]),
    });

    doc.save('contributions.pdf');
  }
}
