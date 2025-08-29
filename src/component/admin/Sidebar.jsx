// Sidebar.jsx
import { MdSettings, MdDashboard } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { IoBookSharp } from "react-icons/io5";
import { BiBook } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="hidden md:fixed md:top-0 md:left-0 md:bottom-0 md:w-64 md:bg-[#4AB5BB] md:border-r md:shadow-md md:z-30 md:flex md:flex-col">
      <div className="p-4 md:p-6 flex-1 overflow-y-auto flex flex-col">
        {/* Logo */}
        <div className="mb-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <IoBookSharp className="w-7 h-7 text-[#4AB5BB]" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">LibraryMS</h1>
            <p className="text-xs text-white">Management System</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col gap-4">
          <div>
            <p className="text-white text-xs uppercase mb-2 px-1">Overview</p>
            <SidebarItem icon={<MdDashboard />} label="Dashboard" to="/dashboard" />
          </div>
          <div>
            <p className="text-white text-xs uppercase mb-2 px-1">Management</p>
            <SidebarItem icon={<IoBookSharp />} label="Books" to="/books" />
            <SidebarItem icon={<FaUserFriends />} label="Borrowers" to="/borrowers" />
          </div>
          <div>
            <p className="text-white text-xs uppercase mb-2 px-1">Operations</p>
            <SidebarItem icon={<BiBook />} label="Return Book" to="/borrow" />
          </div>
          <div>
            <p className="text-white text-xs uppercase mb-2 px-1">Settings</p>
            <SidebarItem icon={<MdSettings />} label="Settings" to="/settings" />
          </div>
        </nav>

        {/* Footer */}
        <div className="mt-auto pt-4 text-xs text-white text-center hidden md:block">
          &copy; 2025 LibraryMS
        </div>
      </div>
    </aside>
  );
}

const SidebarItem = ({ icon, label, to }) => {
  const location = useLocation();
  const active = location.pathname === to;

  const baseClass =
    "flex items-center gap-3 py-2 px-3 text-sm rounded-lg transition-colors";
  const activeClass = active
    ? "bg-white text-black font-semibold"
    : "text-white hover:bg-white/20";

  return (
    <Link to={to} className={`${baseClass} ${activeClass}`}>
      {/* Icon adopts text color automatically */}
      <span className="text-lg" style={{ color: active ? "black" : "white" }}>
        {icon}
      </span>
      <span>{label}</span>
    </Link>
  );
};
