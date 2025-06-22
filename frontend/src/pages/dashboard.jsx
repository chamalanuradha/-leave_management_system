import React from "react";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div>
   <h2>Welcome,{user?.role} {user?.name || "User"}</h2>

   
      {/* <p>Email: {user?.email}</p>
      <button onClick={handleLogout}>Logout</button> */}
    </div>
  );
};

export default Dashboard;
