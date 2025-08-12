import Sidebar from "../Sidebar";
import Topbar from "../Topbar";
import { useState } from "react";

const initialBorrows = [
  {
    id: 1,
    bookTitle: "The Great Gatsby",
    memberName: "John Doe",
    borrowDate: "2024-07-01",
    dueDate: "2024-07-15",
    status: "Returned",
  },
  {
    id: 2,
    bookTitle: "Clean Code",
    memberName: "Jane Smith",
    borrowDate: "2024-07-05",
    dueDate: "2024-07-19",
    status: "Borrowed",
  },
];

const filters = ["All", "Borrowed", "Returned", "Overdue"];

function Borrow() {
  const [borrows] = useState(initialBorrows);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredBorrows = borrows.filter((b) => {
    const matchesFilter = filter === "All" || b.status === filter;
    const matchesSearch =
      b.bookTitle.toLowerCase().includes(search.toLowerCase()) ||
      b.memberName.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <>
      <div className="main min-h-screen bg-white flex flex-col">
        <Topbar />
        <div className="flex flex-1">
          <Sidebar />
          <div className="content flex-1 p-8">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-black mb-1">Borrow Records</h1>
              <p className="text-lg text-gray-500">
                Manage book borrow and return transactions
              </p>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
              <input
                type="text"
                placeholder="Search by book or member..."
                className="border border-gray-300 rounded-lg p-3 flex-1 text-base"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select
                className="border border-gray-300 rounded-lg p-3 w-full md:w-56 text-base"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                {filters.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
              <button className="bg-black text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-gray-800 transition">
                <span className="text-xl">+</span> New Borrow
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBorrows.map((b) => (
                <div
                  key={b.id}
                  className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h2 className="text-lg font-bold text-black">{b.bookTitle}</h2>
                      <p className="text-gray-500 text-base mb-2">
                        Borrowed by {b.memberName}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-lg h-fit capitalize ${
                        b.status === "Borrowed"
                          ? "bg-yellow-500 text-white"
                          : b.status === "Returned"
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-700 space-y-1 mb-4">
                    <div>
                      <span className="font-medium text-gray-500">Borrowed:</span>{" "}
                      {b.borrowDate}
                    </div>
                    <div>
                      <span className="font-medium text-gray-500">Due:</span>{" "}
                      {b.dueDate}
                    </div>
                  </div>
                  <div className="flex gap-3 mt-auto">
                    <button className="flex items-center gap-1 border border-gray-300 rounded-lg px-4 py-2 text-gray-800 hover:bg-gray-100 transition">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-1.414.94l-4.243 1.415 1.415-4.243a4 4 0 01.94-1.414z"
                        />
                      </svg>
                      Edit
                    </button>
                    <button className="flex items-center gap-1 border border-gray-300 rounded-lg px-4 py-2 text-gray-800 hover:bg-gray-100 transition">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Borrow;