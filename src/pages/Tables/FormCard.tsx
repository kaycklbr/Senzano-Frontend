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
    if (onSubmit) onSubmit();
  };
  return (
    <form
    onSubmit={handleSubmit}
    className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6 border border-blue-200"
  >
   
      <p className="text-sm text-gray-500 mb-1">{stepText}</p>
      <h2 className="title text-[24px]  mb-4 font-medium ">{title}</h2>

      <div className="space-y-4">
        {children}
        <div className='flex items-center justify-center mt-4 gap-2'>
          <div className='flex items-center w-full align-center self-center justify-center bg-gray-50'>

            
{icon && <button type="button"
    onClick={onBack} className='flex items-center justify-center border border-blue-dark  w-13 h-13 rounded-md' >
              <span  >{icon}</span>
            </button>}
            
            <Button  onClick={onSubmit} className="w-full mt-4">{buttonLabel}</Button>
          </div>
        </div>

        {footer && <div className="mt-4">{footer}</div>}
        
      </div>
    
    </form>
  );
};

export default FormCard;
