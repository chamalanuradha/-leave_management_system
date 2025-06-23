import { useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await api.post('/login', form);

    if (res.data.status === 'success') {
      const { user, token } = res.data.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      alert(res.data.message || "Login successful");

      if (user.role === 'ADMIN') {
        navigate('/admindashboard');
      } else if (user.role === 'USER') {
        navigate('/userdashboard');
      } else {
        setError("Invalid user role");
      }
    } else {
      setError(res.data.error || "Login failed");
    }

  } catch (err) {
    setError(err.response?.data?.error || "Login failed");
  }
};


  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md mt-10">
  <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Login</h2>
  
  {error && <p className="text-red-600 text-center mb-4">{error}</p>}
  
  <form onSubmit={handleSubmit} className="space-y-6">
    <input
      type="email"
      placeholder="Email"
      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      value={form.email}
      onChange={(e) => setForm({ ...form, email: e.target.value })}
    />
    
    <input
      type="password"
      placeholder="Password"
      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      value={form.password}
      onChange={(e) => setForm({ ...form, password: e.target.value })}
    />
    
    <button
      type="submit"
      className="w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-white font-semibold py-3 rounded-md shadow"
    >
      Login
    </button>
  </form>
</div>

  );
}
