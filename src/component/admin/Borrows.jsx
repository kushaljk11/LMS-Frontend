import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useState, useEffect } from "react";

export default function BorrowAdmin() {
  const [borrows, setBorrows] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBorrows = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("https://lms-ozcq.onrender.com/api/borrow/all-records", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        const validBorrows = (data.borrows || []).filter(b => b.bookId && b.userId);
        setBorrows(validBorrows);
        setLoading(false);
        
        
      } catch (error) {
        console.error("Error fetching borrower records:", error);
        setLoading(false);
      }
    };
    fetchBorrows();
    
  }, []);

  if (loading) return <div className="p-6 text-center">Loading borrower records...</div>;

  const borrowedList = borrows.filter(b => !b.returnDate);
  const returnedList = borrows.filter(b => b.returnDate);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Topbar />
      <div className="flex flex-1">
        <Sidebar />
  <main className="flex-1 md:ml-64 pt-2 px-4 sm:px-6 lg:px-8 pb-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-[#4AB5BB] mb-4">Borrow Records</h1>

            <div className="mb-6">
              <input
                type="text"
                placeholder="Search by book or member..."
                className="border border-gray-300 rounded-lg p-3 w-full text-base"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            <div className="mb-12">
              <h2 className="text-2xl text-red-600 font-semibold mb-4">
                Currently Borrowed ({borrowedList.length})
              </h2>
              {borrowedList.length === 0 && <p className="text-gray-500">No books currently borrowed.</p>}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {borrowedList
                  .filter(b =>
                    b.bookId.title.toLowerCase().includes(search.toLowerCase()) ||
                    b.userId.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map(b => {
                    const borrowDate = b.borrowDate ? new Date(b.borrowDate).toLocaleDateString() : "N/A";
                    const dueDate = b.dueDate ? new Date(b.dueDate).toLocaleDateString() : "N/A";
                    const bookTitle = b.bookId?.title || "Untitled Book";
                    const memberName = b.userId?.name || "Unknown Member";
                    const isOverdue = b.dueDate && new Date(b.dueDate) < new Date();

                    return (
                      <div key={b._id} className={`bg-white border ${isOverdue ? "border-red-500" : "border-gray-200"} rounded-2xl p-6 shadow-sm flex flex-col`}>
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-bold text-black">{bookTitle}</h3>
                            <p className="text-gray-500 text-base mb-2">Borrowed by {memberName}</p>
                          </div>
                          <span className="text-xs font-semibold px-3 py-1 rounded-lg h-fit capitalize bg-yellow-500 text-white">
                            Borrowed
                          </span>
                        </div>
                        <div className="text-sm text-gray-700 space-y-1">
                          <div><span className="font-medium text-gray-500">Borrowed:</span> {borrowDate}</div>
                          <div><span className="font-medium text-gray-500">Due:</span> {dueDate}</div>
                          {isOverdue && <div className="text-red-500 font-medium">Overdue</div>}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div>
              <h2 className="text-2xl text-green-600 font-semibold mb-4">
                Returned ({returnedList.length})
              </h2>
              {returnedList.length === 0 && <p className="text-gray-500">No books have been returned yet.</p>}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {returnedList
                  .filter(b =>
                    b.bookId.title.toLowerCase().includes(search.toLowerCase()) ||
                    b.userId.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map(b => {
                    const borrowDate = b.borrowDate ? new Date(b.borrowDate).toLocaleDateString() : "N/A";
                    const dueDate = b.dueDate ? new Date(b.dueDate).toLocaleDateString() : "N/A";
                    const returnDate = b.returnDate ? new Date(b.returnDate).toLocaleDateString() : "N/A";
                    const bookTitle = b.bookId?.title || "Untitled Book";
                    const memberName = b.userId?.name || "Unknown Member";

                    return (
                      <div key={b._id} className="bg-white border border-green-300 rounded-2xl p-6 shadow-sm flex flex-col">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-bold text-black">{bookTitle}</h3>
                            <p className="text-gray-500 text-base mb-2">Borrowed by {memberName}</p>
                          </div>
                          <span className="text-xs font-semibold px-3 py-1 rounded-lg h-fit capitalize bg-green-500 text-white">
                            Returned
                          </span>
                        </div>
                        <div className="text-sm text-gray-700 space-y-1">
                          <div><span className="font-medium text-gray-500">Borrowed:</span> {borrowDate}</div>
                          <div><span className="font-medium text-gray-500">Due:</span> {dueDate}</div>
                          <div><span className="font-medium text-gray-500">Returned:</span> {returnDate}</div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
