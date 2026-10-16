import type { ReviewStatus } from './types';

export interface CaseStudy {
  slug: string;
  title: string;
  review: ReviewStatus;
  clientPermission: boolean;
  services: string[];
}

/** Empty until projects are confirmed in docs/capability-matrix.md §D with client permission. */
export const caseStudies: CaseStudy[] = [];
