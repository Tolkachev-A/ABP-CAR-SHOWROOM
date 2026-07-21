export const FILTER_KEYS = {
  SEARCH: 'search',
  BRAND: 'brand',
  MIN_PRICE: 'minPrice',
  MAX_PRICE: 'maxPrice',
  RATING: 'rating',
} as const;

export type FilterKeys = (typeof FILTER_KEYS)[keyof typeof FILTER_KEYS];

export type FilterState = {
  [FILTER_KEYS.SEARCH]: string;
  [FILTER_KEYS.BRAND]: string;
  [FILTER_KEYS.MIN_PRICE]: number;
  [FILTER_KEYS.MAX_PRICE]: number;
  [FILTER_KEYS.RATING]: string;
};

export type SelectOption = {
  value: string;
  label: string;
};
