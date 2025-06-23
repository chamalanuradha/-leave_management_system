import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

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
    <div className="p-6 max-w-6xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">
        Welcome, {user?.role} {user?.name || "Admin"}
      </h2>
      <p className="mb-4">Email: {user?.email}</p>

      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md mb-6"
      >
        Logout
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">User</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Type</th>
              <th className="px-4 py-2 border">Reason</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Approve</th>
              <th className="px-4 py-2 border">Reject</th>
            </tr>
          </thead>
          <tbody>
            {leaves.length > 0 ? (
              leaves.map((leave) => (
                <tr key={leave.id} className="text-center">
                  <td className="px-4 py-2 border">{leave.user?.name || "N/A"}</td>
                  <td className="px-4 py-2 border">{leave.leave_date}</td>
                  <td className="px-4 py-2 border">{leave.leave_type}</td>
                  <td className="px-4 py-2 border">{leave.reason || "N/A"}</td>
                  <td
                    className={`px-4 py-2 border font-semibold ${
                      leave.status === "APPROVED"
                        ? "text-green-600"
                        : leave.status === "REJECTED"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {leave.status}
                  </td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => updateStatus(leave.id, "APPROVED")}
                      disabled={leave.status === "APPROVED"}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded disabled:opacity-50"
                    >
                      Approve
                    </button>
                  </td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => updateStatus(leave.id, "REJECTED")}
                      disabled={leave.status === "REJECTED"}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded disabled:opacity-50"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No leave records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
