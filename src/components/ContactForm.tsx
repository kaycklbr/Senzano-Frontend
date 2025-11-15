import axios from 'axios';
import React, { useState } from 'react';
import CONFIG from '../constants/config';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    cellphone: '',
    type: 'locacao'
  });

  const [ submitting, setSubmitting ] = useState(false);

  const formatPhone = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    if (numericValue.length <= 2) return numericValue;
    if (numericValue.length <= 7) return `(${numericValue.slice(0, 2)}) ${numericValue.slice(2)}`;
    if (numericValue.length <= 11) return `(${numericValue.slice(0, 2)}) ${numericValue.slice(2, 7)}-${numericValue.slice(7)}`;
    return `(${numericValue.slice(0, 2)}) ${numericValue.slice(2, 7)}-${numericValue.slice(7, 11)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'cellphone') {
      const formattedPhone = formatPhone(value);
      setFormData({
        ...formData,
        [name]: formattedPhone
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      
      await axios.post(`${CONFIG.BASE_URL}/properties/note`, {
        ...formData
      });
      alert('Mensagem enviada!');
      setFormData({ firstname: '', lastname: '', email: '', cellphone: '', type: 'locacao' });
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      alert('Erro ao enviar mensagem. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white shadow-lg border border-gray-300 p-8 rounded-2xl mb-10 mx-8">
      <h3 className="text-xl font-medium text-black mb-6">
        Entre em contato
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-medium text-black block mb-1">
            Primeiro nome
          </label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 p-3 text-xs font-medium text-gray-600"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-black block mb-1">
            Sobrenome
          </label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 p-3 text-xs font-medium text-gray-600"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-black block mb-1">
            E-mail
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 p-3 text-xs font-medium text-gray-600"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-black block mb-1">
            Telefone
          </label>
          <input
            type="tel"
            name="cellphone"
            value={formData.cellphone}
            onChange={handleChange}
            placeholder="(11) 99999-9999"
            maxLength={15}
            className="w-full rounded-lg border border-gray-300 p-3 text-xs font-medium text-gray-600"
          />
        </div>

        <div>
          <label className="text-[13px] font-medium text-black block mb-2">
            Tenho interesse em
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <div className="w-6 h-6 rounded-full border border-black relative">
                {formData.type === 'locacao' && (
                  <div className="w-4 h-4 bg-red-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                )}
              </div>
              <input
                type="radio"
                name="type"
                value="locacao"
                checked={formData.type === 'locacao'}
                onChange={handleChange}
                className="sr-only"
              />
              <span className="text-sm font-medium text-black">
                Locação
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <div className="w-6 h-6 rounded-full border border-black relative">
                {formData.type === 'venda' && (
                  <div className="w-4 h-4 bg-red-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                )}
              </div>
              <input
                type="radio"
                name="type"
                value="venda"
                checked={formData.type === 'venda'}
                onChange={handleChange}
                className="sr-only"
              />
              <span className="text-sm font-medium text-black">
                Venda
              </span>
            </label>
          </div>
        </div>

        <button 
          type="submit"
          disabled={submitting}

          className="w-full bg-primary disabled:opacity-70 rounded-lg text-white py-3 mt-6"
        >
          <span className="text-sm font-medium">
            {submitting ? 'Enviando...' : 'ENVIAR MENSAGEM'}
          </span>
        </button>
      </form>
    </div>
  );
};

export default ContactForm;