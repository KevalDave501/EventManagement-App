import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import SignupForm from './components/signup/SignupForm';
import ForgotPassword from './components/forgotPassword/ForgotPassword';
import ResetPassword from './components/forgotPassword/ResetPassword';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminDashBoard from './components/dashboard/AdminDashBoard';
import UserDashBoard from './components/dashboard/UserDashBoard';
import Home from './components/homepage/Home';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path='/userDashboard' element={<UserDashBoard />} />
        <Route path='/adminDashboard' element={<AdminDashBoard />} />
      </Routes>
    </Router>
  );
}

export default App;
