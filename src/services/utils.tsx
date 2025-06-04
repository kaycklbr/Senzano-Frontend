import api from "./api";

const uploadSingleImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post('wp/v2/media', formData);

  return response.data;
};