import { FaBook } from "react-icons/fa";
import { FiRotateCcw } from "react-icons/fi";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";

function BorrowerDashboard() {
  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Topbar />
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex-1 p-6">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold">Dashboard</h1>
              <p className="mt-2 text-gray-600">Welcome to your dashboard!</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card
                title="Books On Loans"
                value="1,024"
                subtitle="Books on loan"
                icon={
                  <FaBook className="w-5 h-5 text-blue-500 hover:text-red-600" />
                }
              />
              <Card
                title="Book Returns"
                value="512"
                subtitle="Books returned"
                icon={
                  <FaBook className="w-5 h-5 text-blue-500 hover:text-red-600" />
                }
              />
              <Card
                title="Total Borrowed"
                value="128"
                subtitle="Books borrowed"
                icon={
                  <FaBook className="w-5 h-5 text-blue-500 hover:text-red-600" />
                }
              />
              <Card
                title="Overdue Books"
                value="32"
                subtitle="Books overdue"
                icon={
                  <FaBook className="w-5 h-5 text-blue-500 hover:text-red-600" />
                }
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="flex flex-col gap-4 bg-slate-100 p-6 rounded-lg shadow-sm">
                <div className="font-semibold  flex justify-between items-center mb-4">
                  <h1>Currently Borrowed Books</h1>
                  <button className="text-blue-500 hover:text-blue-700">
                    View All
                  </button>
                </div>
                <div className="flex flex-col gap-4">
                  <BookCard
                    image=""
                    title="Book Title"
                    author="Author Name"
                    daysOverdue={0}
                    renewalsLeft={1}
                  />
                  <BookCard
                    image=""
                    title="Book Title"
                    author="Author Name"
                    daysOverdue={0}
                    renewalsLeft={1}
                  />
                  <BookCard
                    image=""
                    title="Book Title"
                    author="Author Name"
                    daysOverdue={0}
                    renewalsLeft={1}
                  />
                </div>

              </div>

              <div>
                <h2>Overdue Books</h2>
              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default BorrowerDashboard;

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

function BookCard({
  image,
  title,
  author,
  daysOverdue,
  renewalsLeft,
  showRenewButton = true,
}) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 max-w-md w-full">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <img
            src={image}
            alt={title}
            className="w-16 h-20 object-cover rounded-md bg-gray-100"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-600 mb-3">{author}</p>
          <div className="flex items-center space-x-4 text-sm">
            {daysOverdue > 0 && (
              <span className="bg-red-500 text-white px-2 py-1 rounded-md font-medium">
                {daysOverdue} days overdue
              </span>
            )}
            <span className="text-gray-500">{renewalsLeft} renewals left</span>
          </div>
        </div>
        {showRenewButton && (
          <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors">
            <FiRotateCcw size={16} />
            <span className="text-sm font-medium">Renew</span>
          </button>
        )}
      </div>
    </div>
  );
}
