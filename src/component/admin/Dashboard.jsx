import {
  FaBook,
  FaUsers,
  FaCalendarAlt,
  FaExclamationTriangle,
  FaPlus,
  FaUserPlus,
} from "react-icons/fa";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";
import { useEffect, useState } from "react";
import api from "../../config/config.js";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [recentIssues, setRecentIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDashboard() {
      setLoading(true);
      setError("");
      try {
        const res = await api.get("/dashboard");
        if (res.data && res.data.stats) {
          setStats(res.data.stats);
          setRecentIssues(res.data.recentIssues || []);
        } else {
          setError("Invalid response format");
        }
      } catch (err) {
        setError(`Failed to load dashboard data: ${err.response?.data?.message || err.message}`);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboard();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Topbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 md:ml-64 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-blue-600 mb-2">Dashboard</h1>
              <p className="text-gray-600">Welcome to the Library Management System</p>
            </div>

            {loading ? (
              <div className="text-center text-gray-500">Loading...</div>
            ) : error ? (
              <div className="text-center text-red-500">{error}</div>
            ) : stats ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  <Card
                    title="Total Books"
                    value={stats.books || 0}
                    subtitle={`${stats.availableBooks || 0} available`}
                    icon={<FaBook className="w-5 h-5 text-blue-500" />}
                  />
                  <Card
                    title="Total Members"
                    value={stats.members || 0}
                    subtitle={`${stats.activeMembers || 0} active`}
                    icon={<FaUsers className="w-5 h-5 text-green-500" />}
                  />
                  <Card
                    title="Books Issued Today"
                    value={stats.issuedToday || 0}
                    subtitle="New issues"
                    icon={<FaCalendarAlt className="w-5 h-5 text-purple-500" />}
                  />
                  <Card
                    title="Overdue Books"
                    value={stats.overdueBooks || 0}
                    subtitle="Need attention"
                    icon={<FaExclamationTriangle className="w-5 h-5 text-red-500" />}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Recent Book Issues</h3>
                    <p className="text-sm text-gray-600 mb-4">Latest books issued to members</p>
                    {recentIssues.length === 0 ? (
                      <div className="text-gray-400">No recent issues.</div>
                    ) : (
                      recentIssues.map((issue, idx) => (
                        <div key={idx} className="flex items-center justify-between py-3 border-t border-gray-100">
                          <div>
                            <div className="font-medium text-gray-900">{issue.bookTitle}</div>
                            <div className="text-sm text-gray-500">Issued to {issue.memberName}</div>
                          </div>
                          <div className="text-sm text-gray-500">{issue.date}</div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Actions</h3>
                    <p className="text-sm text-gray-600 mb-4">Common tasks and shortcuts</p>
                    <div className="space-y-3">
                      <QuickAction label="Add New Book" icon={<FaBook className="w-5 h-5 text-gray-400" />} />
                      <QuickAction label="Register Member" icon={<FaUserPlus className="w-5 h-5 text-gray-400" />} />
                      <QuickAction label="Issue Book" icon={<FaPlus className="w-5 h-5 text-gray-400" />} />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center text-gray-500">No data available</div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

function Card({ title, value, subtitle, icon }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-700">{title}</h3>
        {icon}
      </div>
      <div className="space-y-1">
        <div className="text-3xl font-bold text-gray-900">{value}</div>
        <div className="text-sm text-gray-500">{subtitle}</div>
      </div>
    </div>
  );
}

function QuickAction({ label, icon }) {
  return (
    <button className="w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-lg hover:bg-blue-100 transition-colors">
      <span className="font-medium text-gray-900">{label}</span>
      {icon}
    </button>
  );
}
