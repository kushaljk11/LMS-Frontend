import { useState, useEffect } from "react";
import api from "../../config/config.js";

function BorrowerForm({ modelBorrowerForm, fetchBorrowers, editBorrower }) {
  const [name, setName] = useState(editBorrower?.name || "");
  const [email, setEmail] = useState(editBorrower?.email || "");
  const [phone, setPhone] = useState(editBorrower?.phone || "");
  const [status, setStatus] = useState(editBorrower?.status || "active");
  const [role, setRole] = useState(editBorrower?.role || "Borrower");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editBorrower) {
      setName(editBorrower.name || "");
      setEmail(editBorrower.email || "");
      setPhone(editBorrower.phone || "");
      setStatus(editBorrower.status || "active");
      setRole(editBorrower.role || "Borrower");
  setPassword("");
    }
  }, [editBorrower]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (editBorrower) {
        await api.put(`/register/${editBorrower._id}`, { name, email, phone, status, role });
      } else {
        if (!password) {
          setError("Password is required for new users");
          setLoading(false);
          return;
        }
        await api.post("/register", { name, email, phone, status, role, password });
      }

      fetchBorrowers();
      modelBorrowerForm(false);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}

      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input type="text" className="w-full border p-2 rounded-lg" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input type="email" className="w-full border p-2 rounded-lg" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Phone</label>
        <input type="text" className="w-full border p-2 rounded-lg" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Status</label>
        <select className="w-full border p-2 rounded-lg" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Role</label>
        <select className="w-full border p-2 rounded-lg" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="Borrower">Borrower</option>
          <option value="Librarian">Librarian</option>
        </select>
      </div>

      {!editBorrower && (
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input type="password" className="w-full border p-2 rounded-lg" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-end gap-2">
        <button type="button" onClick={() => modelBorrowerForm(false)} className="w-full sm:w-auto px-4 py-2 border rounded-lg">Cancel</button>
        <button type="submit" className="w-full sm:w-auto px-4 py-2 bg-black text-white rounded-lg" disabled={loading}>
          {editBorrower ? "Update" : "Add"} Borrower
        </button>
      </div>
    </form>
  );
}

export default BorrowerForm;
