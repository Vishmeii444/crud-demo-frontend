import axios from "axios";

const api = axios.create({
    // gets url from .env folder
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/tasks",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;