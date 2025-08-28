import React, { useState } from "react";
import api from "../../config/config.js";

/**
 * Bookform.jsx
 * Props:
 * - modelForm: state setter to open/close modal (setModelForm)
 * - fetchBooks: optional callback to reload book list after creation
 */
export default function Bookform({ modelForm, fetchBooks }) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    quantity: 1,
    availableBooks: 1,
    category: "",
    publishedYear: new Date().getFullYear(),
  });
  const [loading, setLoading] = useState(false);

  const closeModal = () => modelForm(false);

  
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        ["quantity", "availableBooks", "publishedYear"].includes(name)
          ? Number(value) || ""
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.author || !formData.isbn) {
      alert("Please fill in Title, Author and ISBN.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/book", formData);
      console.log("Book created:", res.data);

      if (fetchBooks) await fetchBooks();

      alert("Book created successfully!");
      closeModal();
    } catch (err) {
      console.error("Create book error:", err);
      alert(err.response?.data?.message || "Failed to create book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={closeModal} />

  <div className="bg-white rounded-lg shadow-lg w-full max-w-xl mx-4 z-10 p-4 sm:p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Book</h2>
          <button onClick={closeModal} className="px-3 py-1 border rounded">
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
              className="border p-2 rounded"
              required
            />
            <input
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Author"
              className="border p-2 rounded"
              required
            />
            <input
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              placeholder="ISBN"
              className="border p-2 rounded"
              required
            />
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
              className="border p-2 rounded"
            />
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Quantity"
              className="border p-2 rounded"
              min={0}
            />
            <input
              type="number"
              name="availableBooks"
              value={formData.availableBooks}
              onChange={handleChange}
              placeholder="Available Books"
              className="border p-2 rounded"
              min={0}
            />
            <input
              type="number"
              name="publishedYear"
              value={formData.publishedYear}
              onChange={handleChange}
              placeholder="Published Year"
              className="border p-2 rounded"
              min={0}
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={closeModal}
              className="w-full sm:w-auto px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              {loading ? "Adding..." : "Add Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
