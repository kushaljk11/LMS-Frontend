import { useState } from "react";
import { MdLocalLibrary } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { IoBookOutline } from "react-icons/io5";
import { BiBookReader } from "react-icons/bi";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { MdHistory } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import LogoutButton from "../../utils/Logout";

export default function BorrowerTopbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full fixed top-0 left-0 bg-gray-100 shadow-md border-b z-30">
      <div className="w-full h-20 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 pl-5 flex-shrink-0">
          <div className="bg-green-600 p-3 rounded-xl text-white">
            <MdLocalLibrary className="text-xl" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-base font-bold text-gray-900">LibraryMS</h1>
            <p className="text-xs text-gray-500">Borrower Portal</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-4 flex-1 justify-center">
          <TopbarItem icon={<RxDashboard />} label="Dashboard" to="/borrower/dashboard" />
          <TopbarItem icon={<IoBookOutline />} label="Browse Books" to="/borrower/browse-books" />
          <TopbarItem icon={<BiBookReader />} label="My Loans" to="/borrower/loaned-books" />
          <TopbarItem icon={<MdHistory />} label="History" to="/borrower/history" />
          <TopbarItem icon={<FaUserCircle />} label="Profile" to="/borrower/settings" />
        </nav>

        {/* Hamburger  */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="hidden md:block pr-6">
            <LogoutButton className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer inline-flex items-center gap-2" />
          </div>

          <button
            className="md:hidden text-gray-700 text-2xl focus:outline-none p-2 hover:bg-gray-200 rounded-md transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-gray-100 border-t border-gray-200">
          <nav className="flex flex-col gap-3 p-3">
            <TopbarItem icon={<RxDashboard />} label="Dashboard" to="/borrower/dashboard" mobile />
            <TopbarItem icon={<IoBookOutline />} label="Browse Books" to="/borrower/browse-books" mobile />
            <TopbarItem icon={<BiBookReader />} label="My Loans" to="/borrower/loaned-books" mobile />
            <TopbarItem icon={<MdHistory />} label="History" to="/borrower/history" mobile />
            <TopbarItem icon={<FaUserCircle />} label="Profile" to="/borrower/settings" mobile />
            <div className="mt-3">
              <LogoutButton className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer flex items-center justify-center gap-2" />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

const TopbarItem = ({ icon, label, to, mobile = false }) => {
  const location = useLocation();
  const active = location.pathname === to;

  const baseClass = mobile
    ? "flex items-center gap-2 text-sm px-3 py-3 rounded-md hover:bg-gray-200 transition-colors w-full"
    : "flex items-center gap-2 text-sm px-3 py-2 rounded-md hover:bg-gray-200 transition-colors";
  
  const activeClass = active 
    ? "bg-gray-200 text-green-600 font-semibold" 
    : "text-gray-700";

  return (
    <Link to={to} className={`${baseClass} ${activeClass}`}>
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </Link>
  );
};
