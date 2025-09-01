import axios from 'axios';

// Create an Axios instance
// const api = axios.create({
//   baseURL: 'https://backend-startup-4.onrender.com/', 
//   // Your backend URL
//   withCredentials: true, // if you need cookies for auth
// });
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  withCredentials: true,
});


// Optional: Add interceptors for requests (e.g., adding token)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // or use context
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
