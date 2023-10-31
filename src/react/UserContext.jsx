import React, { createContext, useState, useEffect } from "react";
import userActions from '../utils/userActions';
import makeAxiosRequest from "../utils/makeAxiosRequest";

export const UserContext = createContext();

export default ({ children }) => {
    const [user, setUser] = useState("");
    const [token, setToken] = useState("");
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = await userActions.fetchToken();
                setToken(token);
                const data = await makeAxiosRequest("auth-check", "post");
                if (!Object.keys(data).includes("error")) {
                    setUser(data);
                    setAuthenticated(true);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchUser();
    }, []);

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                token,
                setToken,
                authenticated,
                setAuthenticated,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};