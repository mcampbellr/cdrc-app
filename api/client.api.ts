import {
  deleteRefreshToken,
  getRefreshToken,
  saveRefreshToken,
} from "@/state/refreshToken.store";
import { useUserStore } from "@/state/users.store";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    error ? prom.reject(error) : prom.resolve(token);
  });
  failedQueue = [];
};

const shouldSkipAuthRefresh = (url: string): boolean => {
  return url.includes("/v1/auth/refresh");
};

api.interceptors.request.use(
  async (config) => {
    const userStore = useUserStore.getState();
    if (userStore.accessToken) {
      config.headers.Authorization = `Bearer ${userStore.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const requestUrl = originalRequest?.url || "";

    const isUnauthorized = error.response?.status === 401;

    if (originalRequest._retryAttempted) {
      return Promise.reject(error);
    }

    if (
      isUnauthorized &&
      !originalRequest._retry &&
      !shouldSkipAuthRefresh(requestUrl)
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await getRefreshToken();
        const userId = useUserStore.getState().user?.id;

        if (!refreshToken || !userId) {
          throw new Error("No refresh token or user ID found");
        }

        const { data } = await api.post("/v1/auth/refresh", {
          refreshToken,
          userId,
        });

        const newToken = data.accessToken;

        useUserStore.setState({ accessToken: newToken });
        await saveRefreshToken(data.refreshToken);
        api.defaults.headers.common.Authorization = `Bearer ${newToken}`;
        processQueue(null, newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        originalRequest._retryAttempted = true;

        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);

        await deleteRefreshToken();
        useUserStore.setState({
          accessToken: null,
          user: null,
        });
        window.location.href = "/login";

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
