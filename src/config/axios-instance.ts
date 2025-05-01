import axios from "axios";
import Cookie from "js-cookie";

export const instance = axios.create({
  baseURL: 'https://api.admin.bekzodjon.uz/api/v1',
});

instance.interceptors.request.use((config) => {
  if (config.url !== "/auth/refresh") {
    const accessToken = Cookie.get("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
  }
  return config;
});