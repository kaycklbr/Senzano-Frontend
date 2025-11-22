import { useState, useEffect } from 'react';
import api from '../services/api';
import axios from 'axios';
import CONFIG from '../constants/config';

export interface Config {
  address?: string;
  phone_senzano?: string;
  phone_vendas?: string;
  phone_locacao?: string;
  email_contato?: string;
  whatsapp_lais?: string;
  facebook?: string;
  youtube?: string;
  whatsapp?: string;
  instagram?: string;
  tiktok?: string;
  footer_pages?: FooterPages[];
}

export interface FooterPages {
  title: string;
  slug: string;
}

export const useConfig = () => {
  const [config, setConfig] = useState<Config>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const { data } = await axios.get(CONFIG.BASE_URL + '/public/config');
        setConfig(data);
      } catch (error) {
        console.error('Erro ao carregar configurações:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  return { config, loading };
};