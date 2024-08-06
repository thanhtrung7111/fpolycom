import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/",
});

api.interceptors.request.use((config) => {
  if (sessionStorage.getItem("token")) {
    config.headers.Authorization = `Bearer ` + sessionStorage.getItem("token");
  }
  return config;
});

export default api;
