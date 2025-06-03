import React from 'react';

import Button from '../../components/ui/button/Button';
interface FormCardProps {
  stepText?: string;
  title: string;
  children: React.ReactNode;
  buttonLabel?: string;
  onSubmit?: () => void;
  icon?: React.ReactNode;
  footer?: React.ReactNode;
  onBack?: () => void;
}
const FormCard = ({ stepText, title, children, buttonLabel= 'Próximo passo', onSubmit, icon, footer, onBack }: FormCardProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    if (onSubmit) onSubmit(e);
  };
  return (
    <form
    onSubmit={handleSubmit}
    className="max-w-md mx-auto bg-white rounded-none md:rounded-xl   p-6 "
  >
   
      <p className="text-sm text-gray-500 mb-1">{stepText}</p>
      <h2 className="title text-[24px]  mb-4 font-medium ">{title}</h2>

      <div className="space-y-4">
        {children}


        <div className="flex  items-center justify-center gap-4 mt-6">

          {icon && (
            <button 
              type="button"
              onClick={onBack} 
              className="flex items-center justify-center border border-blue-dark w-10 h-10 rounded-md"
              style={{height: '45px'}}
           >
              {icon}
            </button>
          )}
          
          <Button 
            type="submit"
            className="flex-1"
          >
            {buttonLabel}
          </Button>
        </div>
        

        {footer && <div className="mt-4">{footer}</div>}
        
      </div>
    
    </form>
  );
};

export default FormCard;
