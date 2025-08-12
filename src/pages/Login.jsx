import { MdLocalLibrary } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.js";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import api from "../config/config.js";
import DarkVeil from "../component/animations/Darkveil.jsx";
// import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const { Login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    console.log("Email:", email);
    console.log("Password:", password);
    try {
      // const response = await axios.post('http://localhost:4000/api/login', {
      const response = await api.post("/login", {
        email,
        password,
      });

      toast.success("Login successful", {
        position: "top-center",
      });

      const token = response.data.token;
      const user = response.data.user;
      if (token) {
        localStorage.setItem("token", token);
      }

      console.log("Token: ", response.data.token);
      console.log("User: ", response.data.user);
      if (token && user) {
        Login({ user, token });
        setTimeout(() => navigate("/dashboard"), 1000);
      }
    } catch (error) {
      toast.error("Please enter a valid email or password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div
        className="main flex justify-center items-center h-screen bg-slate-200"
        style={{ position: "relative", overflow: "hidden" }}
      >
        {/* DarkVeil as background */}
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
          <DarkVeil speed={0.5} squareSize={48}  borderColor='#fff' hoverFillColor='rgb(37 99 235)'  />
        </div>
        <ToastContainer />
        <div
          className="head w-[450px] h-[450px] flex flex-col justify-center content-center border-2 border-gray-300 bg-white rounded-xl shadow-xl"
          style={{ position: "relative", zIndex: 1 }}
        >
          <div className="top header flex justify-center items-center flex-col">
            <MdLocalLibrary className="text-6xl mb-2 text-blue-600 hover:text-black cursor-pointer animate-colorCycle" />
            <h1 className="text-2xl font-bold">Library Management</h1>
            <p>Please Sign In to get access</p>
          </div>
          <form className="ml-5 mr-5 mt-5" onSubmit={handleSubmit}>
            <h1 className="text-lg font-medium">Email</h1>
            <input
              className="border-2 border-gray-200 p-1 mb-2 rounded-lg w-full shadow-sm"
              type="text"
              placeholder=" admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <h1 className="text-lg font-medium">Password</h1>
            <input
              className="border-2 border-gray-200 p-1 mb-2 rounded-lg w-full shadow-sm"
              type="password"
              placeholder=" ********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-sm text-gray-500 text-center">
              Forgot Password?{" "}
              <span className="text-red-700 cursor-pointer hover:underline">
                Click Here
              </span>
            </p>
            <div className="button flex justify-center items-center mt-4 ">
              <button
                className="px-4 py-2 bg-black text-white rounded-lg w-full hover:bg-blue-600"
                type="submit"
              >
                {loading ? "Loading..." : "Login"}
              </button>
            </div>
            <p className="text-sm text-gray-500 text-center mt-2">
              Don't have an account?{" "}
              <span className="text-red-700 cursor-pointer hover:underline">
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
