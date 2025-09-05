import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            // The roles are in the 'scope' or 'roles' claim in your JWT
            // Check your JWT structure at jwt.io to be sure. It's often 'sub' for subject/email and 'scope' for roles.
            setUser({
                email: decodedToken.sub,
                role: decodedToken.scope, // Adjust if your role claim is named differently
            });
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};