import axios from 'axios';

// Create the axios instance FIRST
const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Replace with your actual backend URL
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export { api };
