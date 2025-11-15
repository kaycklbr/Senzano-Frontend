import { useEffect, useState, useRef } from "react";
import { ChevronDown, Search } from "lucide-react";
import CustomSelect from "./CustomSelect";
import PriceRangeSelect from "./PriceRangeSelect";
import { Link } from "react-router";
import axios from "axios";
import CONFIG from "../constants/config";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  placeholder: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const initialFilters = {
  city: '',
  neighborhood: '',
  address: '',
  bedroom: '',
  property_type: '',
  min_price: '',
  max_price: ''
};

export default function CustomSearch({ 

}) {

  const [ propertyType, setPropertyType ] = useState('imobzi');
  const [ searchUrl, setSearchUrl ] = useState('/' + propertyType);

  const [filters, setFilters] = useState<any>({
    cities: [],
    neighborhoods: [],
    addresses: [],
    bedrooms: [],
    property_types: []
  });
  const [selectedFilters, setSelectedFilters] = useState(initialFilters);

  useEffect(() => {
    fetchFilters();
  }, [selectedFilters.city, selectedFilters.neighborhood, propertyType]);

  useEffect(() => {

    let url = '/' + (propertyType == 'imobzi' ? 'venda' : 'locacao');
    const params = new URLSearchParams(selectedFilters);
    setSearchUrl(url + '?' + params.toString());

  }, [selectedFilters, propertyType]);

  useEffect(() => {

    setSelectedFilters(initialFilters);
  }, [ propertyType ]);

  const fetchFilters = async () => {
    try {
      const params = new URLSearchParams();
      if (selectedFilters.city) params.append('city', selectedFilters.city);
      if (selectedFilters.neighborhood) params.append('neighborhood', selectedFilters.neighborhood);
      params.append('crm_origin', propertyType);
      
      
      const response = await axios.get(`${CONFIG.BASE_URL}/properties/filters?${params}`);
      setFilters(response.data);
    } catch (error) {
      console.error('Erro ao buscar filtros:', error);
    }
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setSelectedFilters(prev => {
      const newFilters = { ...prev, [filterType]: value };
      
      // Reset filtros dependentes
      if (filterType === 'city') {
        newFilters.neighborhood = '';
        newFilters.address = '';
      } else if (filterType === 'neighborhood') {
        newFilters.address = '';
      }
      
      return newFilters;
    });
  };

  const [ open, setIsOpen ] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative flex justify-center">
    <div onClick={() => setIsOpen(!open)} className={"cursor-pointer rounded-[50px] h-[60px] p-4 flex items-center w-full mb-4 transition-all hover:bg-Offwhite " + (open ? 'bg-[#EAEAEA]' : 'bg-white')}>
      <span className="flex-1 text-center px-3 text-xl outline-0 text-gray-500">O que você procura?</span>
      <div className="w-9 h-9 flex items-center justify-center">
        <Search className="w-8 h-8 text-black" />
      </div>
    </div>
    <div className={`absolute top-[60px] flex-1 bg-[#EAEAEA] p-4 rounded-t-none rounded-2xl w-[80%] shadow transition-all duration-300 ease-in-out overflow-hidden ${
      open ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
    }`}>
    <div className="flex gap-4 justify-center mb-8 flex-wrap">
      <button onClick={() => setPropertyType('imobzi')} className={"flex-1 rounded-[50px] px-5 py-3 text-xs md:text-sm text-black transition-all hover:bg-primary hover:text-white cursor-pointer " + (propertyType == 'imobzi' ? 'bg-primary text-white' : 'bg-white text-black')}>
        VENDA
      </button>
      <button onClick={() => setPropertyType('imoview')} className={"flex-1 rounded-[50px] px-5 py-3 text-xs md:text-sm text-black transition-all hover:bg-primary hover:text-white cursor-pointer " + (propertyType == 'imoview' ? 'bg-primary text-white' : 'bg-white text-black')}>
        LOCAÇÃO
      </button>
    </div>
    <div className="  space-y-4 overflow-y-auto">
    <CustomSelect
      placeholder="Cidade"
      options={filters.cities.map(city => ({ value: city, label: city }))}
      value={selectedFilters.city}
      onChange={(value) => handleFilterChange('city', value)}
    />

    <CustomSelect
      placeholder="Bairro"
      options={filters.neighborhoods.map(neighborhood => ({ value: neighborhood, label: neighborhood }))}
      value={selectedFilters.neighborhood}
      onChange={(value) => handleFilterChange('neighborhood', value)}
      disabled={!selectedFilters.city}
    />

    <CustomSelect
      placeholder="Rua"
      options={filters.addresses.map(address => ({ value: address, label: address }))}
      value={selectedFilters.address}
      onChange={(value) => handleFilterChange('address', value)}
      disabled={!selectedFilters.neighborhood}
    />

    <CustomSelect
      placeholder="Quartos"
      options={filters.bedrooms.map(bedroom => ({ value: bedroom.toString(), label: `${bedroom} quartos` }))}
      value={selectedFilters.bedroom}
      onChange={(value) => handleFilterChange('bedroom', value)}
    />

    <PriceRangeSelect
      placeholder="Valor"
      minValue={selectedFilters.min_price}
      maxValue={selectedFilters.max_price}
      onMinChange={(value) => handleFilterChange('min_price', value)}
      onMaxChange={(value) => handleFilterChange('max_price', value)}
    />

    <CustomSelect
      placeholder="Tipo"
      options={filters.property_types.map(type => ({ value: type, label: type }))}
      value={selectedFilters.property_type}
      onChange={(value) => handleFilterChange('property_type', value)}
    />
    </div>

    <div className="p-4 w-full">
      <Link to={searchUrl}
        className="w-full block bg-primary text-white rounded-[100px] py-3 text-[15px] hover:bg-[#8b1a1f] transition-colors"
      >
        Buscar
      </Link>
    </div>
    </div>
    </div>
  );
}