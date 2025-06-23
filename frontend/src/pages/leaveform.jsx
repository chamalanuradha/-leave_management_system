import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";

export default function LeaveForm() {
  const [form, setForm] = useState({
    leave_date: "",
    leave_type: "",
    reason: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!form.leave_date) newErrors.leave_date = "Leave date is required.";
    if (!form.leave_type) newErrors.leave_type = "Leave type is required.";
    if (!form.reason.trim()) newErrors.reason = "Reason is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    setMessage("");
    setErrors({});

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:8000/api/leaves", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.status === "success") {
        setMessage("✅ Leave request submitted successfully! Redirecting...");
        setForm({ leave_date: "", leave_type: "", reason: "" });
        setErrors({});

        setTimeout(() => {
          navigate("/leave");
        }, 1500);
      } else {
        setMessage(data.error || data.message || "❌ Submission failed.");
      }
    } catch (err) {
      setMessage("❌ Error submitting leave request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-4">
        <h2 className="text-2xl font-bold text-center text-gray-700">Request Leave</h2>

        {message && (
          <p
            className={`text-center text-sm mt-4 ${
              message.includes("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="date"
              name="leave_date"
              value={form.leave_date}
              onChange={(e) => setForm({ ...form, leave_date: e.target.value })}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring ${
                errors.leave_date
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-blue-300"
              }`}
            />
            {errors.leave_date && (
              <p className="text-red-500 text-sm mt-1">{errors.leave_date}</p>
            )}
          </div>

          <div>
            <select
              name="leave_type"
              value={form.leave_type}
              onChange={(e) => setForm({ ...form, leave_type: e.target.value })}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring ${
                errors.leave_type
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-blue-300"
              }`}
            >
              <option value="">Select Leave Type</option>
              <option value="CASUAL">Casual</option>
              <option value="SICK">Sick</option>
              <option value="EMERGENCY">Emergency</option>
            </select>
            {errors.leave_type && (
              <p className="text-red-500 text-sm mt-1">{errors.leave_type}</p>
            )}
          </div>

          <div>
            <textarea
              name="reason"
              placeholder="Reason"
              value={form.reason}
              onChange={(e) => setForm({ ...form, reason: e.target.value })}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring ${
                errors.reason
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-blue-300"
              }`}
              rows={4}
            />
            {errors.reason && (
              <p className="text-red-500 text-sm mt-1">{errors.reason}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
