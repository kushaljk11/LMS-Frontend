import {
  MdSettings,
} from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { IoBookOutline } from "react-icons/io5";
import { BiBook } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen shadow-md border-r p-4 bg-gray-100 text-black">

      <nav className="flex flex-col gap-6">
  
        <div>
          <p className="text-gray-500 text-xs uppercase mb-2 px-1">Overview</p>
          <SidebarItems icon={<RxDashboard />} label="Dashboard" to="/dashboard" />
        </div>

        
        <div>
          <p className="text-gray-500 text-xs uppercase mb-2 px-1">Management</p>
          <SidebarItems icon={<IoBookOutline />} label="Books" to="/books" />
          <SidebarItems icon={<FaUserFriends />} label="Members" to="/members" />
        </div>

       
        <div>
          <p className="text-gray-500 text-xs uppercase mb-2 px-1">Operations</p>
          {/* <SidebarItems icon={<BiBookAdd />} label="Issue Book" to="/issue-book" /> */}
          <SidebarItems icon={<BiBook />} label="Return Book" to="/borrow" />
          {/* <SidebarItems
            icon={<MdOutlineSystemSecurityUpdate />}
            label="View Issued Books"
            to="/issued-books"
          /> */}
        </div>

        {/* Settings */}
        <div>
          <p className="text-gray-500 text-xs uppercase mb-2 px-1">Settings</p>
          <SidebarItems icon={<MdSettings />} label="Settings" to="/settings" />
        </div>
      </nav>
    </div>
  );
}

const SidebarItems = ({ icon, label, to }) => {
  const location = useLocation();
  const active = location.pathname === to;

  const baseClass =
    "flex items-center gap-2 py-2 px-3 text-sm rounded-lg hover:bg-gray-200 transition-colors";
  const activeClass = active
    ? "bg-gray-200 text-primary font-semibold"
    : "text-gray-700";

  return (
    <Link to={to} className={`${baseClass} ${activeClass}`}>
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </Link>
  );
};
