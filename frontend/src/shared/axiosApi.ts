import axios from "axios";
import { deleteToken, getToken } from "./token";

const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:8000";
console.log(`Using backend url: ${baseURL}`);
console.log("Available env vars:", import.meta.env);
const axiosApi = axios.create({
    baseURL,
});

// Request interceptor to add auth-token header
axiosApi.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers["auth-token"] = token;
    }
    return config;
});

axiosApi.interceptors.response.use(undefined, async (error) => {
    if (error.response?.status === 401) {
        await deleteToken();
    }
});

export { axiosApi };
