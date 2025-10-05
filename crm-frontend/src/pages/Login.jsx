// src/pages/Login.jsx
import React, { useState } from "react";
import API from "../api/api";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ setRole }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/login", form);
      console.log("Login response:", res.data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("name", res.data.name);

      // update role in App.jsx instantly
      setRole(res.data.role);

      // navigate properly
      if (res.data.role === "admin") {
        navigate("/admin-dashboard");
      } else if (res.data.role === "user") {
        navigate("/user-dashboard");
      } else {
        alert("Invalid role");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-2"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          type="password"
          required
        />
        <button className="btn btn-primary w-100">Login</button>
      </form>
      <p className="mt-3 text-center">
        Don’t have an account? <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
};

export default Login;
