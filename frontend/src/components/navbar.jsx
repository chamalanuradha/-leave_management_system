import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/");
  };

  const dashboardLink = role === "ADMIN" ? "/admindashboard" : "/userdashboard";
  const approvalLink = role === "ADMIN" ? "/adminleave" : "/leave";

  return (
    <nav className="bg-blue-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 text-xl font-bold">
            LeaveMgmt
          </div>
          <div className="hidden md:flex space-x-6 items-center">
            <Link to={dashboardLink} className="hover:text-blue-300">Dashboard</Link>

            {role === "USER" && (
              <Link to="/leaveform" className="hover:text-blue-300">Leave Requests</Link>
            )}

            <Link to={approvalLink} className="hover:text-blue-300">Approvals</Link>

            <button onClick={handleLogout} className="hover:text-blue-300">Logout</button>
          </div>
         
        </div>
      </div>
    </nav>
  );
}
