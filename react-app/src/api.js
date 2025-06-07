import axios from "axios";

const clientURL = import.meta.env.VITE_CLIENT_URL;

const api = axios.create({
  baseURL: clientURL,
  withCredentials: true,
});

export default api;
