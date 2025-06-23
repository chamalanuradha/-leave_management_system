import React from "react";
import Navbar from "../components/navbar";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <Navbar/>
      <div className="p-6 max-w-9xl mx-auto mt-10">
        <h2 className="text-3xl font-bold mb-6">
          👋 Welcome, {user?.name || "Admin"}({user?.role} )
        </h2>
    </div>
    </div>

  );
};

export default Dashboard;
