import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import LeaveStatusChart from "../components/leavestatuschart";
import LeaveTypePerUserChart from "../components/typebyempchart";

const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <Navbar />
      <div className="p-6 max-w-9xl mx-auto mt-10">
        <h2 className="text-3xl font-bold mb-6">
          👋 Welcome, {user?.name || "Admin"}({user?.role} )
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-3">
          {/* Chart for Approved vs Rejected */}
          <div className="bg-white shadow-md p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Leave Status Summary</h3>
            <LeaveStatusChart />
          </div>

          {/* Chart for Leave Types per Employee */}
          <div className="bg-white shadow-md p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Leave Types by Employee</h3>
            <LeaveTypePerUserChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
