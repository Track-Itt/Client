// src/services/api.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://172.20.10.2:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in the Authorization header
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const registerUser = async (name, email, password, employeeId) => {
  const response = await api.post('/user/register', { name, email, password, employeeId });
  return response.data;
};

export const loginUser = async (email, password) => {
  const response = await api.post('/user/login', { email, password });
  return response.data;
};

export const setAuthToken = async (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    await AsyncStorage.setItem('token', token);
  } else {
    delete api.defaults.headers.common['Authorization'];
    await AsyncStorage.removeItem('token');
  }
};

export const addProduct = async (name, count, cost, productCategory, inventory) => {
  const response = await api.post('/product/addProduct', { name, count, cost, productCategory, inventory });
  return response.data;
};

export const fetchAllCategories = async () => {
  const response = await api.get('/category/fetchAllCategories');
  return response.data;
};

export const fetchAllInventories = async () => {
  const response = await api.get('/inventory/fetchAllInventories');
  return response.data;
};

export default api;
