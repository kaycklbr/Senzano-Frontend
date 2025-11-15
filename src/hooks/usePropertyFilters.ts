import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export interface PropertyFilters {
  city: string[];
  neighborhood: string[];
  address: string[];
  bedroom: string[];
  property_type: string[];
  min_price: string;
  max_price: string;
  destination: string;
}

const defaultFilters: PropertyFilters = {
  city: [],
  neighborhood: [],
  address: [],
  bedroom: [],
  property_type: [],
  min_price: '',
  max_price: '',
  destination: ''
};

export function usePropertyFilters() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const parseFiltersFromURL = useCallback((): PropertyFilters => {
    const searchParams = new URLSearchParams(location.search);
    return {
      city: searchParams.get('city')?.split(',').filter(Boolean) || [],
      neighborhood: searchParams.get('neighborhood')?.split(',').filter(Boolean) || [],
      address: searchParams.get('address')?.split(',').filter(Boolean) || [],
      bedroom: searchParams.get('bedroom')?.split(',').filter(Boolean) || [],
      property_type: searchParams.get('property_type')?.split(',').filter(Boolean) || [],
      min_price: searchParams.get('min_price') || '',
      max_price: searchParams.get('max_price') || '',
      destination: searchParams.get('destination') || ''
    };
  }, [location.search]);

  const [filters, setFilters] = useState<PropertyFilters>(parseFiltersFromURL);

  // Atualiza filtros quando URL muda
  useEffect(() => {
    setFilters(parseFiltersFromURL());
  }, [parseFiltersFromURL]);

  const updateURL = useCallback((newFilters: PropertyFilters) => {
    const params = new URLSearchParams();
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        params.set(key, value.join(','));
      } else if (typeof value === 'string' && value) {
        params.set(key, value);
      }
    });

    const newSearch = params.toString();
    const newURL = `${location.pathname}${newSearch ? `?${newSearch}` : ''}`;
    
    navigate(newURL, { replace: true });
  }, [location.pathname, navigate]);

  const updateFilter = useCallback((filterType: keyof PropertyFilters, value: string | string[]) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      
      if (filterType === 'min_price' || filterType === 'max_price' || filterType === 'destination') {
        newFilters[filterType] = value as string;
      } else {
        const currentValues = Array.isArray(prev[filterType]) ? prev[filterType] : [];
        const valueStr = value as string;
        
        if (currentValues.includes(valueStr)) {
          newFilters[filterType] = currentValues.filter(v => v !== valueStr);
        } else {
          newFilters[filterType] = [...currentValues, valueStr];
        }
      }
      
      // Reset filtros dependentes
      if (filterType === 'city') {
        newFilters.neighborhood = [];
        newFilters.address = [];
      } else if (filterType === 'neighborhood') {
        newFilters.address = [];
      }
      
      updateURL(newFilters);
      return newFilters;
    });
  }, [updateURL]);

  const clearFilters = useCallback(() => {
    setFilters(defaultFilters);
    updateURL(defaultFilters);
  }, [updateURL]);

  const resetFilters = useCallback(() => {
    const resetFilters = defaultFilters;
    setFilters(resetFilters);
    updateURL(resetFilters);
  }, [updateURL]);

  return {
    filters,
    updateFilter,
    clearFilters,
    resetFilters
  };
}