import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import AdminDashboard from "./pages/admindashboard";

function App() {
  const token = localStorage.getItem("token");
  const role = JSON.parse(localStorage.getItem("user"))?.role || "";

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/userdashboard" element={token ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/admindashboard" element={token ? <AdminDashboard /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
