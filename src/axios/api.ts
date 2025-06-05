import axios from "axios";

if (!import.meta.env.VITE_API_URL)
    throw new Error("Variable API_URL is not set!")

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})