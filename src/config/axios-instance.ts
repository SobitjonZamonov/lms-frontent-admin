import axios from "axios";
import Cookie from "js-cookie";

export const instance = axios.create({
  baseURL: 'http://13.201.9.21:4000/api/v1',
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