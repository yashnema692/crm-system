import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const name = localStorage.getItem('name');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <span className="navbar-brand">CRM System</span>
      <div className="text-light">
        {name && <span className="me-3">Hello, {name}</span>}
        {role && <button onClick={handleLogout} className="btn btn-sm btn-outline-light">Logout</button>}
      </div>
    </nav>
  );
};

export default Navbar;
