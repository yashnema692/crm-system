import React, { useEffect, useState } from 'react';
import API from '../api/api';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await API.get('/users', { headers: { Authorization: `Bearer ${token}` } });
      setUsers(res.data);
    } catch (error) {
      alert('Error fetching users');
    }
  };

  const handleDelete = async id => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      const token = localStorage.getItem('token');
      await API.delete(`/users/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchUsers();
    } catch (error) {
      alert('Error deleting user');
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Admin Dashboard</h2>
      <div className="row">
        {users.map(user => (
          <div key={user._id} className="col-12 col-md-6 col-lg-4 mb-3">
            <div className="card shadow-sm p-3">
              <h5>{user.name}</h5>
              <p>Email: {user.email}</p>
              <p>Role: {user.role}</p>
              <p>Created At: {new Date(user.createdAt).toLocaleString()}</p>
              <p>Updated At: {new Date(user.updatedAt).toLocaleString()}</p>
              <button className="btn btn-danger btn-sm mt-2" onClick={() => handleDelete(user._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
