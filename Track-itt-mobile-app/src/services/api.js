// src/services/api.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

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

// Fetch all products with filtering and pagination
export const fetchAllProducts = async (page, limit, category, inventory, searchTerm) => {
  const response = await api.get('/product/fetchAllProducts', {
    params: {
      page,
      limit,
      category,
      inventory,
      searchTerm,
    },
  });
  return response.data;
};

// Fetch all warehouses for sending items
export const fetchAllWarehouses = async () => {
  const response = await api.get('/warehouse/fetchAllWarehouses');
  return response.data;
};

// Send items to another location
export const sendItems = async (from, to, productsTransferred, deliveredByEmployeeId, receivedByEmployeeId, vehicleNumber) => {
  const response = await api.post('/productTransfer/addProductTransfer', {
    from,
    to,
    productsTransferred,
    deliveredByEmployeeId,
    receivedByEmployeeId,
    vehicleNumber,
  });
  return response.data;
};

// Fetch all product transfers
export const fetchAllProductTransfers = async () => {
  const response = await api.get('/productTransfer/getAllProductTransfers');
  return response.data;
};

// Fetch a single product transfer by ID
export const fetchProductTransferById = async (transferId) => {
  const response = await api.get(`/productTransfer/getProductTransferById/${transferId}`);
  return response.data;
};

// Complete a product transfer by providing receivedByEmployeeId
export const completeProductTransfer = async (transferId, receivedByEmployeeId) => {
  const response = await api.patch(`/productTransfer/completeProductTransfer`, {
    transferId,
    receivedByEmployeeId,
  });
  return response.data;
};

// Fetch user profile
export const fetchUserProfile = async () => {
  const response = await api.get('/user/profile');
  return response.data;
};

// Logout function to clear token
export const logoutUser = async () => {
  await setAuthToken(null);
};

// Fetch chart data
export const fetchPieChartData = async () => {
  const response = await api.get('/chart/pieChart');
  return response.data;
};

export const fetchLineChartData = async () => {
  const response = await api.get('/chart/lineChart');
  return response.data;
};

export const fetchInvoicesTableData = async (page = 1, limit = 10) => {
  const response = await api.get('/chart/invoicesTable', {
    params: { page, limit },
  });
  return response.data;
};

export default api;
