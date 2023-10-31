// class InputValidator {
//     static validateEmail(email) {
//         const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
//         if (!email) {
//             return 'Email is required';
//         } else {
//             return emailRegex.test(email) ? '' : 'Invalid email address';
//         }
//     }

//     static validateUsername = (username) => {
//         const usernameRegex = /^[^\s]{3,}$/;
//         return usernameRegex.test(username) ? '' : 'Username must be at least 3 characters long and must not contain spaces';
//     };

//     static validatePassword = (password) => {
//         const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
//         if (!password) {
//             return 'Password is required';
//         } else if (password.length < 8) {
//             return 'Password must be at least 8 characters long';
//         } else {
//             return passwordRegex.test(password) ? '' : 'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character';
//             // "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
//         }
//     };

//     static validateConfirmPassword(password, confirmPassword) {
//         return password !== confirmPassword ? 'Passwords do not match' : '';
//     }

//     static validateField(name, value, user) {
//         switch (name) {
//             case 'username':
//                 return InputValidator.validateUsername(value);
//             case 'email':
//                 return InputValidator.validateEmail(value);
//             case 'password':
//                 return InputValidator.validatePassword(value);
//             case 'confirmPassword':
//                 return InputValidator.validateConfirmPassword(value, user.password);
//             default:
//                 return '';
//         }
//     }
// }

// import React, { useState } from 'react';

// const InputValidator = ({ name, value, validationRules, errorMessage, onChange }) => {
//     const [error, setError] = useState('');

//     const validateInput = (value) => {
//         for (const rule of validationRules) {
//             if (!rule.regex.test(value)) {
//                 setError(rule.errorMessage);
//                 return false;
//             }
//             console.log('rule.errorMessage', rule.errorMessage);
//             console.log('rule', rule);
//         }
//         setError('');
//         return true;
//     };

//     const handleChange = (e) => {
//         const { value } = e.target;
//         const isValid = validateInput(value);
//         if (onChange) {
//             onChange(name, value, isValid);
//         }
//         console.log("onchange", onChange);
//         console.log("e.target", e.target);
//         // console.log('errorMessage', validationRules[0].errorMessage);
//         console.log('errorMessage', errorMessage);
//         console.log('validationRules', validationRules);
//     };

//     return (
//         <>
//             <input
//                 className="w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
//                 name={name}
//                 value={value}
//                 onChange={handleChange}
//             />
//             <p className="text-xs italic text-red-500">
//                 {error && <span>{error}</span>}
//             </p>
//         </>
//     );
// };

// export default InputValidator;

import React, { useState, useEffect } from 'react';

const InputValidator = ({ name, value, validationRules, errorMessage, onChange }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isValid, setIsValid] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let valid = true;
        setError('');
        for (let rule of validationRules) {
            if (!rule.regex.test(value)) {
                setError(rule.errorMessage);
                valid = false;
                break;
            }
        }
        setIsValid(valid);
    }, [value, validationRules]);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const handleChange = (e) => {
        const { value } = e.target;
        onChange(name, value, isValid);
    };

    let borderColorClass = 'border-blue-500';
    if (isFocused && isValid) {
        borderColorClass = 'border-green-500';
    } else if (isFocused && !isValid) {
        borderColorClass = 'border-red-500';
    } else if (!isFocused && !isValid) {
        borderColorClass = 'border-red-500';
    }

    return (
        <div className="mb-4">
            <input
                name={name}
                value={value}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={`w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${borderColorClass}`}
            />
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
        </div>
    );
};

export default InputValidator;