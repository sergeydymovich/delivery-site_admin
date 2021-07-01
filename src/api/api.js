import axios from "axios";

const API_BASE = "http://localhost:5000";
axios.defaults.baseURL = API_BASE;

export const fetchLogin = async (phone, password) => {
  return await axios.post(`/login`, { phone, password });
};

export const fetchGetOrders = async ({ startDate, endDate, pageSize, offset, filterWord }) => {

  return await axios.get(`/orders?startDate=${startDate}&endDate=${endDate}&limit=${pageSize}&offset=${offset}&filterWord=${filterWord}`);
};

export const fetchGetCategories = async () => {
  return await axios.get(`/categories`);
};

export const fetchAddCategory = async (data) => {
  return await axios.post(`/categories`, data);
};

export const fetchChangeCategory = async (data) => {
  return await axios.put(`/categories`, data);
};

export const fetchAddIngredient = async (name) => {
  return await axios.post(`/ingredients`, { name });
};

export const fetchChangeIngredient = async ({ _id, name }) => {
  return await axios.put(`/ingredients`, { _id, name });
};

export const fetchGetIngredients = async () => {
  return await axios.get(`/ingredients`);
};

export const fetchAddExtraIngredient = async (data) => {
  return await axios.post(`/extra-ingredients`, data);
};

export const fetchChangeExtraIngredient = async (data) => {
  return await axios.put(`/extra-ingredients`, data);
};

export const fetchGetExtraIngredients = async () => {
  return await axios.get(`/extra-ingredients`);
};

export const fetchGetProducts = async ({ pageSize, offset, filterWord }) => {
  return await axios.get(`/products?limit=${pageSize}&offset=${offset}&filterWord=${filterWord}`)
};

export const fetchAddProduct = async (data) => {
  return await axios.post(`/products`, data);
};

export const fetchChangeProduct = async (data) => {
  return await axios.put(`/products`, data);
};

export const fetchGetPizzaSizes = async () => {
  return await axios.get(`/pizza-sizes`);
};

export const fetchChangePizzaSize = async ({ _id, size }) => {
  return await axios.put(`/pizza-sizes`, { _id, size });
};

export const fetchGetFields = async () => {
  return await axios.get(`/fields`);
};

export const fetchAddField = async (data) => {
  return await axios.post(`/fields`, data);
};