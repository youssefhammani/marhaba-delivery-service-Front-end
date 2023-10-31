// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ConfirmEmail from './utils/ConfirmEmail';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import Home from './containers/Home';
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/confirm-email/:token' element={<ConfirmEmail />} />
        <Route path='/forgot-password' element={<ForgotPasswordPage />} />
        {/* <Route path='/reset-password' element={<ResetPasswordPage />} /> */}
        <Route path='/reset-password/:token' element={<ResetPasswordPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
