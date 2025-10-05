import React from 'react';

const UserCard = ({ user }) => (
  <div className="card mb-2">
    <div className="card-body">
      <h5 className="card-title">{user.name}</h5>
      <p className="card-text">{user.email}</p>
      <p className="card-text"><strong>Role:</strong> {user.role}</p>
    </div>
  </div>
);

export default UserCard;
