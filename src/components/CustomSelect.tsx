import { useState, useRef, useEffect } from "react";
import { Check, ChevronDown, Search } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  placeholder: string;
  options: Option[];
  value: string | string[];
  onChange: (value: string) => void;
  disabled?: boolean;
  multiple?: boolean;
  searchable?: boolean;
}

export default function CustomSelect({ 
  placeholder, 
  options, 
  value, 
  onChange, 
  disabled = false,
  multiple = false,
  searchable = false
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const selectRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearch("");
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  const filteredOptions = searchable && search
    ? options.filter(opt => opt.label.toLowerCase().includes(search.toLowerCase()))
    : options;

  const selectedOptions = multiple 
    ? options.filter(opt => Array.isArray(value) && value.includes(opt.value))
    : options.filter(opt => opt.value === value);
  
  const displayText = multiple && selectedOptions.length > 0
    ? selectedOptions.length === 1 
      ? selectedOptions[0].label
      : `${selectedOptions.length} selecionados`
    : selectedOptions[0]?.label || placeholder;

  return (
    <div className="relative" ref={selectRef}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`bg-white rounded-[20px] px-4 py-2 flex items-center justify-between w-full transition-all ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        } ${
          isOpen ? 'rounded-b-none' : ''
        }`}
      >
        <span className={`text-base md:text-xl font-light ${selectedOptions.length > 0 ? 'text-black' : 'text-[#7e7e7e]'}`}>
          {displayText}
        </span>
        <ChevronDown className="w-6 h-6 text-gray-600" />
      </button>

      <div className={`absolute top-full left-0 right-0 text-sm bg-white border border-t-0 border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden transition-all duration-300 
        ${isOpen && !disabled ? 'max-h-60 opacity-100 rounded-t-none' : 'max-h-0 opacity-0'}`}>
        {searchable && isOpen && (
          <div className="px-3 py-2 border-b border-gray-200 sticky top-0 bg-white">
            <div className="relative">
              <input
                ref={searchInputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`Buscar ${placeholder.toLowerCase()}...`}
                className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg outline-none focus:border-primary-light"
              />
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
        )}
        <div className="max-h-60 overflow-y-auto">
          {(selectedOptions.length > 0 && !multiple) && (
            <button
              type="button"
              onClick={() => {
                if (multiple) {
                  selectedOptions.forEach(opt => onChange(opt.value));
                } else {
                  onChange('');
                }
                if (!multiple) setIsOpen(false);
                setSearch("");
              }}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 text-red-600 border-b border-gray-200"
            >
              Limpar seleção
            </button>
          )}
          {filteredOptions.map((option) => {
            const isSelected = multiple 
              ? Array.isArray(value) && value.includes(option.value)
              : value === option.value;
            
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  if (!multiple) {
                    setIsOpen(false);
                    setSearch("");
                  }
                }}
                className={`w-full px-4 py-2 text-left hover:bg-primary-light/20 first:rounded-t-lg last:rounded-b-lg flex items-center justify-between ${
                  isSelected ? 'bg-primary-light/20 text-primary-light' : 'text-black'
                }`}
              >
                {option.label}
                {multiple && isSelected && (
                  <span className="text-primary-light"><Check/></span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}