import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUser({
                email: decodedToken.sub,
                role: decodedToken.scope,
                fullName: decodedToken.fullName, // <-- Add the full name here
            });
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        const decodedToken = jwtDecode(token);
        setUser({
            email: decodedToken.sub,
            role: decodedToken.scope,
            fullName: decodedToken.fullName,
        });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}> {/* Add login here */}
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};