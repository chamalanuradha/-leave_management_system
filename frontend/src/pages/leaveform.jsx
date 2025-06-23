import { useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function LeaveForm() {
  const [form, setForm] = useState({
    leave_date: "",
    leave_type: "",
    reason: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const res = await api.post("/leaves", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.status === "success") {
        setMessage("Leave request submitted successfully.");
        setError("");
        // Optional: navigate or reset form
        setForm({ leave_date: "", leave_type: "", reason: "" });
        navigate("/userdashboard");
      } else {
        setError(res.data.error || "Submission failed.");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Error submitting leave request.");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Request Leave</h2>

      {message && <p className="text-green-600 text-center mb-4">{message}</p>}
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="date"
          className="w-full p-3 border border-gray-300 rounded-md"
          value={form.leave_date}
          onChange={(e) => setForm({ ...form, leave_date: e.target.value })}
          required
        />

        <select
          className="w-full p-3 border border-gray-300 rounded-md"
          value={form.leave_type}
          onChange={(e) => setForm({ ...form, leave_type: e.target.value })}
          required
        >
          <option value="">Select Leave Type</option>
          <option value="CASUAL">Casual</option>
          <option value="SICK">Sick</option>
          <option value="EMERGENCY">Emergency</option>
        </select>

        <textarea
          placeholder="Reason (optional)"
          className="w-full p-3 border border-gray-300 rounded-md"
          value={form.reason}
          onChange={(e) => setForm({ ...form, reason: e.target.value })}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
