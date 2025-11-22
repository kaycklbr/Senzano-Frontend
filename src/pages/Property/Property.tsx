import { useParams, Navigate, Link, useLocation } from "react-router-dom";
import { MapPin, Bed, Bath, Fullscreen, Loader2, ChevronDown, X } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import Button from "../../components/Button";
import CustomSelect from "../../components/CustomSelect";
import PriceRangeSelect from "../../components/PriceRangeSelect";
import { usePropertyFilters } from "../../hooks/usePropertyFilters";
import CONFIG from "../../constants/config";
import PageMeta from "../../components/common/PageMeta";

interface Property {
  id: number;
  title: string;
  city: string;
  neighborhood: string;
  address: string;
  bedroom: number;
  bathroom: number;
  area_total: string;
  sale_value: string;
  rental_value: string;
  property_type: string;
  cover_photo: string;
}

interface FilterOptions {
  cities: string[];
  neighborhoods: string[];
  addresses: string[];
  bedrooms: number[];
  property_types: string[];
}

export default function Property() {
  const location = useLocation();
  const property = location.pathname.split("/")[1];
  const { filters: selectedFilters, updateFilter, clearFilters } = usePropertyFilters();
  const [properties, setProperties] = useState<Property[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({
    cities: [],
    neighborhoods: [],
    addresses: [],
    bedrooms: [],
    property_types: []
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Redireciona para home se não for venda ou locacao
  if (property !== 'venda' && property !== 'locacao') {
    return <Navigate to="/" replace />;
  }

  const isVenda = property === 'venda';
  const title = isVenda ? 'Encontre seu imóvel ideal para comprar' : 'Encontre seu imóvel ideal para alugar';
  const cardLabel = isVenda ? 'Venda' : 'Locação';

  useEffect(() => {
    fetchFilters();
    resetAndFetchProperties();
  }, []);

  useEffect(() => {
    fetchFilters();
  }, [selectedFilters.city, selectedFilters.neighborhood, property]);

  useEffect(() => {
    // Debounce apenas para filtros de preço
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    const isPriceFilter = selectedFilters.min_price !== '' || selectedFilters.max_price !== '';
    
    if (isPriceFilter) {
      debounceRef.current = setTimeout(() => {
        resetAndFetchProperties();
      }, 300);
    } else {
      resetAndFetchProperties();
    }
    
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [selectedFilters]);

  // Busca filtros quando property muda (sem limpar os existentes)
  useEffect(() => {
    fetchFilters();
  }, [property]);

  const resetAndFetchProperties = () => {
    setProperties([]);
    setCurrentPage(1);
    fetchProperties(1, true);
  };

  const fetchFilters = async () => {
    try {
      const params = new URLSearchParams();
      if (selectedFilters.city.length > 0) params.append('city', selectedFilters.city.join(','));
      if (selectedFilters.neighborhood.length > 0) params.append('neighborhood', selectedFilters.neighborhood.join(','));
      params.append('crm_origin', property == 'venda' ? 'imobzi' : 'imoview');
      
      
      const response = await axios.get(`${CONFIG.BASE_URL}/properties/filters?${params}`);
      setFilters(response.data);
    } catch (error) {
      console.error('Erro ao buscar filtros:', error);
    }
  };

  const fetchProperties = async (page = 1, reset = false) => {
    if (loading) return;
    
    setLoading(true);
    if (reset) setInitialLoading(true);
    
    try {
      const params = new URLSearchParams();
      console.log(selectedFilters)
      Object.entries(selectedFilters).forEach(([key, value]) => {
        if (Array.isArray(value) && value.length > 0) {
          params.append(key, value.join(','));
        } else if (typeof value === 'string' && value) {
          params.append(key, value);
        }
      });
      params.append('crm_origin', property == 'venda' ? 'imobzi' : 'imoview');
      params.append('page', page.toString());
      
      const response = await axios.get(`${CONFIG.BASE_URL}/properties?${params}`);
      const newProperties = response.data.data;
      
      setProperties(prev => reset ? newProperties : [...prev, ...newProperties]);
      setHasNextPage(!!response.data.next_page_url);
      setCurrentPage(page);
    } catch (error) {
      console.error('Erro ao buscar propriedades:', error);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  const loadMore = useCallback(() => {
    if (hasNextPage && !loading) {
      fetchProperties(currentPage + 1);
    }
  }, [hasNextPage, loading, currentPage]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1000) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMore]);



  return (
    <div className="w-full min-h-screen bg-white">
      <PageMeta title={property == 'venda' ? 'Venda' : 'Locação'} description={"Encontre imóveis para " + (property == 'venda' ? 'comprar' : 'alugar')} image="/images/fundo.webp" />

      {/* Hero Section with Search */}
      <section className="relative w-full pb-8 md:pb-16 pt-30">
        <img
          src="/images/senzano-room.webp"
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/60"></div>

        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <div className="w-full max-w-[1138px] md:bg-dark-gray/50 rounded-[20px] p-4 md:p-8">
            <h1 className="hidden md:block text-xl md:text-2xl font-medium text-white text-center mb-6">
              {title}
            </h1>

            {/* Desktop Filters */}
            <div className="hidden md:grid grid-cols-3 gap-4 mb-6">
              {/* Cidade */}
              <CustomSelect
                placeholder="Cidade"
                options={filters?.cities?.map(city => ({ value: city, label: city }))}
                value={selectedFilters.city}
                onChange={(value) => updateFilter('city', value)}
                multiple
              />

              {/* Bairro */}
              <CustomSelect
                placeholder="Bairro"
                options={filters?.neighborhoods?.map(neighborhood => ({ value: neighborhood, label: neighborhood }))}
                value={selectedFilters.neighborhood}
                onChange={(value) => updateFilter('neighborhood', value)}
                disabled={selectedFilters.city.length === 0}
                multiple
              />

              {/* Rua */}
              <CustomSelect
                placeholder="Rua"
                options={filters?.addresses?.map(address => ({ value: address, label: address }))}
                value={selectedFilters.address}
                onChange={(value) => updateFilter('address', value)}
                disabled={selectedFilters.neighborhood.length === 0}
                multiple
              />

              {/* Quartos */}
              <CustomSelect
                placeholder="Quartos"
                options={filters?.bedrooms?.map(bedroom => ({ value: bedroom.toString(), label: `${bedroom} quartos` }))}
                value={selectedFilters.bedroom}
                onChange={(value) => updateFilter('bedroom', value)}
                multiple
              />

              {/* Valor */}
              <PriceRangeSelect
                placeholder="Valor"
                minValue={selectedFilters.min_price}
                maxValue={selectedFilters.max_price}
                onMinChange={(value) => updateFilter('min_price', value)}
                onMaxChange={(value) => updateFilter('max_price', value)}
              />

              {/* Tipo */}
              <CustomSelect
                placeholder="Tipo"
                options={filters?.property_types ? filters?.property_types?.map(type => ({ value: type, label: type })) : []}
                value={selectedFilters.property_type}
                onChange={(value) => updateFilter('property_type', value)}
                multiple
              />
            </div>

            {/* Mobile Filter Toggle */}
            <div className="md:hidden mb-6">
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="w-full bg-white rounded-[20px] px-4 py-3 flex items-center justify-between"
              >
                <span className="text-lg font-light text-[#7e7e7e]">
                  Encontre seu imóvel ideal
                </span>
                <ChevronDown className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="hidden md:flex justify-center">
              <button className="bg-primary text-white rounded-[100px] px-8 md:px-16 py-3 text-[15px] hover:bg-[#8b1a1f] transition-colors">
                Buscar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Filters Modal */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-dark-gray/50" />
          <div className="relative w-full h-full bg-black/50 flex pt-18 flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-dark-gray/50">
              <h2 className="text-xl font-medium text-white">
                Filtros de Busca
              </h2>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="p-2 text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Filters */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              <CustomSelect
                placeholder="Cidade"
                options={filters.cities.map(city => ({ value: city, label: city }))}
                value={selectedFilters.city}
                onChange={(value) => updateFilter('city', value)}
                multiple
              />

              <CustomSelect
                placeholder="Bairro"
                options={filters.neighborhoods.map(neighborhood => ({ value: neighborhood, label: neighborhood }))}
                value={selectedFilters.neighborhood}
                onChange={(value) => updateFilter('neighborhood', value)}
                disabled={selectedFilters.city.length === 0}
                multiple
              />

              <CustomSelect
                placeholder="Rua"
                options={filters.addresses.map(address => ({ value: address, label: address }))}
                value={selectedFilters.address}
                onChange={(value) => updateFilter('address', value)}
                disabled={selectedFilters.neighborhood.length === 0}
                multiple
              />

              <CustomSelect
                placeholder="Quartos"
                options={filters.bedrooms.map(bedroom => ({ value: bedroom.toString(), label: `${bedroom} quartos` }))}
                value={selectedFilters.bedroom}
                onChange={(value) => updateFilter('bedroom', value)}
                multiple
              />

              <PriceRangeSelect
                placeholder="Valor"
                minValue={selectedFilters.min_price}
                maxValue={selectedFilters.max_price}
                onMinChange={(value) => updateFilter('min_price', value)}
                onMaxChange={(value) => updateFilter('max_price', value)}
              />

              <CustomSelect
                placeholder="Tipo"
                options={filters.property_types.map(type => ({ value: type, label: type }))}
                value={selectedFilters.property_type}
                onChange={(value) => updateFilter('property_type', value)}
                multiple
              />
            </div>
            
            {/* Footer */}
            <div className="p-4 bg-dark-gray/50">
              <button 
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full bg-primary text-white rounded-[100px] py-3 text-[15px] hover:bg-[#8b1a1f] transition-colors mb-3"
              >
                Buscar
              </button>
              <button 
                onClick={clearFilters}
                className="w-full text-white text-[15px] hover:text-gray-300 transition-colors"
              >
                Limpar filtros
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="py-16 px-4 max-w-6xl mx-auto">
        {initialLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((prop) => {
                const price = parseFloat(prop.sale_value);
                return (
                  <div key={prop.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="relative overflow-hidden">
                      <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                        <span className="absolute top-3 left-3 rounded-full bg-primary-light text-xs px-3 py-1 text-white font-semibold">
                          {cardLabel}
                        </span>
                        <img 
                          src={prop.cover_photo.split(',')[0]} 
                          alt={prop.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{prop.title}</h3>
                      <div className="text-xs mb-2 flex items-center gap-1 text-gray-600">
                        <MapPin size={14}/>
                        <span>{prop.neighborhood}, {prop.city}</span>
                      </div>
                      
                      <div className="flex justify-between text-xs text-gray-600 mt-5">
                        <div className="flex items-center gap-1">
                          <Bed size={14}/>
                          <span>{prop.bedroom} quartos</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Bath size={14}/>
                          <span>{prop.bathroom} banheiros</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Fullscreen size={14}/>
                          <span>{parseFloat(prop.area_total)}m²</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-5">
                        <p className="text-2xl font-bold text-primary-light">
                          R$ {price.toLocaleString('pt-BR')}{isVenda ? '' : '/mês'}
                        </p>
                        <Link to={"/imovel/"+prop.slug}>
                          <Button size="md" bgColor="bg-primary-light hover:bg-primary" className="text-sm">
                            Ver detalhes
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {loading && !initialLoading && (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            )}
            
            {!hasNextPage && properties.length > 0 && (
              <div className="text-center py-8 text-gray-500">
                Todos os imóveis foram carregados
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}