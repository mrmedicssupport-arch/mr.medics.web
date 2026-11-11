import labTestsData from './labTests.json';
import { LAB_PRICING } from '../config';

export interface LabItem {
  id: string;
  category: string;
  srcNo: number;
  name: string;
  sample: string;
  turnaround: string;
  labRate: number;
  sourceName: string;
  type: 'test' | 'package';
  includes?: string;
}

export const labTests: LabItem[] = labTestsData as LabItem[];

/**
  * Calculate patient price for a lab item.
  * Patient price = labRate + markup (markup default 0).
  * Never exposes raw labRate to patients.
  */
export function getPatientPrice(item: LabItem): number {
  return item.labRate + (LAB_PRICING.markup || 0);
}

export function getAllLabItems(): LabItem[] {
  return labTests;
}

export function getPackages(): LabItem[] {
  return labTests.filter((item) => item.type === 'package');
}

export function getTests(): LabItem[] {
  return labTests.filter((item) => item.type === 'test');
}

export function getPopularPackages(count: number = 4): LabItem[] {
  return getPackages().slice(0, count);
}

export function getCategories(): string[] {
  return [
    'All',
    'Health Packages',
    'Hematology',
    'Biochemistry',
    'Hormones',
    'Immunology & Serology',
    'Cancer Markers',
    'Clinical Pathology',
    'Microbiology',
    'Special Tests',
  ];
}
