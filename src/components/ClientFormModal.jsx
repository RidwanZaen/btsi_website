import { useEffect, useState } from "react";
import { CATEGORIES } from "../data/initialData";

const inputClass =
  "w-full rounded-md border border-slate-300 px-3 py-2 focus:border-sea focus:outline-none focus:ring-2 focus:ring-sea/30";

// client = null -> mode tambah, client = {...} -> mode ubah
export default function ClientFormModal({ client, onSave, onClose }) {
  const [form, setForm] = useState({
    name: client?.name ?? "",
    category: client?.category ?? CATEGORIES[0],
    logoUrl: client?.logoUrl ?? "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = form.name.trim();
    if (!name) {
      setError("Nama perusahaan wajib diisi.");
      return;
    }
    onSave({ ...form, name, logoUrl: form.logoUrl.trim() });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 p-4"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <form
        onSubmit={handleSubmit}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
      >
        <h2 id="modal-title" className="mb-5 text-xl font-bold text-navy">
          {client ? "Edit Data" : "Add New"}
        </h2>

        <label htmlFor="name" className="mb-1 block text-sm font-semibold">Name</label>
        <input id="name" name="name" value={form.name} onChange={handleChange} autoFocus className={`${inputClass} mb-4`} />

        <label htmlFor="category" className="mb-1 block text-sm font-semibold">Category</label>
        <select id="category" name="category" value={form.category} onChange={handleChange} className={`${inputClass} mb-4`}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <label htmlFor="logoUrl" className="mb-1 block text-sm font-semibold">Logo URL</label>
        <input
          id="logoUrl"
          name="logoUrl"
          type="url"
          placeholder="https://... (boleh dikosongkan)"
          value={form.logoUrl}
          onChange={handleChange}
          className={inputClass}
        />
        <p className="mb-4 mt-1 text-xs text-slate-500">Jika kosong, tampil inisial nama perusahaan.</p>

        {error && <p role="alert" className="mb-3 text-sm text-red-600">{error}</p>}

        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose} className="rounded-md border border-slate-300 px-4 py-2 font-semibold hover:bg-slate-50">
            Cancel
          </button>
          <button type="submit" className="rounded-md bg-sea px-4 py-2 font-semibold text-white hover:bg-navy">
            {client ? "Save Changes" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
}
