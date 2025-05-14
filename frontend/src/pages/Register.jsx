import React, { useState } from 'react';
import axios from 'axios';
import '../style/Register.css'; // Make sure this path is correct

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'buyer', // default role
  });

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');

    try {
      const res = await axios.post('http://localhost:3000/api/register', formData);
      setMessage(res.data.message);
      setMessageType('success'); // Set message type for styling
    } catch (err) {
      if (err.response && err.response.data) {
        setMessage(err.response.data.message);
      } else {
        setMessage('Registration failed. Please try again.');
      }
      setMessageType('error'); // Set message type for styling
    }
  };

  return (
    // IMPORTANT: Ensure this className is present
    <div className="register-container">
      <h2>Register</h2>
      {/* Updated message display for better styling */}
      {message && (
        <p className={`message ${messageType === 'success' ? 'success-message' : 'error-message'}`}>
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;