import { useState, useMemo } from 'react';
import './search-filters.scss';
import { Select } from '../UI/Select/Select';
import { applyFilters } from '@/utils/apply-filters';
import {
  RATING_OPTIONS,
  ALL_BRANDS_OPTION,
  FILTER_KEYS,
} from '@/constants/filters';
import type { Vehicle } from '@/types/vehicle';
import type { FilterState, SelectOption, FilterKeys } from '@/types/filters';
import { useDebouncedCallback } from 'use-debounce';
import { calculateDiscountedPrice } from '@/utils/price.ts';

type SearchFiltersProps = {
  vehicles: Vehicle[] | null;
  onFilterChange: (filtered: Vehicle[] | null) => void;
};

export const SearchFilters = ({
  vehicles,
  onFilterChange,
}: SearchFiltersProps) => {
  const initialFilters: FilterState = useMemo(() => {
    const prices = vehicles
      ?.map((v) => calculateDiscountedPrice(v.price, v.discountPercentage))
      .sort();
    return {
      [FILTER_KEYS.SEARCH]: '',
      [FILTER_KEYS.BRAND]: '',
      [FILTER_KEYS.MIN_PRICE]: prices ? Math.ceil(Number(prices[0])) : 0,
      [FILTER_KEYS.MAX_PRICE]: prices
        ? Math.ceil(Number(prices[prices.length - 1]))
        : 40000,
      [FILTER_KEYS.RATING]: '',
    };
  }, [vehicles]);

  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const brandOptions = useMemo(() => {
    if (!vehicles || vehicles.length === 0) {
      return [ALL_BRANDS_OPTION];
    }
    const brands = new Set(vehicles.map((v) => v.brand));
    return [
      ALL_BRANDS_OPTION,
      ...Array.from(brands)
        .sort()
        .map((brand) => ({ value: brand, label: brand })),
    ] as SelectOption[];
  }, [vehicles]);

  const debouncedFilterChange = useDebouncedCallback(
    (key: FilterKeys, value: string | number) => {
      onFilterChange(applyFilters(vehicles, { ...filters, [key]: value }));
    },
    500
  );

  const handleFilterChange = (key: FilterKeys, value: string | number) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    if (
      key === FILTER_KEYS.SEARCH ||
      key === FILTER_KEYS.MIN_PRICE ||
      key === FILTER_KEYS.MAX_PRICE
    ) {
      debouncedFilterChange(key, value);
      return;
    }

    onFilterChange(applyFilters(vehicles, { ...filters, [key]: value }));
  };

  const handleReset = () => {
    setFilters(initialFilters);
    onFilterChange(vehicles);
  };

  return (
    <div className="search-filters">
      <div className="search-filters__search">
        <input
          type="text"
          className="search-filters__input"
          placeholder="Search by model or brand..."
          value={filters[FILTER_KEYS.SEARCH]}
          onChange={(e) =>
            handleFilterChange(FILTER_KEYS.SEARCH, e.target.value)
          }
        />
      </div>

      <div className="search-filters__row">
        <Select
          label="Brand"
          options={brandOptions}
          value={filters[FILTER_KEYS.BRAND]}
          onChange={(value) => handleFilterChange(FILTER_KEYS.BRAND, value)}
        />

        <Select
          label="Rating"
          options={RATING_OPTIONS}
          value={filters[FILTER_KEYS.RATING]}
          onChange={(value) => handleFilterChange(FILTER_KEYS.RATING, value)}
        />
      </div>

      <div className="search-filters__price">
        <div className="search-filters__price-item">
          <label className="search-filters__price-label">Min Price</label>
          <input
            type="number"
            className="search-filters__price-input"
            value={filters[FILTER_KEYS.MIN_PRICE]}
            onChange={(e) =>
              handleFilterChange(
                FILTER_KEYS.MIN_PRICE,
                parseInt(e.target.value) || 0
              )
            }
            min={filters[FILTER_KEYS.MIN_PRICE]}
            max={filters[FILTER_KEYS.MAX_PRICE]}
          />
        </div>
        <div className="search-filters__price-item">
          <label className="search-filters__price-label">Max Price</label>
          <input
            type="number"
            className="search-filters__price-input"
            value={filters[FILTER_KEYS.MAX_PRICE]}
            onChange={(e) =>
              handleFilterChange(
                FILTER_KEYS.MAX_PRICE,
                parseInt(e.target.value) || filters[FILTER_KEYS.MAX_PRICE]
              )
            }
            min={filters[FILTER_KEYS.MIN_PRICE]}
            max={filters[FILTER_KEYS.MAX_PRICE]}
          />
        </div>
        <div className="search-filters__price-range">
          Price: ${filters[FILTER_KEYS.MIN_PRICE]} — $
          {filters[FILTER_KEYS.MAX_PRICE]}
        </div>
      </div>

      <button className="search-filters__reset" onClick={handleReset}>
        Reset Filters
      </button>
    </div>
  );
};
