import React, { useEffect, useState } from "react";
import API from "../api/api";

const UserDashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/me", { headers: { Authorization: `Bearer ${token}` } });
        setUser(res.data);
      } catch (error) {
        console.error(error);
        alert("Failed to fetch user data");
      }
    };
    fetchUser();
  }, []);

  if (!user) return <p className="text-center mt-5">Loading user data...</p>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Welcome, {user.name}</h2>
      <div className="card p-3 shadow-sm">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Created At:</strong> {new Date(user.createdAt).toLocaleString()}</p>
        <p><strong>Updated At:</strong> {new Date(user.updatedAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default UserDashboard;
