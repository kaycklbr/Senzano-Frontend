import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface PriceRangeSelectProps {
  placeholder: string;
  minValue: string;
  maxValue: string;
  onMinChange: (value: string) => void;
  onMaxChange: (value: string) => void;
}

export default function PriceRangeSelect({ 
  placeholder, 
  minValue, 
  maxValue, 
  onMinChange, 
  onMaxChange 
}: PriceRangeSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [displayMinValue, setDisplayMinValue] = useState('');
  const [displayMaxValue, setDisplayMaxValue] = useState('');
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    if (!numericValue) return '';
    return `R$ ${parseInt(numericValue).toLocaleString('pt-BR')}`;
  };

  const handleMinChange = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    setDisplayMinValue(formatCurrency(value));
    onMinChange(numericValue);
  };

  const handleMaxChange = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    setDisplayMaxValue(formatCurrency(value));
    onMaxChange(numericValue);
  };

  const formatValue = (value: string) => {
    if (!value) return '';
    return `R$ ${parseInt(value).toLocaleString('pt-BR')}`;
  };

  const getDisplayText = () => {
    if (minValue && maxValue) {
      return `${formatValue(minValue)} - ${formatValue(maxValue)}`;
    } else if (minValue) {
      return `A partir de ${formatValue(minValue)}`;
    } else if (maxValue) {
      return `Até ${formatValue(maxValue)}`;
    }
    return placeholder;
  };

  return (
    <div className="relative" ref={selectRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-white rounded-[20px] px-4 py-2 flex items-center justify-between w-full cursor-pointer outline-0 transition-all 
          ${
            isOpen ? 'rounded-b-none' : ''
          }
          `}
      >
        <span className={`text-base md:text-xl font-light ${minValue || maxValue ? 'text-black' : 'text-[#7e7e7e]'}`}>
          {getDisplayText()}
        </span>
        <ChevronDown className="w-6 h-6 text-gray-600" />
      </button>

      <div className={`absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden transition-all duration-300 
        ${isOpen ? 'max-h-96 opacity-100 rounded-t-none' : 'max-h-0 opacity-0'}`}>
        <div className="p-4">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Valor mínimo
              </label>
              <input
                type="text"
                placeholder="R$ 0"
                value={displayMinValue || (minValue ? formatCurrency(minValue) : '')}
                onChange={(e) => handleMinChange(e.target.value)}
                className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Valor máximo
              </label>
              <input
                type="text"
                placeholder="R$ 0"
                value={displayMaxValue || (maxValue ? formatCurrency(maxValue) : '')}
                onChange={(e) => handleMaxChange(e.target.value)}
                className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              {(minValue || maxValue) && (
                <button
                  onClick={() => {
                    onMinChange('');
                    onMaxChange('');
                    setDisplayMinValue('');
                    setDisplayMaxValue('');
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Limpar
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors"
              >
                Aplicar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}