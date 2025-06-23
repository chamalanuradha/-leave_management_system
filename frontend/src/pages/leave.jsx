import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api"; 
import Navbar from "../components/navbar";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState("");



  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const res = await api.get("/my-leaves"); // Axios call
        if (res.data.status === "success") {
          setLeaves(res.data.data);
        } else {
          setError("Failed to load leaves");
        }
      } catch (err) {
        setError(err.response?.data?.error || "Error fetching leaves");
      }
    };

    fetchLeaves();
  }, []);

  return (
    <div>
      <Navbar/>
    <div className="p-6 max-w-4xl mx-auto mt-10">
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 text-center">Your Leave History</h3>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Type</th>
                <th className="px-4 py-2 border">Reason</th>
                <th className="px-4 py-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {leaves.length > 0 ? (
                leaves.map((leave, index) => (
                  <tr key={index} className="text-center">
                    <td className="px-4 py-2 border">{leave.leave_date}</td>
                    <td className="px-4 py-2 border">{leave.leave_type}</td>
                    <td className="px-4 py-2 border">{leave.reason || "N/A"}</td>
                    <td className={`px-4 py-2 border font-semibold ${
                        leave.status === "APPROVED"
                          ? "text-green-600"
                          : leave.status === "REJECTED"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}>
                      {leave.status}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No leave records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>

  );
};

export default Dashboard;
