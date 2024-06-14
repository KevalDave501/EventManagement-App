import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
// import UserDashBoard from '../dashboard/UserDashBoard';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/user/login', {
        u_email: username,
        u_password: password
      });
  
      const token = response.data.token;
      localStorage.setItem('token', token);
      redirectToDashboard();
    } catch (err) {
      setError('Invalid username or password');
    }
  };
  
  const redirectToDashboard = () => {
    window.location.href = '/dashboard';
  };

  const handleCreateAccount = () => {
    window.location.href = '/signup';
  };

  const handleForgotPassword = () => {
    // forgotpassword function chhe aa
  };

  return (
    <div className="login-container">
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="mb-4 text-center">Login</h2>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {error && <div className="text-danger mb-3">{error}</div>}
                <div className="d-grid">
                  <button onClick={handleLogin} className="btn btn-primary">Login</button>
                </div>
                <div className="text-center mt-3 d-flex justify-content-between">
                  <span className="forgot-password-link red-link" onClick={handleForgotPassword}>Forgot Password ?</span>
                  <span className="create-account-link" onClick={handleCreateAccount}>Create New Account</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;