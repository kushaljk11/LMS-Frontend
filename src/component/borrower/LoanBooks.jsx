import React, { useState, useEffect } from "react";
import BorrowerTopbar from "./BorrowerTopbar";
import { FiRotateCcw } from "react-icons/fi";

const BooksPerPage = 6;

export default function LoanedBooks() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("https://lms-ozcq.onrender.com/api/borrow/history", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch borrowed books");

        const data = await res.json();

        const formatted = data.borrows.map((b) => ({
          _id: b._id,
          title: b.bookId?.title || "Unknown Title",
          author: b.bookId?.author || "Unknown Author",
          borrowedDate: new Date(b.borrowDate).toLocaleDateString(),
          dueDate: new Date(b.dueDate).toLocaleDateString(),
          daysOverdue:
            !b.returnDate && new Date(b.dueDate) < new Date()
              ? Math.floor(
                  (new Date() - new Date(b.dueDate)) / (1000 * 60 * 60 * 24)
                )
              : 0,
          renewalsLeft: b.renewalsLeft ?? 1,
          returned: b.returnDate !== null,
        }));

        setBooks(formatted);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching borrowed books:", error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleReturn = async (borrowId) => {
    try {
      const res = await fetch(
        `https://lms-ozcq.onrender.com/api/borrow/return/${borrowId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to return book");

      const data = await res.json();

      setBooks((prev) =>
        prev.map((b) =>
          b._id === borrowId ? { ...b, returned: true, daysOverdue: 0 } : b
        )
      );

      alert(data.message);
    } catch (err) {
      console.error(err);
      alert("Error returning the book. Try again.");
    }
  };

  const filteredBooks = books
    .filter((book) => !book.returned)
    .filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter =
        filter === "All" ||
        (filter === "Overdue" && book.daysOverdue > 0) ||
        (filter === "On Time" && book.daysOverdue === 0);
      return matchesSearch && matchesFilter;
    });

  const totalPages = Math.ceil(filteredBooks.length / BooksPerPage);
  const startIndex = (currentPage - 1) * BooksPerPage;
  const currentBooks = filteredBooks.slice(
    startIndex,
    startIndex + BooksPerPage
  );

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading borrowed books...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <BorrowerTopbar />

      <div className="flex flex-1 pt-20 px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex-1 p-2 sm:p-6 overflow-y-auto">
          <h1 className="text-4xl text-green-600 font-bold mb-2">
            Loaned <span className="text-gray-600">Books.</span>
          </h1>
          <p className="text-gray-600 mb-6">
            Track your borrowed books and their status
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="Search by title or author..."
              className="flex-1 border rounded-lg px-4 py-2 shadow-sm focus:ring-1 focus:ring-green-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="w-full sm:w-48 border rounded-lg px-4 py-2 shadow-sm focus:ring-1 focus:ring-green-600"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option>All</option>
              <option>On Time</option>
              <option>Overdue</option>
            </select>
          </div>

          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentBooks.map((book) => (
              <LoanBookCard
                key={book._id}
                book={book}
                onReturn={handleReturn}
              />
            ))}
            {currentBooks.length === 0 && (
              <p className="text-gray-500 text-center col-span-full">
                No active borrowed books found.
              </p>
            )}
          </div>

          
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              <button
                className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-100 transition"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Back
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  className={`px-4 py-2 border rounded-lg ${
                    currentPage === i + 1
                      ? "text-white bg-green-600"
                      : "hover:bg-gray-100"
                  } transition`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-green-400 hover:text-white transition"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white border-t border-gray-200 p-4 text-center text-sm text-gray-500">
        &copy; 2024 LibraryMS. All rights reserved.
      </div>
    </div>
  );
}

function LoanBookCard({ book, onReturn }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition transform hover:-translate-y-1">
      <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-400 text-sm font-medium">
        Book Cover
      </div>

      <div className="p-5 flex flex-col h-full">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-1">
            {book.title}
          </h3>
          <p className="text-gray-600 mb-3">{book.author}</p>

          <div className="flex flex-col gap-1 mb-3 text-sm text-gray-700">
            <span>
              <strong>Borrowed:</strong> {book.borrowedDate}
            </span>
            <span>
              <strong>Due:</strong> {book.dueDate}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                book.daysOverdue > 0
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {book.daysOverdue > 0
                ? `${book.daysOverdue} days overdue`
                : "On Time"}
            </span>
            <span className="text-gray-500 text-xs">
              {book.renewalsLeft} renewals left
            </span>
          </div>
        </div>

        {!book.returned && (
          <div className="flex gap-2 mt-4">
            <button className="flex-1 flex items-center justify-center gap-2 text-green-600 border border-green-600 rounded-lg py-2 hover:bg-green-50 transition font-medium">
              <FiRotateCcw size={16} /> Renew
            </button>
            <button
              onClick={() => onReturn(book._id)}
              className="flex-1 text-white bg-red-600 hover:bg-red-700 rounded-lg py-2 transition font-medium"
            >
              Return
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
