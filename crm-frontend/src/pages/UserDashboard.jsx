import React from 'react';

const UserDashboard = () => {
  const name = localStorage.getItem('name');

  return (
    <div className="container mt-5">
      <h2>Welcome, {name}</h2>
      <p>This is the User Dashboard</p>
    </div>
  );
};

export default UserDashboard;
