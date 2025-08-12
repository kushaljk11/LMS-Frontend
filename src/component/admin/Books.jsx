import Sidebar from "../Sidebar";
import Topbar from "../Topbar";
import { useState } from "react";

const initialBooks = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "978-0-7432-7356-5",
    category: "Fiction",
    published: "1925",
    copies: 3,
    total: 5,
    status: "Available",
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    isbn: "978-0-06-112008-4",
    category: "Fiction",
    published: "1960",
    copies: 2,
    total: 4,
    status: "Available",
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    isbn: "978-0-13-235088-4",
    category: "Technology",
    published: "2008",
    copies: 1,
    total: 3,
    status: "Available",
  },
];

const categories = [
  "All Categories",
  "Fiction",
  "Non-Fiction",
  "Science",
  "Technology",
  "History",
];

function Books() {
  const [books] = useState(initialBooks);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");

  const filteredBooks = books.filter((book) => {
    const matchesCategory =
      category === "All Categories" || book.category === category;
    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase()) ||
      book.isbn.includes(search);
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <div className="main min-h-screen bg-white flex flex-col">
        <Topbar />
        <div className="flex flex-1">
          <Sidebar />
          <div className="content flex-1 p-8">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-black mb-1">Books</h1>
              <p className="text-lg text-gray-500">
                Manage your library&apos;s book collection
              </p>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
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
              <button className="bg-black text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-gray-800 transition">
                <span className="text-xl">+</span> Add Book
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBooks.map((book, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h2 className="text-xl font-bold text-black">
                        {book.title}
                      </h2>
                      <p className="text-gray-500 text-base mb-2">
                        by {book.author}
                      </p>
                    </div>
                    <span className="bg-black text-white text-xs font-semibold px-3 py-1 rounded-lg h-fit">
                      {book.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-700 space-y-1 mb-4">
                    <div>
                      <span className="font-medium text-gray-500">ISBN:</span>{" "}
                      {book.isbn}
                    </div>
                    <div>
                      <span className="font-medium text-gray-500">
                        Category:
                      </span>{" "}
                      {book.category}
                    </div>
                    <div>
                      <span className="font-medium text-gray-500">
                        Published:
                      </span>{" "}
                      {book.published}
                    </div>
                    <div>
                      <span className="font-medium text-gray-500">Copies:</span>{" "}
                      {book.copies} / {book.total}
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

export default Books;