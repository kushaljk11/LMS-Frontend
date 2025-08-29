import React, { useState, useEffect } from "react";
import BorrowerTopbar from "./BorrowerTopbar";
import { FiCalendar } from "react-icons/fi";
import { FaBook, FaClock } from "react-icons/fa";

export default function BorrowingHistory() {
  const [historyData, setHistoryData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch("https://lms-ozcq.onrender.com/api/borrow/history", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch history");
        const data = await res.json();

        const formattedData = data.borrows.map((b) => ({
          _id: b._id,
          title: b.bookId?.title || "Unknown Title",
          author: b.bookId?.author || "Unknown Author",
          category: b.bookId?.category || "Unknown",
          status: b.returnDate ? "Returned" : "Active",
          borrowedDate: new Date(b.borrowDate).toLocaleDateString(),
          returnedDate: b.returnDate ? new Date(b.returnDate).toLocaleDateString() : null,
        }));

        setHistoryData(formattedData);
      } catch (err) {
        console.error("Error fetching history:", err);
      }
    };

    fetchHistory();
  }, []);

  const filteredHistory = historyData.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || book.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalLoans = historyData.length;
  const booksReturned = historyData.filter((b) => b.status === "Returned").length;
    const totalRenewals = historyData.reduce((acc, b) => acc + (b.renewals || 0), 0);
  const onTimeReturns =
    totalLoans > 0 ? Math.round((booksReturned / totalLoans) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <BorrowerTopbar />
      <div className="flex flex-1 pt-20 px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex-1 p-2 sm:p-6">
          <h1 className="text-4xl font-bold text-green-700 mb-2">Borrowing <span className="text-gray-600">History.</span></h1>
          <p className="text-gray-600 mb-6">Complete record of your library borrowing activity</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow flex items-center gap-3">
              <span className="text-green-600 text-2xl"><FaBook /> </span>
              <div>
                <p className="text-xl font-bold">{totalLoans}</p>
                <p className="text-gray-500 text-sm">Total Loans</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow flex items-center gap-3">
              <span className="text-green-500 text-2xl"><FaBook /> </span>
              <div>
                <p className="text-xl font-bold">{booksReturned}</p>
                <p className="text-gray-500 text-sm">Books Returned</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow flex items-center gap-3">
              <span className="text-green-700 text-2xl"><FaBook /> </span>
              <div>
                <p className="text-xl font-bold">{totalRenewals}</p>
                <p className="text-gray-500 text-sm">Total Renewals</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow flex items-center gap-3">
              <span className="text-green-400 text-2xl"><FaClock /> </span>
              <div>
                <p className="text-xl font-bold">{onTimeReturns}%</p>
                <p className="text-gray-500 text-sm">On-Time Returns</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6 flex flex-col sm:flex-row gap-4 items-center">
            <input
              type="text"
              placeholder="Title, author, category..."
              className="flex-1 border rounded-lg px-4 py-2 shadow-sm focus:ring-1 focus:ring-green-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="border rounded-lg px-4 py-2 shadow-sm focus:ring-1 focus:ring-green-600"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All</option>
              <option>Active</option>
              <option>Returned</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredHistory.length === 0 ? (
              <p className="text-gray-500">No records found.</p>
            ) : (
              filteredHistory.map((book) => (
                <div
                  key={book._id}
                  className="bg-white p-4 rounded-lg shadow flex flex-col sm:flex-row justify-between items-start sm:items-center"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{book.title}</h3>
                    <p className="text-gray-600 text-sm">by {book.author}</p>
                    <div className="flex gap-2 mt-1 text-xs">
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded">{book.category}</span>
                      <span
                        className={`px-2 py-1 rounded ${
                          book.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {book.status}
                      </span>
                    </div>
                    <div className="flex gap-2 mt-2 text-gray-500 text-sm items-center">
                      <FiCalendar /> Borrowed on {book.borrowedDate}
                      {book.returnedDate && ` | Returned on ${book.returnedDate}`}
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-0 sm:ml-4 w-full sm:w-24 h-20 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-sm">
                    Cover
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <div className="bg-white border-t border-gray-200 p-4 text-center text-sm text-gray-500">
        &copy; 2024 LibraryMS. All rights reserved.
      </div>
    </div>
  );
}
