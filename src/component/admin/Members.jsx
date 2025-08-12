import Sidebar from "../Sidebar";
import Topbar from "../Topbar";
import { useState } from "react";

const initialMembers = [
  {
    name: "Prasun Bahttrai",
    since: "1/10/2024",
    email: "prasun.bahttrai@email.com",
    phone: "9804060401",
    address: "123 Main St, City, State 12345",
    status: "active",
  },
  {
    name: "sandesh",
    since: "1/12/2024",
    email: "sandesh@email.com",
    phone: "9804060402",
    address: "456 Oak Ave, City, State 12345",
    status: "active",
  },
];

const filters = ["All Members", "Active", "Inactive"];

function Members() {
  const [members] = useState(initialMembers);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All Members");

  const filteredMembers = members.filter((member) => {
    const matchesFilter =
      filter === "All Members" || member.status.toLowerCase() === filter.toLowerCase();
    const matchesSearch =
      member.name.toLowerCase().includes(search.toLowerCase()) ||
      member.email.toLowerCase().includes(search.toLowerCase()) ||
      member.phone.includes(search);
    return matchesFilter && matchesSearch;
  });

  return (
    <>
      <div className="main min-h-screen bg-white flex flex-col">
        <Topbar />
        <div className="flex flex-1">
          <Sidebar />
          <div className="content flex-1 p-8">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-black mb-1">Members</h1>
              <p className="text-lg text-gray-500">
                Manage library members and their information
              </p>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
              <input
                type="text"
                placeholder="Search members by name, email, or phone..."
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
              <button className="bg-black text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-gray-800 transition">
                <span className="text-xl">+</span> Add Member
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredMembers.map((member, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h2 className="text-xl font-bold text-black">{member.name}</h2>
                      <p className="text-gray-500 text-base mb-2">
                        Member since {member.since}
                      </p>
                    </div>
                    <span className="bg-black text-white text-xs font-semibold px-3 py-1 rounded-lg h-fit capitalize">
                      {member.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-700 space-y-1 mb-4">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 01-8 0m8 0V8a4 4 0 10-8 0v4m8 0a4 4 0 01-8 0" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v2m0 0h.01M12 18h.01" />
                      </svg>
                      <span>{member.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm0 12a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2zm12-12a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zm0 12a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                      <span>{member.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 12.414a2 2 0 00-2.828 0l-4.243 4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{member.address}</span>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-auto">
                    <button className="flex items-center gap-1 border border-gray-300 rounded-lg px-4 py-2 text-gray-800 hover:bg-gray-100 transition">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-1.414.94l-4.243 1.415 1.415-4.243a4 4 0 01.94-1.414z" />
                      </svg>
                      Edit
                    </button>
                    <button className="flex items-center gap-1 border border-gray-300 rounded-lg px-4 py-2 text-gray-800 hover:bg-gray-100 transition">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
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

export default Members;