import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../provider/AuthContext';

const StaffRoute = ({ children, requiredRoles = ['Role_Admin', 'Role_Staff'], redirectPath = '/login' }) => {
    const { role, token, logout } = useContext(AuthContext);
    const [loggedIn, setLoggedIn] = useState(false);
    const [initialized, setInitialized] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const initializeAuth = async () => {
            // Kiểm tra xem đã đăng nhập thành công chưa
            if (loggedIn) {
                // Cập nhật role và token từ context hoặc localStorage
                // Ví dụ: từ localStorage
                const savedToken = localStorage.getItem('persist:root');
                if (savedToken) {
                    const parsedData = JSON.parse(savedToken);
                    const authData = JSON.parse(parsedData.auth);
                    const roleFromStorage = authData.login.currentUser.role;
                    const tokenFromStorage = authData.login.currentUser.token;
                    // Kiểm tra và cập nhật role từ localStorage
                    if (roleFromStorage && tokenFromStorage) {

                        setInitialized(true);
                    }
                }
            }
        };

        initializeAuth();
    }, [loggedIn]);
    console.log(role)

    useEffect(() => {
        // Kiểm tra xem đã khởi tạo role và token từ localStorage
        if (!role && !token && initialized) {
            // Chưa khởi tạo, chuyển hướng người dùng đến trang đăng nhập
            return <Navigate to={redirectPath} replace state={{ from: location }} />;
        }
    }, [role, token, initialized]);

    // Kiểm tra xem người dùng có quyền truy cập không
    if (!requiredRoles.includes(role)) {
        logout()
        return <Navigate to={redirectPath} replace state={{ from: location }} />;
    }

    // Nếu người dùng có quyền, render children
    return children;
};

export default StaffRoute;
