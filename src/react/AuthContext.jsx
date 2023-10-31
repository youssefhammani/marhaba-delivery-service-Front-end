import React, { useContext, useState } from 'react';
import makeAxiosRequest from '../utils/makeAxiosRequest';

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    const login = async (email, password) => {
        // Your login logic here
        try {
            const response = await makeAxiosRequest(
                'POST',
                '/login',
                { email, password },
            );
            setCurrentUser(response.data.user);
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    };

    const logout = async () => {
        // Your logout logic here
        setCurrentUser(null);
    };

    const value = {
        currentUser,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
