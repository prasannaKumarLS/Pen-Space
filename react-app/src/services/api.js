import axios from "axios";

const clientURL = import.meta.env.VITE_SERVER_URL;

const apiURL = `${clientURL}/api`;

const api = axios.create({
  baseURL: apiURL,
  withCredentials: true,
});

export default api;
