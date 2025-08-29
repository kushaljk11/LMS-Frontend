import { MdLocalLibrary } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.js";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import api from "../config/config.js";
import DarkVeil from "../component/animations/Darkveil.jsx";

function Login() {
  const navigate = useNavigate();
  const { Login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/login", { email, password });

      toast.success("Login successful", { position: "top-center" });

      const token = response.data.token;
      const user = response.data.user;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("name", user.name);
      }

      if (token && user) {
        Login({ user, token });

        if (user.role === "Librarian") {
          setTimeout(() => navigate("/dashboard"), 1000);
        } else if (user.role === "Borrower") {
          setTimeout(() => navigate("/borrower/dashboard"), 1000);
        } else {
          setTimeout(() => navigate("/dashboard"), 1000);
        }
      }
    } catch (error) {
      toast.error("Please enter a valid email or password", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div
        className="main flex justify-center items-center min-h-screen bg-slate-200 px-4"
        style={{ position: "relative", overflow: "hidden" }}
      >
        {/* Background Animation */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
          }}
        >
          <DarkVeil
            speed={0.5}
            squareSize={48}
            borderColor="#fff"
            hoverFillColor="rgb(37 99 235)"
          />
        </div>

        <ToastContainer />

        <div
          className="head w-full max-w-md sm:max-w-lg md:max-w-md lg:max-w-lg flex flex-col justify-center border border-gray-300 bg-white rounded-xl shadow-xl p-6 sm:p-8"
          style={{ position: "relative", zIndex: 1 }}
        >
          <div className="top header flex justify-center items-center flex-col mb-6 text-center">
            <MdLocalLibrary className="text-5xl sm:text-6xl mb-3 text-blue-600 hover:text-black cursor-pointer animate-colorCycle" />
            <h1 className="text-xl sm:text-2xl font-bold">
              Library Management
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Please Sign In to get access
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm sm:text-base font-medium">Email</label>
              <input
                className="border border-gray-300 p-2 rounded-lg w-full shadow-sm text-sm sm:text-base focus:ring-2 focus:ring-blue-500 outline-none"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm sm:text-base font-medium">
                Password
              </label>
              <input
                className="border border-gray-300 p-2 rounded-lg w-full shadow-sm text-sm sm:text-base focus:ring-2 focus:ring-blue-500 outline-none"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <p className="text-xs sm:text-sm text-gray-500 text-center">
              Forgot Password?{" "}
              <span className="text-red-700 cursor-pointer hover:underline">
                Click Here
              </span>
            </p>

            <div className="button flex justify-center items-center">
              <button
                className="px-4 py-2 sm:px-5 sm:py-2.5 bg-black text-white rounded-lg w-full hover:bg-blue-600 transition-colors text-sm sm:text-base"
                type="submit"
              >
                {loading ? "Loading..." : "Login"}
              </button>
            </div>

            <p className="text-xs sm:text-sm text-gray-500 text-center">
              Don&apos;t have an account?{" "}
              <span
                className="text-red-700 cursor-pointer hover:underline"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
