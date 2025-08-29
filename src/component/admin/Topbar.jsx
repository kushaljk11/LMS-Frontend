import { MdLocalLibrary } from "react-icons/md";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import LogoutButton from "../../utils/Logout";
import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { IoBookOutline } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { BiBook } from "react-icons/bi";
import { MdSettings } from "react-icons/md";

export default function Topbar() {
  const basecss = "cursor-pointer text-2xl text-blue-500";
  const [open, setOpen] = useState(false);

  let userName = "User";
  try {
    const raw = localStorage.getItem("user");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && (parsed.name || parsed.username || parsed.fullname)) {
        userName = parsed.name || parsed.fullname || parsed.username;
      }
    }
  } catch (e) {
  }

  const isDashboard = true;

  return (
    <>
      
      <div className="w-full">
        
        <div className="w-full flex justify-between items-center px-4 sm:px-6 py-2 bg-transparent">
          <div className="flex items-center space-x-3">
            <button
              className="md:hidden p-2 rounded hover:bg-gray-100"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
            >
              <FaBars className="text-lg text-gray-700" />
            </button>

            
            <div className="flex items-center gap-3 bg-white shadow-lg rounded-lg px-3 py-1">
              <div className="bg-[#4AB5BB] p-2 rounded text-white">
                <MdLocalLibrary className="text-lg" />
              </div>
              <div className="hidden sm:block">
                <p className="font-semibold leading-none">Jk Library</p>
                <p className="text-gray-500 text-sm leading-none">Management System</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {!isDashboard && <LogoutButton className={basecss} />}
          </div>
        </div>

        
        <div className="px-4 sm:px-6 md:ml-64">
          <div className="bg-[#4AB5BB] text-white rounded-full flex items-center justify-between px-4 py-2 shadow-md md:-translate-y-8">
              <div className="flex items-center gap-3">
                <div className="text-3sm font-medium">Welcome {userName},</div>
              </div>

            <div className="flex items-center gap-3">
              <div className=" px-3 py-1">
                <LogoutButton className="text-red-700 font-semibold text-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
            aria-hidden
          />

          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-lg p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-[#4AB5BB] p-3 rounded text-white">
                  <MdLocalLibrary className="text-lg" />
                </div>
                <div>
                  <div className="font-semibold">LibraryMS</div>
                  <div className="text-xs text-gray-500">Management</div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-gray-600">✕</button>
            </div>

            <nav className="flex flex-col gap-2">
              <Link to="/dashboard" onClick={() => setOpen(false)} className="flex items-center gap-3 p-2 rounded hover:bg-gray-100">
                <RxDashboard /> <span>Dashboard</span>
              </Link>
              <Link to="/books" onClick={() => setOpen(false)} className="flex items-center gap-3 p-2 rounded hover:bg-gray-100">
                <IoBookOutline /> <span>Books</span>
              </Link>
              <Link to="/borrowers" onClick={() => setOpen(false)} className="flex items-center gap-3 p-2 rounded hover:bg-gray-100">
                <FaUserFriends /> <span>Borrowers</span>
              </Link>
              <Link to="/borrow" onClick={() => setOpen(false)} className="flex items-center gap-3 p-2 rounded hover:bg-gray-100">
                <BiBook /> <span>Return Book</span>
              </Link>
              <Link to="/settings" onClick={() => setOpen(false)} className="flex items-center gap-3 p-2 rounded hover:bg-gray-100">
                <MdSettings /> <span>Settings</span>
              </Link>
            </nav>

            <div className="mt-6">
              <LogoutButton className="w-full" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
