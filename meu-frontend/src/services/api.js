import axios from "axios"


const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const api = axios.create({
    baseURL: API_URL
});


api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
            if(token) {
                config.headers['authorization'] = `Bearer ${token}`
            }
            return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default api;