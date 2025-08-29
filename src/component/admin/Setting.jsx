import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext.js";

function Setting() {
  const { user } = useAuth();

  const [libraryName, setLibraryName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setLibraryName(user.libraryName || "My Library");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setAddress(user.address || "");
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
    
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Topbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-[#4AB5BB] mb-1">Settings</h1>
              <p className="text-lg text-gray-500">
                Manage your library information and preferences
              </p>
            </div>

            <form
              className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm space-y-6"
              onSubmit={handleSubmit}
            >
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Library Name
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg p-3 w-full"
                  value={libraryName}
                  onChange={(e) => setLibraryName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="border border-gray-300 rounded-lg p-3 w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Phone
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg p-3 w-full"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Address
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg p-3 w-full"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-[#4AB5BB] text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
              >
                Save Changes
              </button>

              {success && (
                <div className="text-green-600 font-semibold mt-2">
                  Settings updated!
                </div>
              )}
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Setting;
