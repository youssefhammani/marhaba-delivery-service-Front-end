import React, { useState, useRef, useEffect } from 'react';
import makeApiRequest from '../utils/makeAxiosRequest';
import Swal from 'sweetalert2';
import '../App.css';
import InputValidator from '../utils/InputValidator';
import axios from 'axios';


// const RegisterPage = () => {
//     const formRef = useRef(null);
//     const [showRoles, setShowRoles] = useState(false);
//     const [user, setUser] = useState({
//         username: '',
//         email: '',
//         password: '',
//         role: 'Client',
//         // password_confirmation: '',
//     });
//     const [errors, setErrors] = useState({
//         username: '',
//         email: '',
//         password: '',
//         confirmPassword: '',
//     });
//     const [formValid, setFormValid] = useState(false);


//     const handleRolesClick = () => {
//         setShowRoles(true);
//     };

//     // const handleChange = (e) => {
//     //     setUser({
//     //         ...user,
//     //         [e.target.name]: e.target.value
//     //     });
//     // };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setUser((prevState) => ({
//             ...prevState,
//             [name]: value,
//         }));
//         validateField(name, value);
//     };

//     const validateField = (name, value) => {
//         let error = '';
//         switch (name) {
//             case 'username':
//                 error = value.length < 3 ? 'Username must be at least 3 characters long' : '';
//                 break;
//             case 'email':
//                 error = !/\S+@\S+\.\S+/.test(value) ? 'Email address is invalid' : '';
//                 break;
//             case 'password':
//                 error = value.length < 6 ? 'Password must be at least 6 characters long' : '';
//                 break;
//             case 'confirmPassword':
//                 error = value !== user.password ? 'Passwords do not match' : '';
//                 break;
//             default:
//                 break;
//         }
//         setErrors((prevState) => ({
//             ...prevState,
//             [name]: error,
//         }));
//         setFormValid(Object.values(errors).every((error) => error === ''));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log('Registering...', user);
//         try {
//             const data = await makeApiRequest('auth/register', user, 'post');
//             console.log(data);
//             Swal.fire({
//                 icon: 'success',
//                 title: 'Success!',
//                 text: 'Your account has been created. Please check your email to verify your account.',
//             }).then(() => {
//                 formRef.current.reset();
//             });
//         } catch (error) {
//             console.error(error);
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Error!',
//                 text: 'There was an error creating your account.',
//             });
//         }
//     };

//     const isFormValid = () => {
//         return Object.values(errors).every((error) => error === '');
//     };


//     return (
//         // <body className="font-mono bg-gray-400">
//         <div className="bg-gray-200 font-family-karla h-screen">
//             <div className="container mx-auto">
//                 <div className="flex justify-center items-center h-screen px-6">
//                     <div className="w-full xl:w-3/5 lg:w-11/12 flex justify-end items-end">
//                         {/* <div className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg" style={{ backgroundImage: "url('https://source.unsplash.com/Mv9hjnEUHR4/600x800')" }}></div> */}
//                         <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg">
//                             <h3 className="pt-4 text-2xl text-center">Create an Account!</h3>
//                             <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={handleSubmit} ref={formRef} >
//                                 <div className="mb-4 ">
//                                     <div className="mb-4 md:mr-2 md:mb-0">
//                                         <label className="block mb-2 text-start text-sm font-bold text-gray-700" htmlFor="firstName">
//                                             Username
//                                         </label>
//                                         <input
//                                             className="w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
//                                             id="username"
//                                             type="text"
//                                             placeholder="Username"
//                                             name='username'
//                                             value={user.username}
//                                             onChange={handleChange}
//                                         />
//                                         <p className="text-xs italic text-red-500">
//                                             {errors.username && <span>{errors.username}</span>}
//                                         </p>
//                                     </div>
//                                     {/* <div className="md:ml-2">
//                                         <label className="block mb-2 text-start text-sm font-bold text-gray-700" htmlFor="lastName">
//                                             Last Name
//                                         </label>
//                                         <input
//                                             className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
//                                             id="lastName"
//                                             type="text"
//                                             placeholder="Last Name"
//                                         />
//                                     </div> */}
//                                 </div>
//                                 <div className="mb-4">
//                                     <label className="block mb-2 text-start text-sm font-bold text-gray-700" htmlFor="email">
//                                         Email
//                                     </label>
//                                     <input
//                                         className="w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
//                                         id="email"
//                                         type="email"
//                                         placeholder="Email"
//                                         name='email'
//                                         value={user.email}
//                                         onChange={handleChange}
//                                     />
//                                     <p className="text-xs italic text-red-500">
//                                         {errors.email && <span>{errors.email}</span>}
//                                     </p>
//                                 </div>
//                                 <div className="mb-4 md:flex md:justify-between">
//                                     <div className="mb-4 md:mr-2 md:mb-0">
//                                         <label className="block mb-2 text-start text-sm font-bold text-gray-700" htmlFor="password">
//                                             Password
//                                         </label>
//                                         <input
//                                             className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
//                                             id="password"
//                                             type="password"
//                                             placeholder="******************"
//                                             name='password'
//                                             value={user.password}
//                                             onChange={handleChange}
//                                         />
//                                         <p className="text-xs italic text-red-500">
//                                             {errors.password && <span>{errors.password}</span>}
//                                         </p>
//                                         {/* <p className="text-xs italic text-red-500">Please choose a password.</p> */}
//                                     </div>
//                                     <div className="md:ml-2">
//                                         <label className="block mb-2 text-start text-sm font-bold text-gray-700" htmlFor="confirmPassword">
//                                             Confirm Password
//                                         </label>
//                                         <input
//                                             className="w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
//                                             id="confirmPassword"
//                                             type="password"
//                                             placeholder="******************"
//                                         // name='confirmPassword'
//                                         // value={user.confirmPassword}
//                                         // onChange={handleChange}
//                                         />
//                                         <p className="text-xs italic text-red-500">
//                                             {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
//                                         </p>
//                                     </div>
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="roles" className="block mb-2 text-start text-sm font-bold text-gray-700">
//                                         Roles
//                                     </label>
//                                     <div className="relative">
//                                         <select
//                                             id="roles"
//                                             name="role"
//                                             value={user.role}
//                                             onChange={(e) => setUser({ ...user, role: e.target.value })}
//                                             className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${showRoles ? 'block' : 'hidden'}`}
//                                         >
//                                             <option value="Client">Client</option>
//                                             <option value="Livreur">Livreur</option>
//                                             <option value="Manager">Admin</option>
//                                         </select>
//                                         <div
//                                             className={`w-full px-3 py-2 text-center text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${showRoles ? 'hidden' : 'block'}`}
//                                             onClick={handleRolesClick}
//                                         >
//                                             {/* {user.role || 'Select a role'} */}
//                                             Select a role
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="mb-6 text-center">
//                                     <button
//                                         className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
//                                         type="submit"
//                                         disabled={!isFormValid()}
//                                     >
//                                         Register Account
//                                     </button>
//                                 </div>
//                                 <hr className="mb-6 border-t" />
//                                 <div className="text-center">
//                                     <a
//                                         className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
//                                         href="/forgot-password"
//                                     >
//                                         Forgot Password?
//                                     </a>
//                                 </div>
//                                 <div className="text-center">
//                                     Already have an account?
//                                     <a
//                                         className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
//                                         href="/login"
//                                     >
//                                         {/* Already have an account? Login! */}
//                                         Login!
//                                     </a>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         // </body>
//     )
// }

// export default RegisterPage

const RegisterPage = () => {
    const formRef = useRef(null);
    const [showRoles, setShowRoles] = useState(false);
    const [submit, setSubmit] = useState(false);

    // const [user, setUser] = useState({
    //     username: '',
    //     email: '',
    //     password: '',
    //     role: 'Client',
    //     // password_confirmation: '',
    // });
    // const [errors, setErrors] = useState({
    //     username: '',
    //     email: '',
    //     password: '',
    //     confirmPassword: '',
    // });

    const [user, setUser] = useState({ username: '', email: '', password: '' });
    const [errors, setErrors] = useState({});

    const handleRolesClick = () => {
        setShowRoles(true);
    };

    // const handleChange = (name, value, isValid) => {
    //     setUser((prevState) => ({
    //         ...prevState,
    //         [name]: value,
    //     }));
    //     setErrors((prevState) => ({
    //         ...prevState,
    //         [name]: isValid ? '' : `Invalid ${name}`,
    //     }));
    //     // console.log("name", name);
    //     // console.log("value", value);
    //     // console.log("isValid", isValid);
    //     // console.log("errors", errors);
    //     // console.log("user", user);
    // };

    const handleInputChange = (inputName, inputValue, inputIsValid) => {
        setUser({ ...user, [inputName]: inputValue });
        setErrors({ ...errors, [inputName]: !inputIsValid });
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     console.log("Object.values(errors).some(error => error)", Object.values(errors).some(error => error));
    //     console.log("errors", errors);
    //     if (!Object.values(errors).some(error => error)) {
    //         try {
    //             const response = await axios.post('/api/register', user);
    //             console.log(response.data);
    //             Swal.fire({
    //                 icon: 'success',
    //                 title: 'Registration successful',
    //                 text: 'You have successfully registered.',
    //             });
    //             // Redirect to login page or clear form here
    //         } catch (error) {
    //             console.error(error);
    //             Swal.fire({
    //                 icon: 'error',
    //                 title: 'Registration failed',
    //                 text: 'An error occurred during registration.',
    //             });
    //         }
    //     } else {
    //         Swal.fire({
    //             icon: 'error',
    //             title: 'Validation failed',
    //             text: 'Please correct the errors in the form.',
    //         });
    //     }
    // };

    useEffect(() => {
        const submitForm = async () => {
            if (!Object.values(errors).some(error => error)) {
                try {
                    const response = await axios.post('/api/register', user);
                    console.log(response.data);
                    Swal.fire({
                        icon: 'success',
                        title: 'Registration successful',
                        text: 'You have successfully registered.',
                    });
                    // Redirect to login page or clear form here
                } catch (error) {
                    console.error(error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Registration failed',
                        text: 'An error occurred during registration.',
                    });
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Validation failed',
                    text: 'Please correct the errors in the form.',
                });
            }
        };

        if (submit) {
            submitForm();
            setSubmit(false);
        }
    }, [submit, user, errors]);



    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     console.log('Registering...', user);
    //     try {
    //         const data = await makeApiRequest('auth/register', user, 'post');
    //         console.log(data);
    //         Swal.fire({
    //             icon: 'success',
    //             title: 'Success!',
    //             text: 'Your account has been created. Please check your email to verify your account.',
    //         }).then(() => {
    //             formRef.current.reset();
    //         });
    //     } catch (error) {
    //         console.error(error);
    //         Swal.fire({
    //             icon: 'error',
    //             title: 'Error!',
    //             text: 'There was an error creating your account.',
    //         });
    //     }
    // };

    // const isFormValid = () => {
    //     return Object.values(errors).every((error) => error === '') &&
    //         Object.values(user).every((value) => value !== '');
    // };

    return (
        <div className="bg-gray-200 font-family-karla h-screen">
            <div className="container mx-auto">
                <div className="flex justify-center items-center h-screen px-6">
                    <div className="w-full xl:w-3/5 lg:w-11/12 flex justify-end items-end">
                        <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg">
                            <h3 className="pt-4 text-2xl text-center">Create an Account!</h3>
                            <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded"  ref={formRef}>
                                <div className="mb-4 ">
                                    <div className="mb-4 md:mr-2 md:mb-0">
                                        <label className="block mb-2 text-start text-sm font-bold text-gray-700" htmlFor="firstName">
                                            Username
                                        </label>
                                        <InputValidator
                                            name="username"
                                            value={user.username}
                                            validationRules={[
                                                {
                                                    regex: /^[^\s]{3,}$/,
                                                    errorMessage: 'Username must be at least 3 characters long and must not contain spaces',
                                                },
                                            ]}
                                            // errorMessage={errors.username}
                                            // errorMessage={errors.username && 'Invalid username'}
                                            // onChange={handleChange}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2 text-start text-sm font-bold text-gray-700" htmlFor="email">
                                        Email
                                    </label>
                                    <InputValidator
                                        name="email"
                                        value={user.email}
                                        validationRules={[
                                            {
                                                regex: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                errorMessage: 'Email address is invalid',
                                            },
                                        ]}
                                        // errorMessage={errors.email}
                                        // errorMessage={errors.username && 'Invalid username'}
                                        // onChange={handleChange}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-4 md:flex md:justify-between">
                                    <div className="mb-4 md:mr-2 md:mb-0">
                                        <label className="block mb-2 text-start text-sm font-bold text-gray-700" htmlFor="password">
                                            Password
                                        </label>
                                        <InputValidator
                                            name="password"
                                            value={user.password}
                                            validationRules={[
                                                {
                                                    // regex: /^.{6,}$/,
                                                    regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
                                                    errorMessage: 'Password must be at least 8 characters long and contain at least one (a-z), (A-Z), (0-9), and one special character',
                                                },
                                            ]}
                                            // errorMessage={errors.password}
                                            // errorMessage={errors.username && 'Invalid username'}
                                            // onChange={handleChange}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="md:ml-2">
                                        <label className="block mb-2 text-start text-sm font-bold text-gray-700" htmlFor="confirmPassword">
                                            Confirm Password
                                        </label>
                                        <input
                                            className="w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="confirmPassword"
                                            type="password"
                                            placeholder="******************"
                                            name="confirmPassword"
                                            value={user.confirmPassword}
                                        // onChange={handleChange}
                                        />
                                        <p className="text-xs italic text-red-500">
                                            {/* {errors.confirmPassword && <span>{errors.confirmPassword}</span>} */}
                                        </p>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="roles" className="block mb-2 text-start text-sm font-bold text-gray-700">
                                        Roles
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="roles"
                                            name="role"
                                            value={user.role}
                                            onChange={(e) => setUser({ ...user, role: e.target.value })}
                                            className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${showRoles ? 'block' : 'hidden'}`}
                                        >
                                            <option value="Client">Client</option>
                                            <option value="Livreur">Livreur</option>
                                            <option value="Manager">Admin</option>
                                        </select>
                                        <div
                                            className={`w-full px-3 py-2 text-center text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${showRoles ? 'hidden' : 'block'}`}
                                            onClick={handleRolesClick}
                                        >
                                            Select a role
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-6 text-center">
                                    <button
                                        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                        type="submit"
                                        // disabled={!isFormValid()}
                                        onClick={() => setSubmit(true)}
                                    >
                                        Register Account
                                    </button>
                                </div>
                                <hr className="mb-6 border-t" />
                                <div className="text-center">
                                    <a className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800" href="/forgot-password">
                                        Forgot Password?
                                    </a>
                                </div>
                                <div className="text-center">
                                    Already have an account?
                                    <a className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800" href="/login">
                                        Login!
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
