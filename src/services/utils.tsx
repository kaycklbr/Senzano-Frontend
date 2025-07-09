import { AxiosError } from "axios";
import api from "./api";

const uploadSingleImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post('wp/v2/media', formData);

  return response.data;
};

export const errorControl = (error: AxiosError) => {

  if(error?.response?.data?.data?.errors){
    const errors = Object.values(error?.response?.data?.data?.errors);

    if(errors.length){
      const e = errors[0];
      if(Array.isArray(e) && e.length){
        return e[0];
      }
    }

  }

  if(error.response?.data?.message){
    return error.response?.data?.message;
  }

  return error.message;

}

export const slugify = (text: string) => {
  return text
    .normalize("NFD") // decompõe caracteres acentuados
    .replace(/[\u0300-\u036f]/g, '') // remove marcas diacríticas
    .toLowerCase()
    .replace(/\s+/g, '-')            // substitui espaços por hífen
    .replace(/[^\w\-]+/g, '')        // remove caracteres não alfanuméricos
    .replace(/\-\-+/g, '-')          // colapsa múltiplos hífens
    .replace(/^-+/, '')              // remove hífens do início
    .replace(/-+$/, '');             // remove hífens do fim
};