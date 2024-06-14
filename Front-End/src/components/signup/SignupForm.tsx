import React, { useState } from 'react';
import axios from 'axios';
import './SignupForm.css';

const SignupForm: React.FC = () => {
  const [uName, setUName] = useState('');
  const [uEmail, setUEmail] = useState('');
  const [uPassword, setUPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
    try {
      await axios.post('http://localhost:8000/api/user/createUser', {
        u_name: uName,
        u_email: uEmail,
        u_password: uPassword
      });
      
      window.location.href = '/login';
    } catch (err) {
      setError('Failed to create new account');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2 className="signup-form-heading">Create New Account</h2>
        <div className="signup-form-inputs">
          <input
            type="text"
            placeholder="Name"
            value={uName}
            onChange={(e) => setUName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={uEmail}
            onChange={(e) => setUEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={uPassword}
            onChange={(e) => setUPassword(e.target.value)}
          />
        </div>
        {error && <div className="signup-form-error">{error}</div>}
        <button onClick={handleSignup} className="signup-form-button">Sign Up</button>
      </div>
    </div>
  );
};

export default SignupForm;
