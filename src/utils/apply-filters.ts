import type { Vehicle } from '@/types/vehicle';
import type { FilterState } from '@/types/filters';
import { FILTER_KEYS } from '@/types/filters';

export const applyFilters = (
  vehicles: Vehicle[] | null,
  filters: FilterState
): Vehicle[] | null => {
  if (!vehicles) return null;

  return vehicles.filter((vehicle) => {
    const search = filters[FILTER_KEYS.SEARCH] as string;
    const brand = filters[FILTER_KEYS.BRAND] as string;
    const minPrice = filters[FILTER_KEYS.MIN_PRICE] as number;
    const maxPrice = filters[FILTER_KEYS.MAX_PRICE] as number;
    const rating = filters[FILTER_KEYS.RATING] as string;

    const { title, brand: vehicleBrand, price, rating: vehicleRating } = vehicle;

    const matchesSearch =
      title.toLowerCase().includes(search.toLowerCase()) ||
      vehicleBrand.toLowerCase().includes(search.toLowerCase());

    const matchesBrand = !brand || vehicleBrand === brand;

    const matchesPrice = price >= minPrice && price <= maxPrice;

    const matchesRating = !rating || vehicleRating >= parseFloat(rating);

    return matchesSearch && matchesBrand && matchesPrice && matchesRating;
  });
};
