import { FaPlus } from "react-icons/fa6";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Bookform from "./Bookform";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [modelForm, setModelForm] = useState(false);
  const [editBookData, setEditBookData] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchBooks() {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get("http://localhost:4000/api/books", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response.status === 200) {
        setBooks(response.data.books || response.data);
      }
    } catch (err) {
      const status = err.response?.status;
      const serverMessage = err.response?.data?.message || err.message;

      if (status === 401) setError("Unauthorized (401): please login again.");
      else if (status === 403)
        setError("Forbidden (403): you do not have permission to view books.");
      else setError("Failed to load books: " + serverMessage);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  const categories = useMemo(() => {
    const set = new Set();
    books.forEach((b) => {
      if (b.category) set.add(b.category);
    });
    return ["All Categories", ...Array.from(set)];
  }, [books]);

  const filteredBooks = books.filter((book) => {
    const matchesCategory =
      category === "All Categories" || (book.category || "") === category;
    const q = search.trim().toLowerCase();
    const matchesSearch =
      !q ||
      (book.title || "").toLowerCase().includes(q) ||
      (book.author || "").toLowerCase().includes(q) ||
      (book.isbn || "").includes(q);
    return matchesCategory && matchesSearch;
  });

  // Delete book
  const handleDelete = async (book) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      const res = await axios.delete(
        `http://localhost:4000/api/books/${book.isbn}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      alert(res.data.message);
      setBooks((prev) => prev.filter((b) => b.isbn !== book.isbn));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete book");
    }
  };

  // Open edit form
  const handleEdit = (book) => {
    setEditBookData(book);
    setModelForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Topbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 md:ml-64 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-1">Books</h1>
                <p className="text-base sm:text-lg text-gray-500">Manage your library's book collection</p>
              </div>
              <div className="flex-shrink-0">
                <button
                  onClick={() => {
                    setEditBookData(null);
                    setModelForm(true);
                  }}
                  className="bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-blue-700 transition w-full sm:w-auto"
                >
                  <FaPlus /> Add Book
                </button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6">
              <input
                type="text"
                placeholder="Search books by title, author, or ISBN..."
                className="border border-gray-300 rounded-lg p-3 flex-1 text-base"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select
                className="border border-gray-300 rounded-lg p-3 w-full md:w-56 text-base"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {loading ? (
              <div className="text-center text-gray-500 py-8">Loading books...</div>
            ) : error ? (
              <div className="text-center text-red-500 py-8">{error}</div>
            ) : filteredBooks.length === 0 ? (
              <div className="text-center text-gray-500 py-8">No books found.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBooks.map((book) => (
                  <div
                    key={book._id || book.isbn}
                    className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h2 className="text-xl font-bold text-blue-600">{book.title}</h2>
                        <p className="text-gray-500 text-base mb-2">by {book.author}</p>
                      </div>
                      <span className="bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-lg h-fit capitalize">
                        {book.status || (book.availableBooks > 0 ? "available" : "borrowed") || "unknown"}
                      </span>
                    </div>

                    <div className="text-sm text-gray-700 space-y-1 mb-4">
                      <div>
                        <span className="font-medium text-gray-500">ISBN:</span> {book.isbn}
                      </div>
                      <div>
                        <span className="font-medium text-gray-500">Category:</span> {book.category || "—"}
                      </div>
                      <div>
                        <span className="font-medium text-gray-500">Published:</span> {book.publishedYear || book.published || "—"}
                      </div>
                      <div>
                        <span className="font-medium text-gray-500">Copies:</span> {book.quantity ?? book.copies ?? 0} / {book.total ?? book.quantity ?? 0}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                      <button
                        onClick={() => handleEdit(book)}
                        className="w-full sm:w-auto flex items-center justify-center gap-1 border border-gray-300 rounded-lg px-4 py-2 text-gray-800 hover:bg-gray-100 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(book)}
                        className="w-full sm:w-auto flex items-center justify-center gap-1 border border-gray-300 rounded-lg px-4 py-2 text-red-600 hover:bg-red-100 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {modelForm && (
        <Bookform
          modelForm={setModelForm}
          fetchBooks={fetchBooks}
          editBook={editBookData}
        />
      )}
    </div>
  );
}
