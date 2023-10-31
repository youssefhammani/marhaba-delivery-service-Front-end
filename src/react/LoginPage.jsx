import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import userActions from '../utils/userActions';
import { Redirect } from 'react-router-dom';

const LoginPage = () => {
    const { setUser, token, authenticated, setAuthenticated } = useContext(UserContext);
    const [input, setInput] = useState({
        username: "",
        password: "",
    });

    const handleInput = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const userData = await userActions.logIn(token, input.username, input.password);
            if (!Object.keys(userData).includes("error")) {
                setUser(userData);
                setAuthenticated(true);
            } else {
                // handle error
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            {authenticated ? <Redirect to="/Dashboard" /> : null}
            <form onSubmit={handleSubmit}>
                <input type="text" name='username' value={input.username} onChange={handleInput} />
                <input type="password" name='password' value={input.password} onChange={handleInput} />
                <input type="submit" value="Login" />
            </form>
        </div>
    );
};

export default LoginPage;
