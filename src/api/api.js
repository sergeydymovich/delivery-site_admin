import axiosBase from "axios";

const API_BASE = "http://localhost:5000";
const storageUser = JSON.parse(localStorage.getItem("user"));
const AUTH_TOKEN = storageUser.token;

export const axios = axiosBase.create({
  baseURL: API_BASE,
  headers: {
    Authorization: `Bearer ${AUTH_TOKEN}`,
  },
});

export const fetchLoggedInUser = async (phone, password) => {
  return await axios.post(`/login`, { phone, password });
};

export const fetchGetCategories = async () => {
  return await axios.get(`/categories`);
};

export const fetchAddCategory = async (name) => {
  return await axios.post(`/categories`, { name });
};

export const fetchAddIngredient = async (name) => {
  return await axios.post(`/ingredients`, { name });
};

export const fetchGetIngredients = async () => {
  return await axios.get(`/ingredients`);
};

export const fetchAddExtraIngredient = async (data) => {
  return await axios.post(`/extra-ingredients`, data);
};

export const fetchGetExtraIngredients = async () => {
  return await axios.get(`/extra-ingredients`);
};
