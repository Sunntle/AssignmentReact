import axios from "utils/axiosConfig";
export const fetchProduct = async (query) => {
  let sql = `/product`;
  if (query) sql = sql + query;
  const response = await axios.get(sql);
  return response;
};
export const fetchTypeProduct = async () => {
  const response = await axios.get(`/loai/`);
  return response;
};

export const fetchSizeProduct = async () => {
  const response = await axios.get(`/size/`);
  return response;
};
export const fetchColorProduct = async () => {
  const response = await axios.get(`/color/`);
  return response;
};
export const callLogin = async (data) => {
  const response = await axios.post(`/user/login`, { ...data });
  return response;
};
export const forgotPass = async (data) => {
  const response = await axios.post(`/user/forgotpass`, { email: data });
  return response;
};
export const registerUser = async (data) => {
  const response = await axios.post(`/user/`, { ...data });
  return response;
};
export const getUserByIdToken = async (idToken) => {
  const response = await axios.post(`/user/getUser`, { idToken: idToken });
  return response;
};
export const createOrder = async (data) => {
  const response = await axios.post(`/checkout/`, { ...data });
  return response;
};
export const createPayment = async (data) => {
  const response = await axios.post(`/checkout/create_payment_url`, { ...data });
  return response;
};
export const updateStatusTransaction = async (id, data) => {
  const response = await axios.put(`/checkout/${id}`, { ...data });
  return response;
};
export const fetchOrder = async (query) => {
  const response = await axios.get(`/checkout${query}`);
  return response;
};
