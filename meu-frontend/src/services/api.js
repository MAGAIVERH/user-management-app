import axios from "axios"

const API_URL = 'https://user-management-qzu0s3p0r-magaiver.vercel.app';

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