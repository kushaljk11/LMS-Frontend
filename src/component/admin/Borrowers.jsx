  import Sidebar from "./Sidebar.jsx";
  import Topbar from "./Topbar.jsx";
  import { useState, useEffect } from "react";
  import api from "../../config/config.js";
  import BorrowerForm from "./Memberform.jsx";

  const filters = ["All Borrowers", "Active", "Inactive", "Overdue"];

  function Borrowers() {
    const [borrowers, setBorrowers] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All Borrowers");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [modelForm, setModelForm] = useState(false);
    const [editBorrower, setEditBorrower] = useState(null);

    const fetchBorrowers = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await api.get("/allborrowers");
        setBorrowers(response.data.borrowers || []);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchBorrowers();
    }, []);

    const handleDelete = async (id) => {
      // eslint-disable-next-line no-restricted-globals
      if (!confirm("Are you sure you want to delete this borrower?")) return;
      try {
        await api.delete(`/deleteborrowers/${id}`);
        fetchBorrowers();
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || err.message);
      }
    };

    const filteredBorrowers = borrowers.filter((b) => {
      const matchesSearch =
        b.name?.toLowerCase().includes(search.toLowerCase()) ||
        b.email?.toLowerCase().includes(search.toLowerCase()) ||
        b.phone?.includes(search) ||
        b.borrowedBooks.some(book => book.title.toLowerCase().includes(search.toLowerCase()));

      const matchesFilter =
        filter === "All Borrowers" ||
        (filter === "Active" && b.activeLoans > 0) ||
        (filter === "Inactive" && b.activeLoans === 0) ||
        (filter === "Overdue" && b.overdue > 0);

      return matchesSearch && matchesFilter;
    });

    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Topbar />
        <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 md:ml-64 p-4 sm:p-6 lg:p-8">
              <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-blue-600 mb-1">Borrowers</h1>
                <p className="text-lg text-gray-500">
                  Manage borrowers and track their loan activities
                </p>
              </div>

              <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6">
                <input
                  type="text"
                  placeholder="Search borrowers by name, email, phone, or book..."
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
                <button
                  onClick={() => { setEditBorrower(null); setModelForm(true); }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition w-full md:w-auto"
                >
                  + Add Borrower
                </button>
              </div>

              {/* Borrowers List */}
              {loading ? (
                <div className="text-center text-gray-500 py-8">Loading...</div>
              ) : error ? (
                <div className="text-center text-red-500 py-8">{error}</div>
              ) : filteredBorrowers.length === 0 ? (
                <div className="text-center text-gray-500 py-8">No borrowers found.</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {filteredBorrowers.map((b, idx) => (
                    <div key={b._id || idx} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h2 className="text-xl font-bold text-black">{b.name}</h2>
                          <p className="text-gray-500 text-base mb-2">
                            Borrower since {b.createdAt ? new Date(b.createdAt).toLocaleDateString() : b.since}
                          </p>
                        </div>
                        <span className={`text-xs font-semibold px-3 py-1 rounded-lg h-fit capitalize ${b.activeLoans > 0 ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                          {b.activeLoans > 0 ? "active" : "inactive"}
                        </span>
                      </div>

                      <div className="text-sm text-gray-700 space-y-2 mb-4">
                        <p>Total loans: {b.totalLoans}</p>
                        <p>Active loans: {b.activeLoans}</p>
                        <p>Overdue: {b.overdue}</p>

                        {b.borrowedBooks.length > 0 && (
                          <div>
                            <h4 className="font-semibold mb-1">Borrowed Books:</h4>
                            <ul className="list-disc pl-5 text-sm text-gray-600">
                              {b.borrowedBooks.map((book, i) => (
                                <li key={i}>
                                  <span className="font-medium">{book.title}</span> | Borrowed: {new Date(book.borrowDate).toLocaleDateString()} | Due: {new Date(book.dueDate).toLocaleDateString()} | {book.returned ? "Returned" : "Pending"}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                        <button
                          className="w-full sm:w-auto flex items-center justify-center gap-1 border border-gray-300 rounded-lg px-4 py-2 text-gray-800 hover:bg-gray-100 transition"
                          onClick={() => { setEditBorrower(b); setModelForm(true); }}
                        >
                          Edit
                        </button>
                        <button
                          className="w-full sm:w-auto flex items-center justify-center gap-1 border border-gray-300 rounded-lg px-4 py-2 text-gray-800 hover:bg-gray-100 transition"
                          onClick={() => handleDelete(b._id)}
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

        {/* Borrower Form Modal */}
        {modelForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg relative">
              <button
                onClick={() => setModelForm(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold"
              >
                ✕
              </button>
              <BorrowerForm modelBorrowerForm={setModelForm} fetchBorrowers={fetchBorrowers} editBorrower={editBorrower} />
            </div>
          </div>
        )}
      </div>
    );
  }

  export default Borrowers;
