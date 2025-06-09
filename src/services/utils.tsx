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