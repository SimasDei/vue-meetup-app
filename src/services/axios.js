import axios from 'axios';

const axiosInstance = axios.create({
  timeout: 3000,
});

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('meetup-jwt') || '';
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  },
);

export default axiosInstance;
