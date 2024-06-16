// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [role, setRole] = useState(null);
    const [position, setPosition] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const savedData = localStorage.getItem('persist:root');
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            const authData = JSON.parse(parsedData.auth);
            console.log(authData)
            const parsedToken = authData?.login?.currentUser?.token;
            const role = authData?.login?.currentUser?.role;
            const position = authData?.login?.currentUser?.position;
            if (parsedToken) {
                setToken(parsedToken);
            }

            if (role) {
                setRole(role);
            }
            if (position) {
                setPosition(position);
            }
        }
    }, []);


    const login = (loginData) => {
        const { role, token, position, email } = loginData; // Assuming loginData has role information
        console.log(loginData)
        if (role === 'Role_Admin' || role === 'Role_Staff') {
            // Lưu token vào localStorage
            localStorage.setItem('authToken', token);
            setRole(role)
            setToken(token)
            setPosition(position)
            setTimeout(() => {
                navigate('/manage/patient');
            }, 1000);
        } else if (role === 'Role_Patient') {
            setRole(role)
            setToken(token)

            // Lưu token vào localStorage
            localStorage.setItem('authToken', token);
            if (email) {
                setTimeout(() => {
                    navigate('/appointment');
                }, 1000);

            } else {
                setTimeout(() => {
                    navigate('/active/mail');
                }, 1000);
            }
        } else {
            navigate('/login'); // Redirect to login if role is unknown or not provided
        }
    };

    const logout = () => {
        setToken(null);
        setRole(null);
        localStorage.removeItem('persist:root');
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ token, role, position, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
