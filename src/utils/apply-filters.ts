import type { Vehicle } from '@/types/vehicle';
import { FILTER_KEYS } from '@/types/filters';
import type { FilterState } from '@/types/filters';

export const applyFilters = (
  vehicles: Vehicle[] | null,
  filters: FilterState
): Vehicle[] | null => {
  if (!vehicles) return null;

  return vehicles.filter((vehicle) => {
    const matchesSearch =
      vehicle.title.toLowerCase().includes(filters[FILTER_KEYS.SEARCH].toLowerCase()) ||
      vehicle.brand.toLowerCase().includes(filters[FILTER_KEYS.SEARCH].toLowerCase());

    const matchesBrand = !filters[FILTER_KEYS.BRAND] || vehicle.brand === filters[FILTER_KEYS.BRAND];

    const matchesPrice =
      vehicle.price >= filters[FILTER_KEYS.MIN_PRICE] && vehicle.price <= filters[FILTER_KEYS.MAX_PRICE];
    const matchesRating =
      !filters[FILTER_KEYS.RATING] || vehicle.rating >= parseFloat(filters[FILTER_KEYS.RATING]);

    return matchesSearch && matchesBrand && matchesPrice && matchesRating;
  });
};
