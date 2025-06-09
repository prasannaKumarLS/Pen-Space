import axios from "axios";

const clientURL = import.meta.env.VITE_SERVER_URL;

const apiURL = `${clientURL}/api`;

const api = axios.create({
  baseURL: apiURL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
