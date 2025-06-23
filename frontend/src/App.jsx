import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import AdminDashboard from "./pages/admindashboard";
import LeaveForm from "./pages/leaveform";
import LeaveUser from "./pages/leave";
import AdminLeave from "./pages/adminleave";

// Protected Route wrapper
function PrivateRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const storedRole = localStorage.getItem("role");

  if (!token || storedRole !== role) {
    return <Navigate to="/" />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/userdashboard"
          element={
            <PrivateRoute role="USER">
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/admindashboard"
          element={
            <PrivateRoute role="ADMIN">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/leave"
          element={
            <PrivateRoute role="USER">
              <LeaveUser />
            </PrivateRoute>
          }
        />

          <Route
          path="/adminleave"
          element={
            <PrivateRoute role="ADMIN">
              <AdminLeave />
            </PrivateRoute>
          }
        />

        <Route
          path="/leaveform"
          element={
            localStorage.getItem("token") ? (
              <LeaveForm />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
