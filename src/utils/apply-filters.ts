import type { Vehicle } from '@/types/vehicle';
import type { FilterState } from '@/types/filters';
import { FILTER_KEYS } from '@/types/filters';
import { calculateDiscountedPrice } from '@/utils/price.ts';

export const applyFilters = (
  vehicles: Vehicle[] | null,
  filters: FilterState
): Vehicle[] | null => {
  if (!vehicles) return null;

  return vehicles.filter((vehicle) => {
    const search = filters[FILTER_KEYS.SEARCH];
    const brand = filters[FILTER_KEYS.BRAND];
    const minPrice = filters[FILTER_KEYS.MIN_PRICE];
    const maxPrice = filters[FILTER_KEYS.MAX_PRICE];
    const rating = filters[FILTER_KEYS.RATING];

    const {
      title,
      brand: vehicleBrand,
      price,
      discountPercentage,
      rating: vehicleRating,
    } = vehicle;

    const discountedPrice = Number(
      calculateDiscountedPrice(price, discountPercentage)
    );

    const matchesSearch =
      search === '' ||
      title.toLowerCase().includes(search.toLowerCase()) ||
      vehicleBrand.toLowerCase().includes(search.toLowerCase());

    const matchesBrand = brand === '' || vehicleBrand === brand;

    const matchesPrice =
      discountedPrice >= minPrice && discountedPrice <= maxPrice;

    const matchesRating = rating === '' || vehicleRating >= parseFloat(rating);

    return matchesSearch && matchesBrand && matchesPrice && matchesRating;
  });
};
