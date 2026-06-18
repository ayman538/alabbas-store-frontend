import axios from "axios";
import { getCookie } from "../utils/cookieUtils";

export const apiClient = axios.create({
  baseURL: "http://localhost:8081/api",
});

apiClient.interceptors.request.use((config) => {
  const token = getCookie("token");
  const lang = getCookie("lang") ?? "en";

  config.headers["Accept-Language"] = lang;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
