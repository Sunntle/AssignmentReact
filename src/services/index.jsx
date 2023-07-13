import axios from "axios";
export const fetchProduct = async (query) => {
  let sql = `http://localhost:3000/product`;
  if (query) sql = sql + query;
  const response = await axios.get(sql);
  return response;
};
export const fetchTypeProduct = async () => {
  const response = await axios.get(`http://localhost:3000/loai/`);
  return response;
};

export const fetchSizeProduct = async () => {
  const response = await axios.get(`http://localhost:3000/size/`);
  return response;
};
export const fetchColorProduct = async () => {
  const response = await axios.get(`http://localhost:3000/color/`);
  return response;
};
