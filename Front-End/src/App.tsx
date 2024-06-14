import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import SignupForm from './components/signup/SignupForm';
import 'bootstrap/dist/css/bootstrap.min.css';
// import UserDashBoard from './components/dashboard/UserDashBoard';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupForm />} />
        {/* <Route path='/dashboard' element {<UserDashBoard />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
