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
export const fetchOrder = async (query = "/") => {
  const response = await axios.get(`/checkout${query}`);
  return response;
};
export const fetchUser = async (query = "/") => {
  const response = await axios.get(`/user${query}`);
  return response;
};
//user
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
//checkout
export const createOrder = async (data) => {
  const response = await axios.post(`/checkout/`, { ...data });
  return response;
};
export const createPayment = async (data) => {
  const response = await axios.post(`/checkout/create_payment_url`, { ...data });
  return response;
};

//product
export const createNewProduct = async (data) => {
  const { size, color, Image, ...rest } = data;
  const formData = new FormData();
  Image.forEach((file, index) => {
    formData.append("Image", file);
  });
  const res = await axios.post(`/product`, { ...rest });
  if (res) {
    formData.append("product_id", res);
    const requests = [
      axios.post(`/product_sizes`, { size_id: size, product_id: res }),
      axios.post(`/product_colors`, { color_id: color, product_id: res }),
      axios.post("/images", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    ];
    await Promise.all(requests);
    return "Add new product completed successfully.";
  }
};

//order
export const updateStatusTransaction = async (id, data) => {
  const response = await axios.put(`/checkout/${id}`, { ...data });
  return response;
};
//product
export const updateProduct = async (data) => {
  const { Image, size, color, ...rest } = data;
  //non-image
  const requestsDeleteOldData = [axios.delete(`/product_sizes/${data.id}`), axios.delete(`/product_colors/${data.id}`)];
  const responseDelete = await Promise.all(requestsDeleteOldData);
  if (responseDelete) {
    const requestsAddData = [
      axios.post(`/product_sizes`, { size_id: size, product_id: data.id }),
      axios.post(`/product_colors`, { color_id: color, product_id: data.id }),
      axios.put(`/product/${data.id}`, { ...rest }),
    ];
    const response = await Promise.all(requestsAddData);
    if (Image) {
      const formData = new FormData();
      formData.append("product_id", data.id);
      await Promise.all(
        Image.map((file) => {
          formData.append("Image", file);
          return axios.post("/images", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        })
      );
    }
    if (response) return "All update requests completed successfully.";
  }
};
export const updateUser = async (user) => {
  const res = axios.put(`/user/${user.id}`, { ...user });
  return res;
};
export const deleteProduct = async (product_id) => {
  try {
    const requests = [
      axios.delete(`/product_sizes/${product_id}`),
      axios.delete(`/product_colors/${product_id}`),
      axios.delete(`/checkout/order_items/${product_id}`),
      axios.delete(`/images/${product_id}`),
    ];
    await Promise.all(requests);
    const res = await axios.delete(`/product/${product_id}`);
    if (res) return "All delete requests completed successfully.";
    return;
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};
export const deleteUser = async (user_id) => {
  try {
    const res = await axios.delete(`/user/${user_id}`);
    if (res) return "All delete requests completed successfully.";
    return "Something's wrong";
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};
export const deleteOrder = async (order_id) => {
  try {
    const res = await axios.delete(`/checkout/order_details/${order_id}`);
    if (res) return "All delete requests completed successfully.";
    return;
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};
