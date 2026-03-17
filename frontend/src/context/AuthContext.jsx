import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Quan trọng: Để React đợi kiểm tra token xong mới vẽ giao diện

    useEffect(() => {
        const checkAuth = async () => {
            // Bước 1: Lấy token từ localStorage ngay khi F5
            const token = localStorage.getItem('token');

            if (token) {
                // Bước 2: Gắn ngay token vào Header của Axios để gọi API /me
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                
                try {
                    // Bước 3: Gọi API /me để xác thực token này còn sống hay không
                    // Hãy đảm bảo Backend Laravel của bạn đang chạy và có Route này
                    const res = await axios.get('http://localhost:8000/api/me');
                    
                    // Bước 4: Nếu OK, lưu thông tin user vào State
                    setUser(res.data);
                } catch (err) {
                    console.error("Token hết hạn hoặc sai:", err);
                    localStorage.removeItem('token');
                    delete axios.defaults.headers.common['Authorization'];
                    setUser(null);
                }
            }
            // Bước 5: Sau khi kiểm tra xong (dù thành công hay thất bại) mới tắt Loading
            setLoading(false);
        };

        checkAuth();
    }, []);

    const login = (userData, token) => {
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
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