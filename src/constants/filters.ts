import type { SelectOption } from '@/types/filters';

export const ALL_BRANDS_OPTION: SelectOption = {
  value: '',
  label: 'All Brands',
};

export const RATING_OPTIONS: SelectOption[] = [
  { value: '', label: 'Any Rating' },
  { value: '4', label: '4+' },
  { value: '3', label: '3+' },
  { value: '2', label: '2+' },
];

export const FILTER_KEYS = {
  SEARCH: 'search',
  BRAND: 'brand',
  MIN_PRICE: 'minPrice',
  MAX_PRICE: 'maxPrice',
  RATING: 'rating',
} as const;
