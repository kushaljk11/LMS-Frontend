import React, { useState, useEffect } from "react";
import BorrowerTopbar from "./BorrowerTopbar";
import axios from "axios";

const BooksPerPage = 6;

export default function BrowseBooks({ onBorrow, refreshBooks }) {
  const [booksData, setBooksData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchBooks() {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("http://localhost:4000/api/books", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setBooksData(response.data.books || response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load books");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    if (refreshBooks) fetchBooks();
  }, [refreshBooks]);

  const handleBorrow = async (bookId) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/borrow",
        { bookId },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      alert(response.data.message);

      setBooksData((prev) =>
        prev.map((b) =>
          b._id === bookId
            ? { ...b, availableBooks: Math.max(0, b.availableBooks - 1) }
            : b
        )
      );

      if (onBorrow) onBorrow();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to borrow book");
    }
  };

  const filteredBooks = booksData.filter(
    (book) =>
      (book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (category === "All Categories" || book.category === category)
  );

  const totalPages = Math.ceil(filteredBooks.length / BooksPerPage);
  const startIndex = (currentPage - 1) * BooksPerPage;
  const currentBooks = filteredBooks.slice(
    startIndex,
    startIndex + BooksPerPage
  );

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading books...</p>
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <BorrowerTopbar />
      <div className="flex flex-1 pt-20 px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex-1 p-2 sm:p-6 overflow-y-auto">
          <h1 className="text-4xl text-green-600 font-bold mb-1">
            Browse <span className="text-gray-600">Books.</span>
          </h1>
          <p className="text-gray-600 mb-4">Discover and borrow books</p>

          {/* Search + Category Filter */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <input
              type="text"
              placeholder="Search by title, author..."
              className="flex-1 border rounded px-4 py-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="w-full sm:w-48 border rounded px-4 py-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>All Categories</option>
              <option>Fiction</option>
              <option>Non-fiction</option>
              <option>Science</option>
            </select>
          </div>

          <p className="mb-4">
            Showing {currentBooks.length} of {filteredBooks.length} books
          </p>

          {/* Books Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {currentBooks.map((book) => {
              const isAvailable = book.availableBooks > 0;
              return (
                <div
                  key={book._id}
                  className={`border rounded p-4 relative bg-white transition-opacity ${
                    !isAvailable ? "opacity-60" : ""
                  }`}
                >
                  {/* Availability Badge */}
                  <div
                    className={`absolute top-2 right-2 px-2 py-1 text-xs rounded ${
                      isAvailable
                        ? "bg-green-600 text-white"
                        : "bg-red-700 text-white"
                    }`}
                  >
                    {isAvailable ? "Available" : "Unavailable"}
                  </div>

                  {/* Book Image */}
                  <div className="h-40 sm:h-44 bg-gray-200 flex items-center justify-center mb-4">
                    {book.image ? (
                      <img
                        src={book.image}
                        alt={book.title}
                        className="h-full object-cover w-full"
                      />
                    ) : (
                      <span className="text-gray-400">No Image</span>
                    )}
                  </div>

                  {/* Book Details */}
                  <h2 className="font-semibold">{book.title}</h2>
                  <p className="text-gray-600">{book.author}</p>

                  {/* Total & Available */}
                  <p className="text-sm text-gray-500 mt-2">
                    Total: <strong>{book.total ?? book.quantity ?? 0}</strong>{" "}
                    | Available:{" "}
                    <strong>{book.availableBooks ?? book.quantity ?? 0}</strong>
                  </p>

                  {/* Borrow Button */}
                  <button
                    className={`mt-4 w-full py-2 rounded ${
                      isAvailable
                        ? "bg-green-600 text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                    disabled={!isAvailable}
                    onClick={() => handleBorrow(book._id)}
                  >
                    {isAvailable ? "Borrow" : "Unavailable"}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6 gap-2">
            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Back
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`px-3 py-1 border rounded ${
                  currentPage === i + 1 ? "bg-green-600 text-white" : ""
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
