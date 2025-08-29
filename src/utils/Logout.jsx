import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { FaSignOutAlt } from "react-icons/fa";

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
                className="hover:bg-red-700 bg-rose-800 p-2 rounded-full text-white text-lg cursor-pointer flex items-center justify-center"
                title="Logout"
            >
                <FaSignOutAlt />
            </button>
            <ToastContainer />
        </>
    );
}
