import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
});

let accessToken = null;

export const setAccessToken = (token) => {
    accessToken = token;

};
// Interceptor se theek upar ye do variable bana
let isRefreshing = false;
let refreshPromise = null; 

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            // Agar koi aur refresh nahi lene gaya hai, tabhi andar jao
            if (!isRefreshing) {
                isRefreshing = true;
                console.log("🔄 calling refresh...");

                // Promise ko variable mein save kar lo, taaki dusri request iska wait kar sake
                refreshPromise = axios.post(
                    "http://localhost:3000/api/auth/refresh-token",
                    {},
                    { withCredentials: true }
                ).then((res) => {
                    const newAccessToken = res.data.accessToken;
                    setAccessToken(newAccessToken); // Tera fix kiya hua function
                    isRefreshing = false;
                    return newAccessToken; 
                }).catch((err) => {
                    isRefreshing = false;
                    throw err;
                });
            }

            try {
                // Yahan chahe 1 request ho ya 10, sab naye token ka wait karengi
                const token = await refreshPromise; 
                console.log("✅ Token mil gaya, retrying original request");
                
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return api(originalRequest); // Ruki hui request aage badha do
                
            } catch (err) {
                console.log("Refresh failed:", err.message);
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export const Signup = async ({ username, email, password }) => {
    try {
        const response = await api.post("/api/auth/signup", { username, email, password });
        return response.data;
    } catch (error) {
        console.log("Signup Error:", error.response?.data?.message || error.message);
        throw error;
    }
};

export const Login = async ({ username, email, password }) => {
    try {
        const response = await api.post("/api/auth/login", { username, email, password });
        
        setAccessToken(response.data.accesstoken); 
        return response.data;
    } catch (error) {
        console.log("Login Error:", error.response?.data?.message || error.message);
        throw error;
    }
};

export const getMe = async () => {
    try {
        const response = await api.get("/api/auth/get-me");
        return response.data;
    } catch (error) {
        console.log("GetMe Error:", error.message);
        throw error;
    }
};

export const Logout = async () => {
    try {
        const response = await api.get("/api/auth/logout");
        return response.data;
    } catch (error) {
        console.error("Logout Error:", error.message);
        throw error;
    }
};