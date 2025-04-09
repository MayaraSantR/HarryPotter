import axios from "axios";

const api = axios.create({
    baseURL: 'https://hp-api.onrender.com/api/characters'
});

export default api;
