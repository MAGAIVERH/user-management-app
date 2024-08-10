import axios from "axios"


  const api = axios.create({
    baseURL: "https://user-management-app-three.vercel.app/" 
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