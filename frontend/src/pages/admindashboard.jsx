import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import Navbar from "../components/navbar";

const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const fetchLeaves = async () => {
    try {
      const res = await api.get("/leaves");
      if (res.data.status === "success") {
        setLeaves(res.data.data);
      } else {
        setError("Failed to load leaves");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Error fetching leaves");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await api.put(`/leaves/${id}`, { status });
      if (res.data.status === "success") {
        // Refresh leaves list
        fetchLeaves();
      }
    } catch (err) {
      alert(err.response?.data?.error || "Status update failed");
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <div>
      <Navbar />
        <div className="p-6 max-w-6xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">
        Welcome, {user?.role} {user?.name || "Admin"}
      </h2>
    </div>
    </div>
  
  );
};

export default AdminDashboard;
