import axios from "axios";

const API = axios.create({
    baseURL: "https://task-manager-yots.onrender.com"
});

export default API;