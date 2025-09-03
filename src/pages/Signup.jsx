import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Borrower",
    address: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("https://lms-ozcq.onrender.com/api/auth/register", formData);
      toast.success("User registered successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000); // redirect after 2s
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Card */}
      <div
        className="w-full max-w-sm sm:max-w-md flex flex-col justify-center
        border border-gray-300 bg-white rounded-xl shadow-lg 
        p-4 sm:p-6 md:p-6 overflow-y-auto"
        style={{ maxHeight: "90vh" }}
      >
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>

        {/* Form */}
        <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <select
            name="role"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="Borrower">Borrower</option>
            <option value="Librarian">Librarian</option>
          </select>

          <input
            type="text"
            name="address"
            placeholder="Address"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            value={formData.address}
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            value={formData.phone}
            onChange={handleChange}
          />

          <button
            className="px-3 py-2 sm:px-4 sm:py-2.5 bg-black text-white rounded-lg w-full hover:bg-blue-600 transition-colors text-sm sm:text-base"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        {/* Login link */}
        <p className="text-xs sm:text-sm text-gray-500 text-center mt-4">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Signup;
