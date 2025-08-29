import React from "react";
import BorrowerTopbar from "./BorrowerTopbar";

export default function BorrowerProfileSettings() {
  const user = {
    libraryName: "My Library",
    email: "kushalkattel025@gmail.com",
    phone: "+977-9800000000",
    address: "Kathmandu, Nepal",
    membership: "Regular",
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <BorrowerTopbar />
      <div className="flex flex-1 pt-20 px-4 sm:px-6 lg:px-8 py-6">
        <main className="flex-1 p-4 sm:p-8">
          <h1 className="text-4xl font-bold mb-6 text-green-600">
            Profile & Settings
          </h1>

          <div className="bg-white shadow-md rounded-xl p-6 sm:p-8 border border-gray-200 max-w-full sm:max-w-xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-gray-600 border-b pb-2">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 gap-4 mb-6">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-medium text-gray-600">Library Name</span>
                <span className="text-gray-800">{user.libraryName}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-medium text-gray-600">Email</span>
                <span className="text-gray-800">{user.email}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-medium text-gray-600">Phone</span>
                <span className="text-gray-800">{user.phone}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-medium text-gray-600">Address</span>
                <span className="text-gray-800">{user.address}</span>
              </div>
            </div>

            <h2 className="text-2xl font-semibold mb-4 text-green-600 border-b pb-2">
              Settings
            </h2>
            <form className="flex flex-col gap-4">
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm password"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600"
                />
              </div>

              <button
                type="submit"
                className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold mt-2 w-full sm:w-auto"
              >
                Update Password
              </button>
            </form>
          </div>
        </main>
      </div>
      <div className="bg-white border-t border-gray-200 p-4 text-center text-sm text-gray-500">
        &copy; 2024 LibraryMS. All rights reserved.
      </div>
    </div>
  );
}
