import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import makeApiRequest from '../utils/makeAxiosRequest';
import Swal from 'sweetalert2';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

const ConfirmEmail = () => {
    const { token } = useParams();
    const location = useLocation();
    const decodedToken = token.replace(/\~/g, '.');
    const pathParts = location.pathname.split('/');
    pathParts[pathParts.length - 1] = decodedToken;
    const newPath = 'auth' + pathParts.join('/');

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await makeApiRequest(newPath);
                console.log(data);
                setSuccess(true);
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Your email has been confirmed. You can now log in.',
                });
            } catch (error) {
                console.error(error);
                setError(true);
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'There was an error confirming your email.',
                });
            }
        };
        fetchData();
    }, [newPath]);

    // return (
    //     <div>
    //         {success && (
    //             <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
    //                 <strong className="font-bold">Success!</strong>
    //                 <span className="block sm:inline"> Your email has been confirmed.</span>
    //             </div>
    //         )}
    //         {error && (
    //             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
    //                 <strong className="font-bold">Error!</strong>
    //                 <span className="block sm:inline"> There was an error confirming your email.</span>
    //             </div>
    //         )}
    //         <Link to="/login">Go to Login</Link>
    //     </div>
    // );

    // return (
    //     // <div>
    //     //     <Link to="/login">Go to Login</Link>
    //     // </div>
    //     <LoginPage />
    // );

    if (success) {
        return <LoginPage />;
    } else if (error) {
        return <RegisterPage />;
    } else {
        return null;
    }
};

export default ConfirmEmail;