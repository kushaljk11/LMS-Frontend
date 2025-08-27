import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
// import { useAuth } from '../context/AuthContext.js';

export default function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("🔒 You've been securely logged out", { 
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light"
        });
        setTimeout(() => {
            navigate("/login");
        }, 1200);
    };

    return (
        <>
            <button
                onClick={handleLogout}
                className="hover:bg-rose-800 text-white bg-green-600 px-4 py-2 rounded-md text-sm cursor-pointer"
            >
                Logout
            </button>
            <ToastContainer />
        </>
    );
}