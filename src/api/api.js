import axios from "axios";

const API_BASE = "http://localhost:5000";
axios.defaults.baseURL = API_BASE;


export const authApi = {
  login: async (data) => {
     return await axios.post(`/login`, data);
    },
};

export const ordersApi = {
  get: async ({ startDate, endDate, pageSize, offset, filterWord }) => {
    return await axios.get(`/orders?startDate=${startDate}&endDate=${endDate}&limit=${pageSize}&offset=${offset}&filterWord=${filterWord}`);
  },
};

export const categoriesApi = {
  get: async () => {
    return await axios.get(`/categories`);
  },
  create: async (data) => {
    return await axios.post(`/categories`, data);
  },
  edit: async (data) => {
    return await axios.put(`/categories`, data);
  },
};

export const ingredientsApi = {
  get: async () => {
    return await axios.get(`/ingredients`);
  },
  create: async (name) => {
    return await axios.post(`/ingredients`, { name });
  },
  edit: async (data) => {
    return await axios.put(`/ingredients`, data);
  },
};

export const extraIngredientsApi = {
  get: async () => {
    return await axios.get(`/extra-ingredients`);
  },
  create: async (data) => {
    return await axios.post(`/extra-ingredients`, data);
  },
  edit: async (data) => {
    return await axios.put(`/extra-ingredients`, data);
  },
};

export const productsApi = {
  get: async ({ pageSize, offset, filterWord }) => {
    return await axios.get(`/products?limit=${pageSize}&offset=${offset}&filter_word=${filterWord}`)
  },
  create: async (data) => {
    return await axios.post(`/products`, data);
  },
  edit: async (data) => {
    return await axios.put(`/products`, data);
  }
};

export const pizzaSizesApi = {
  get: async () => {
    return await axios.get(`/pizza-sizes`);
  },
  create: async (data) => {
    return await axios.post(`/pizza-sizes`, data);
  },
  edit: async (data) => {
    return await axios.put(`/pizza-sizes`, data);
  },
  delete: async (data) => {
    return await axios.delete(`/pizza-sizes`, { data });
  }
};

export const fieldsApi = {
  get: async () => {
    return await axios.get(`/fields`);
  },
  create: async (data) => {
    return await axios.post(`/fields`, data);
  },
  edit: async (data) => {
    return await axios.put(`/fields`, data);
  },
  delete: async (data) => {
    return await axios.delete(`/fields`, { data });
  },
};
