import axiosBase from "axios";

const API_BASE = "http://localhost:5000";

export const axios = axiosBase.create({
  baseURL: API_BASE,
});

export const fetchGetCategories = async () => {
  return await axios.get(`/categories`);
};

export const fetchAddCategory = async (name, token) => {
  return await axios.post(
    `/categories`,
    { name },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const fetchLoggedInUser = async (phone, password) => {
  return await axios.post(`/login`, { phone, password });
};
