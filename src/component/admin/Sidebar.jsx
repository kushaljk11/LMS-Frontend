// Sidebar.jsx
import { MdSettings } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { IoBookOutline } from "react-icons/io5";
import { BiBook } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  return (
    // Sidebar remains visible on md+; hidden on small screens to avoid cramped layout
    <aside className="hidden md:fixed md:top-0 md:left-0 md:bottom-0 md:w-64 md:bg-gray-100 md:border-r md:shadow-md md:z-30 md:flex md:flex-col">
      <div className="p-4 md:p-6 flex-1 overflow-y-auto flex flex-col">
        {/* Logo */}
        <div className="mb-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <IoBookOutline className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">LibraryMS</h1>
            <p className="text-xs text-gray-500">Management System</p>
          </div>
        </div>

        {/* Navigation */}
  <nav className="flex-1 flex flex-col gap-4">
          <div>
            <p className="text-gray-500 text-xs uppercase mb-2 px-1">Overview</p>
            <SidebarItem icon={<RxDashboard />} label="Dashboard" to="/dashboard" />
          </div>
          <div>
            <p className="text-gray-500 text-xs uppercase mb-2 px-1">Management</p>
            <SidebarItem icon={<IoBookOutline />} label="Books" to="/books" />
            <SidebarItem icon={<FaUserFriends />} label="Borrowers" to="/borrowers" />
          </div>
          <div>
            <p className="text-gray-500 text-xs uppercase mb-2 px-1">Operations</p>
            <SidebarItem icon={<BiBook />} label="Return Book" to="/borrow" />
          </div>
          <div>
            <p className="text-gray-500 text-xs uppercase mb-2 px-1">Settings</p>
            <SidebarItem icon={<MdSettings />} label="Settings" to="/settings" />
          </div>
        </nav>

        <div className="mt-auto pt-4 text-xs text-gray-400 text-center hidden md:block">
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
    "flex items-center gap-3 py-2 px-3 text-sm rounded-lg hover:bg-gray-200 transition-colors";
  const activeClass = active ? "bg-gray-200 text-blue-600 font-semibold" : "text-gray-700";

  return (
    <Link to={to} className={`${baseClass} ${activeClass}`}>
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </Link>
  );
};
