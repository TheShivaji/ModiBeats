import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true 
});


export const Signup = async ({username, email, password}) => {
    try {
        const response = await api.post("/api/auth/signup", { username, email, password });
        return response.data; 
    } catch (error) {
        console.error("Signup Error:", error.response?.data?.message || error.message);
        throw error; 
    }
};

export const Login = async ({username, email, password}) => {
    try {
        const response = await api.post("/api/auth/login", { username, email, password });
        return response.data; 
    } catch (error) {
        console.error("Login Error:", error.response?.data?.message || error.message);
        throw error;
    }
};

export const getMe = async () => {
    try {
        const response = await api.get("/api/auth/get-me");
        return response.data;
    } catch (error) {
        console.error("GetMe Error:", error.message);
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