import React, { useState } from 'react';
import axios from 'axios';

const ResetPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const token = new URLSearchParams(window.location.search).get('token');

  const handleResetPassword = async () => {
    try {
      if (newPassword !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      const response = await axios.post('http://localhost:8000/api/user/resetPassword', {
        token,
        newPassword
      });

      setSuccessMessage(response.data.message);
    } catch (err) {
      setError('Failed to reset password. Please try again.');
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Your Password</h2>
      <div className="form-group">
        <label>New Password:</label>
        <input
          type="password"
          className="form-control"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Confirm Password:</label>
        <input
          type="password"
          className="form-control"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      {error && <div className="text-danger">{error}</div>}
      {successMessage && <div className="text-success">{successMessage}</div>}
      <button className="btn btn-primary" onClick={handleResetPassword}>
        Reset Password
      </button>
    </div>
  );
};

export default ResetPassword;
