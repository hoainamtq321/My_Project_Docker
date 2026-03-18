import axios from "axios";

// Tạo một thực thể axios dùng chung cho toàn dự án
const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
});

// INTERCEPTOR: Tự động đính kèm Token vào Header trước khi gửi request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Các hàm API của bạn giờ sẽ dùng thực thể 'api' này
export const loginApi = async (credentials) => {
    const response = await api.post("/login", credentials);
    return response.data;
};

export const registerApi = async (userData) => {
    const response = await api.post("/register", userData);
    return response.data;
};

// Hàm lấy thông tin user hiện tại (để check khi F5)
export const getMeApi = async () => {
    const response = await api.get("/me");
    console.log("API /me response:", response.data); // Debug: Xem dữ liệu trả về từ API /me
    return response.data;
};

export default api;