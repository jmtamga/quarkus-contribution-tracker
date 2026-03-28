export type ContributionCategory = 'EDUCATION' | 'HEALTH' | 'ENVIRONMENT' | 'HUMANITARIEN' | 'AIDE_SOCIALE' | 'OTHER';

export interface Contribution {
  id: number | undefined;
  amount: number;
  date: Date;
  beneficiary: string;
  donor?: string;
  category: ContributionCategory;
  notes: string;
}

export function getCategoryLabel(category: ContributionCategory) {
  switch (category) {
    case 'EDUCATION':
      return 'Education des pauvres';
    case 'HEALTH':
      return 'Sante pour tous';
    case 'ENVIRONMENT':
      return 'Question environment';
    case 'HUMANITARIEN':
      return 'Aide humanitaire';
    case 'AIDE_SOCIALE':
      return 'Aide sociale';
    case 'OTHER':
      return 'Autre';
    default:
      throw new Error('Unsupported option');
  }
}
