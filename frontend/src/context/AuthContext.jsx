import { createContext, useState, useEffect, useContext } from 'react';

import api, { getMeApi } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Quan trọng: Để React đợi kiểm tra token xong mới vẽ giao diện

    useEffect(() => {
        const checkAuth = async () => {
            // Bước 1: Lấy token từ localStorage ngay khi F5
            const token = localStorage.getItem('token');
            if (token) {         
                try {
                    // Gọi API được cấu hình trong api.js để xác thực token này còn sống hay không
                    const userData = await getMeApi();
                    
                    // Nếu OK, lưu thông tin user vào State
                    setUser(userData);
                } catch (err) {
                    console.error("Token hết hạn hoặc sai:", err);
                    setUser(userData);
                }
            }
            // Sau khi kiểm tra xong (dù thành công hay thất bại) mới tắt Loading
            setLoading(false);
        };

        checkAuth();
    }, []);

    const login = (userData, token) => {
        localStorage.setItem('token', token);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {/* Nếu đang loading (đang đợi API /me trả về), 
               chúng ta không render children để tránh bị nháy trang "Chưa đăng nhập"
            */}
            {!loading ? children : <div className="text-center mt-5">Đang kiểm tra đăng nhập...</div>}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);