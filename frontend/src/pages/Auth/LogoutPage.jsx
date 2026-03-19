// src/pages/Auth/LogoutPage.jsx
import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const performLogout = async () => {
            // 1. Gọi hàm logout (đã bao gồm xóa LocalStorage và gọi API Backend)
            await logout();
            
            // 2. Sau khi xong, đá người dùng về trang Login hoặc Trang chủ
            navigate('/auth/login');
        };

        performLogout();
    }, [logout, navigate]);

    return (
        <div className="text-center mt-5">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Đang đăng xuất ...</p>
        </div>
    );
};

export default LogoutPage;