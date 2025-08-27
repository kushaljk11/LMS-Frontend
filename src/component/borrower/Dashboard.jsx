import { FaBook } from "react-icons/fa";
import BorrowerTopbar from "./BorrowerTopbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function BorrowerDashboard() {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get user name from localStorage
  const savedName = localStorage.getItem("name");
  const [user] = useState({ name: savedName || "User" });

  const goToBrowseBooks = () => navigate("/borrower/browse-books");

  // Fetch dashboard data
  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:4000/api/borrow/history", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDashboardData(res.data.borrows || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to load dashboard");
      setLoading(false);
    }
  };

  // Return book API
  const returnBook = async (borrowId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:4000/api/borrow/return/${borrowId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Optimistically update dashboard data
      setDashboardData((prev) =>
        prev.map((b) =>
          b._id === borrowId ? { ...b, returnDate: new Date() } : b
        )
      );
    } catch (err) {
      console.error("Failed to return book:", err);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  // Calculations
  const booksOnLoan = dashboardData.filter((b) => !b.returnDate).length;
  const booksReturned = dashboardData.filter((b) => b.returnDate).length;
  const totalBorrowed = dashboardData.length;
  const overdueBooks = dashboardData.filter(
    (b) => !b.returnDate && new Date(b.dueDate) < new Date()
  );

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading dashboard...</p>
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
        
          <div className="mb-6 text-left">
            <h1 className="text-4xl font-bold text-gray-900">
              Welcome back,{" "}
              <span className="text-green-600">{user.name}</span>!
            </h1>
            <p className="text-gray-600 mt-1 ">
              Here’s a quick overview of your library activity. You can see your
              borrowed books, overdue items, and explore more resources below.
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card
              title="Books On Loans"
              value={booksOnLoan}
              subtitle="Books on loan"
              icon={<FaBook />}
            />
            <Card
              title="Books Returned"
              value={booksReturned}
              subtitle="Books returned"
              icon={<FaBook />}
            />
            <Card
              title="Total Borrowed"
              value={totalBorrowed}
              subtitle="Books borrowed"
              icon={<FaBook />}
            />
            <Card
              title="Overdue Books"
              value={overdueBooks.length}
              subtitle="Books overdue"
              icon={<FaBook />}
            />
          </div>

          {/* Currently Borrowed and Overdue Books */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-gray-200">
              <h2 className="font-semibold text-lg mb-2 text-green-700">
                Currently Borrowed Books
              </h2>
              {dashboardData
                .filter((b) => !b.returnDate)
                .map((b) => (
                  <BookCard
                    key={b._id}
                    image={b.bookId.image || ""}
                    title={b.bookId.title}
                    author={b.bookId.author}
                    daysOverdue={Math.max(
                      0,
                      Math.floor(
                        (new Date() - new Date(b.dueDate)) / (1000 * 60 * 60 * 24)
                      )
                    )}
                    renewalsLeft={b.renewalsLeft || 1}
                    onReturn={() => returnBook(b._id)}
                  />
                ))}
            </div>

            <div className="flex flex-col gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-gray-200">
              <h2 className="font-semibold text-lg mb-2 text-red-700">
                Overdue Books
              </h2>
              {overdueBooks.map((b) => (
                <BookCard
                  key={b._id}
                  image={b.bookId.image || ""}
                  title={b.bookId.title}
                  author={b.bookId.author}
                  daysOverdue={Math.max(
                    0,
                    Math.floor(
                      (new Date() - new Date(b.dueDate)) / (1000 * 60 * 60 * 24)
                    )
                  )}
                  renewalsLeft={0}
                />
              ))}
            </div>
          </div>

          {/* Explore More */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 p-4 sm:p-6 bg-white rounded-2xl border border-gray-200">
            <h2 className="text-lg font-semibold">Explore More Books</h2>
            <button
              className="mt-3 sm:mt-0 bg-green-600 text-white px-4 py-2 rounded w-full sm:w-auto"
              onClick={goToBrowseBooks}
            >
              Browse All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BorrowerDashboard;

// --- Card Component ---
function Card({ title, value, subtitle, icon }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-semibold text-green-700">{title}</h3>
        <div className="p-2 text-green-600">{icon}</div>
      </div>
      <div>
        <div className="text-3xl font-bold text-gray-900">{value}</div>
        <div className="text-sm text-red-600">{subtitle}</div>
      </div>
    </div>
  );
}

// --- BookCard Component ---
function BookCard({ image, title, author, daysOverdue, renewalsLeft, onReturn }) {
  return (
    <div className="flex items-start space-x-4 p-5 rounded-2xl bg-white border border-gray-200">
      <img
        src={image}
        alt={title}
        className="w-16 h-20 object-cover rounded-md bg-gray-100"
      />
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-semibold">{title}</h3>
        <p className="text-sm text-gray-600 mb-2">{author}</p>
        <div className="flex items-center space-x-3 text-sm mb-2">
          {daysOverdue > 0 ? (
            <span className="text-red-600 text-xs">
              {daysOverdue} days overdue
            </span>
          ) : (
            <span className="text-green-600 text-xs">On Time</span>
          )}
          <span className="text-gray-500 text-xs">{renewalsLeft} renewals left</span>
        </div>
        {onReturn && (
          <button
            className="bg-blue-600 text-white px-2 py-1 rounded text-xs"
            onClick={onReturn}
          >
            Return
          </button>
        )}
      </div>
    </div>
  );
}
