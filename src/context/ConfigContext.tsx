import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../services/api';

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
  twitter?: string;
  linkedin?: string;
  tiktok?: string;
  video_ebs?: string;
  footer_pages?: FooterPages[];
}

export interface FooterPages {
  title: string;
  slug: string;
}

interface ConfigContextType {
  config: Config;
  loading: boolean;
}

const ConfigContext = createContext<ConfigContextType>({
  config: {},
  loading: true,
});

export const useConfig = () => useContext(ConfigContext);

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
  const [config, setConfig] = useState<Config>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const { data } = await api.get('/public/config');
        setConfig(data);
      } catch (error) {
        console.error('Erro ao carregar configurações:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  return (
    <ConfigContext.Provider value={{ config, loading }}>
      {children}
    </ConfigContext.Provider>
  );
};