import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:8080/api/auth/login"
});

export default api;