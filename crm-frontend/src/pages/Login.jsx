import React, { useState } from "react";
import API from "../api/api";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ setRole }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await API.post("/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      setRole(res.data.role);

      if (res.data.role === "admin") navigate("/admin-dashboard");
      else navigate("/user-dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
        <div className="mb-3">
          <input type="email" className="form-control" placeholder="Email" name="email" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <input type="password" className="form-control" placeholder="Password" name="password" onChange={handleChange} required />
        </div>
        <button className="btn btn-primary w-100">Login</button>
      </form>
      <p className="mt-3 text-center">
        Don’t have an account? <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
};

export default Login;
