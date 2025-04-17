import React from 'react';

import Input from '../../components/form/input/InputField';

import DatePicker from '../../components/form/date-picker';
import Label from '../../components/form/Label';

import ComponentCard from '../../components/form/form-elements/DropZone';
import Button from '../../components/ui/button/Button';
interface FormCardProps {
  stepText?: string;
  title: string;
  children: React.ReactNode;
  buttonLabel?: string;
  onSubmit?: () => void;
  icon?: React.ReactNode;
}
const FormCard = ({ stepText, title, children, buttonLabel= 'Próximo passo', onSubmit, icon }: FormCardProps) => {
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
      <h2 className="title text-xl font-bold mb-4 ">{title}</h2>

      <div className="space-y-4">
        {children}
        <div className='flex items-center justify-center mt-4 gap-2'>
          {icon && <span >{icon}</span>}
          
          <Button  onClick={onSubmit} className="w-full mt-4">{buttonLabel}</Button>

        </div>

        
      </div>
    
    </form>
  );
};

export default FormCard;
