// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('authToken'));
    const [email, setEmail] = useState(localStorage.getItem('email'));
    const [role, setRole] = useState(localStorage.getItem('authRole'));
    const [userName, setUserName] = useState(localStorage.getItem('userName'));
    const [position, setPosition] = useState(localStorage.getItem('authPosition'));
    const navigate = useNavigate();

    useEffect(() => {
        const savedData = localStorage.getItem('persist:root');
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            const authData = JSON.parse(parsedData.auth);
            const parsedToken = authData?.login?.currentUser?.token;
            const role = authData?.login?.currentUser?.role;
            const position = authData?.login?.currentUser?.position;
            const userName = authData?.login?.currentUser?.userName;
            const email = authData?.login?.currentUser?.email;
            if (parsedToken) {
                setToken(parsedToken);
            }

            if (role) {
                setRole(role);
            }
            if (position) {
                setPosition(position);
            }
            if (userName) {
                setUserName(userName);
            }
            if (email) {
                setUserName(email);
            }
        }
    }, []);

    const login = (loginData) => {
        const { role, token, position, email, userName } = loginData;
        if (role === 'Role_Admin' || role === 'Role_Staff') {
            // Lưu token vào localStorage
            localStorage.setItem('authToken', token);
            localStorage.setItem('userName', userName);
            localStorage.setItem('authRole', role);
            localStorage.setItem('authPosition', position);
            setRole(role);
            setToken(token);
            setPosition(position);
            setUserName(userName)
            setTimeout(() => {
                if (role === 'Role_Staff') {
                    position === 'dentist' ? navigate('/manage/queue') : navigate('/manage/appointment');
                } else {
                    navigate('/manage/staff');
                }
            }, 1000);
        } else if (role === 'Role_Patient') {
            setRole(role);
            setToken(token);
            setEmail(email)

            // Lưu token vào localStorage
            localStorage.setItem('userName', userName);
            localStorage.setItem('authToken', token);
            localStorage.setItem('authRole', role);
            localStorage.setItem('authPosition', position);
            localStorage.setItem('email', email);
            if (email) {
                setTimeout(() => {

                    // navigate('/appointment');
                    navigate('/medical-record');
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
        setPosition(null);
        setUserName(null);
        setEmail(null)
        localStorage.removeItem('authToken');
        localStorage.removeItem('authRole');
        localStorage.removeItem('userName');
        localStorage.removeItem('email');
        localStorage.removeItem('authPosition');
        localStorage.removeItem('persist:root');
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ token, role, position, login, logout, userName, email }}>
            {children}
        </AuthContext.Provider>
    );
};
