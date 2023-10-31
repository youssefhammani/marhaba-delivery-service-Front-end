import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    // const { login, logout } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        console.log('Logging in...', email, password);
        try {
            const { login } = useAuth();
            await login(email, password);
            console.log('Logged in!', email, password);
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    // const handleLogout = async () => {
    //     try {
    //         const { logout } = useAuth();
    //         await logout();
    //     } catch (error) {
    //         console.error('Error logging out:', error);
    //     }
    // };

    return (
        <div className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div className="flex justify-center mx-auto">
                <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt="Logo" />
            </div>

            <form className="mt-6" onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username" className="block text-sm text-gray-800 dark:text-gray-200">
                        Username
                    </label>
                    <input
                        type="text"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        name="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>

                <div className="mt-4">
                    <label htmlFor="password" className="block text-sm text-gray-800 dark:text-gray-200">
                        Password
                    </label>
                    <input
                        type="password"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        name="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>

                <div className="mt-6">
                    <button
                        type="submit"
                        className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-600 rounded-full hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
                    >
                        Log In
                    </button>
                </div>
            </form>

            {/* <div className="mt-6">
                <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-600 rounded-full hover:bg-red-500 focus:outline-none focus:bg-red-500"
                >
                    Log Out
                </button> */}
            {/* </div> */}
        </div>
    );
};

export default LoginPage;
