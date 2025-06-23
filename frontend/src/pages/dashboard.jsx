import React from "react";
import Navbar from "../components/navbar";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <Navbar/>
    <div className="p-6 max-w-4xl mx-auto mt-10">
      
      <h2 className="text-2xl font-bold mb-4 text-center">
        Welcome, {user?.role} {user?.name || "User"}
      </h2>
    </div>
    </div>

  );
};

export default Dashboard;
