import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import AdminDashboard from "./pages/admindashboard";
import LeaveForm from "./pages/leaveform";

function App() {
  const token = localStorage.getItem("token");
  const role = JSON.parse(localStorage.getItem("user"))?.role || "";

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register/>} />
     {/* Authenticated user dashboards */}
        <Route path="/userdashboard" element={token && role === "USER" ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/admindashboard" element={token && role === "ADMIN" ? <AdminDashboard /> : <Navigate to="/" />} />
        {/* Leave form accessible by logged-in users */}
        <Route path="/leaveform" element={token ? <LeaveForm /> : <Navigate to="/" />} />   
      </Routes>
    </BrowserRouter>
  );
}

export default App;
