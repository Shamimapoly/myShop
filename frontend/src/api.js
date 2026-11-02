import axios from "axios";

const api = axios.create(
  // learning
  {
    baseURL: import.meta.env.VITE_BACKEND_API,
    header: { "Content-Type": "application/json" },
  },
  // learning
);

//req with token

// Add a request interceptor
api.interceptors.request.use(
  function (config) {
    // learning
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // learning

    // Do something before the request is sent
    return config;
  },
  function (error) {
    // Do something with the request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
api.interceptors.response.use(
  function (response) {
    // Any status code that lies within the range of 2xx causes this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // learning
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      if (window.location.pathname !== "/login") {
        // without page
        window.location.assign("/login");
      }
    }
    // learning
    // Any status codes that fall outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);

export default api;
