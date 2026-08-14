import axios from "axios";

// Set VITE_API_URL in a .env file to point at your backend in other
// environments. Falls back to localhost for local development.
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3002";

const client = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default client;
