import React, { useState } from 'react';
import API from '../api/api';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/signup', form);
      alert('Signup successful');
      navigate('/login');
    } catch (error) {
      alert(error.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4">Signup</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" placeholder="Name" name="name" onChange={handleChange} required />
        <input className="form-control mb-2" placeholder="Email" name="email" type="email" onChange={handleChange} required />
        <input className="form-control mb-2" placeholder="Password" name="password" type="password" onChange={handleChange} required />
        <select className="form-control mb-2" name="role" onChange={handleChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button className="btn btn-primary w-100">Signup</button>
      </form>
      <p className="mt-3 text-center">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
