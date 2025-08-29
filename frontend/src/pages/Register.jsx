import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/Register.css';
import api from '../api.js'; // Centralized API instance

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    userType: 'user', // Default user type
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setMessageType('');

    try {
      const res = await api.post('/register', formData);

      setMessage(res.data.message || 'Registration successful!');
      setMessageType('success');

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || 'Registration failed. Please try again.';
      setMessage(errorMsg);
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      {/* Background Elements */}
      <div className="register-background">
        <div className="bg-circle bg-circle-1"></div>
        <div className="bg-circle bg-circle-2"></div>
        <div className="bg-circle bg-circle-3"></div>
      </div>

      {/* Main Register Container */}
      <div className="register-container">
        <div className="register-header">
          <h1 className="register-title">Join MicroStartupX</h1>
          <p className="register-subtitle">
            Create your account to start investing in the future
          </p>
        </div>

        {/* Success/Error Message */}
        {message && (
          <div className={`register-message ${messageType}`}>
            {messageType === 'success' ? '✅' : '⚠️'} {message}
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="name">FULL NAME</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">EMAIL ADDRESS</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">PASSWORD</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a strong password"
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="userType">ACCOUNT TYPE</label>
            <select
              id="userType"
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              required
              className="form-select"
            >
              <option value="user">Investor</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" className="register-button" disabled={loading}>
            {loading ? (
              <div className="loading-spinner">
                <div className="spinner"></div>
                <span>Creating Account...</span>
              </div>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="register-footer">
          <p className="login-prompt">
            Already have an account?{' '}
            <Link to="/login" className="login-link">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
