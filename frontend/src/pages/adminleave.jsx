import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import Navbar from "../components/navbar";
import Loader from "../components/loader"; // import Loader here

const AdminDashboard = () => {
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // add loading state

  const fetchLeaves = async () => {
    setLoading(true);  // start loading
    try {
      const res = await api.get("/leaves");
      if (res.data.status === "success") {
        setLeaves(res.data.data);
        setError("");
      } else {
        setError("Failed to load leaves");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Error fetching leaves");
    } finally {
      setLoading(false); // stop loading
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await api.put(`/leaves/${id}`, { status });
      if (res.data.status === "success") {
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
      <div className="p-6 mx-auto mt-10 max-w-6xl">
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-center">Leave History</h3>

          {loading && <Loader />}  {/* Show loader when loading */}

          {error && !loading && (
            <p className="text-red-500 text-center">{error}</p>
          )}

          {!loading && !error && (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 border">User</th>
                    <th className="px-4 py-2 border">Date</th>
                    <th className="px-4 py-2 border">Type</th>
                    <th className="px-4 py-2 border">Reason</th>
                    <th className="px-4 py-2 border">Status</th>
                    <th className="px-4 py-2 border">Action</th>
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
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded disabled:opacity-50 mr-2"
                          >
                            Approve
                          </button>
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
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
