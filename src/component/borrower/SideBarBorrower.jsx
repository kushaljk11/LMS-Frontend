// import { RxDashboard } from "react-icons/rx";
// import { IoBookOutline } from "react-icons/io5";
// import { BiBookReader } from "react-icons/bi";
// import { FaUserCircle } from "react-icons/fa";
// import { MdHistory } from "react-icons/md";
// import { Link, useLocation } from "react-router-dom";

// export default function BorrowerTopbar() {
//   return (
//     <header className="fixed top-0 left-0 right-0 bg-gray-100 border-b shadow-md z-30">
//       <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
//         {/* Logo */}
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
//             <IoBookOutline className="w-6 h-6 text-white" />
//           </div>
//           <div>
//             <h1 className="text-lg font-bold text-gray-900">LibraryMS</h1>
//             <p className="text-xs text-gray-500">Borrower Portal</p>
//           </div>
//         </div>

//         {/* Navigation */}
//         <nav className="flex items-center gap-6">
//           <TopbarItem icon={<RxDashboard />} label="Dashboard" to="/borrower/dashboard" />
//           <TopbarItem icon={<IoBookOutline />} label="Browse Books" to="/borrower/browse-books" />
//           <TopbarItem icon={<BiBookReader />} label="My Loans" to="/borrower/loaned-books" />
//           <TopbarItem icon={<MdHistory />} label="History" to="/borrower/history" />
//           <TopbarItem icon={<FaUserCircle />} label="Profile" to="/borrower/settings" />
//         </nav>
//       </div>
//     </header>
//   );
// }

// const TopbarItem = ({ icon, label, to }) => {
//   const location = useLocation();
//   const active = location.pathname === to;

//   const baseClass =
//     "flex items-center gap-2 text-sm px-2 py-1 rounded-md hover:bg-gray-200 transition-colors";
//   const activeClass = active ? "bg-gray-200 text-green-600 font-semibold" : "text-gray-700";

//   return (
//     <Link to={to} className={`${baseClass} ${activeClass}`}>
//       <span className="text-lg">{icon}</span>
//       <span>{label}</span>
//     </Link>
//   );
// };
