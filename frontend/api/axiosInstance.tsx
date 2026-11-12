import axios from "axios";

// Production backend on Render. To develop against a local backend, set
// NEXT_PUBLIC_API_URL=http://localhost:4000 in frontend/.env.local
const axiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL || "https://techtrail-x074.onrender.com",
});

export default axiosInstance;
