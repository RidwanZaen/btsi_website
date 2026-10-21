import { useState } from "react";
import { useClients } from "../context/ClientsContext";
import Logo from "../components/Logo";
import ClientFormModal from "../components/ClientFormModal";

export default function AdminDashboard() {
  const { clients, addClient, updateClient, deleteClient } = useClients();
  const [modal, setModal] = useState(null); // null | { client: null } | { client: {...} }

  const handleSave = (data) => {
    if (modal.client) updateClient(modal.client.id, data);
    else addClient(data);
    setModal(null);
  };

  const handleDelete = (client) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      deleteClient(client.id);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy">Admin Dashboard</h1>
          <p className="text-sm text-slate-600">
            {clients.filter((c) => c.category === "Customer").length} customer,{" "}
            {clients.filter((c) => c.category === "Partner").length} partner
          </p>
        </div>
        <button
          onClick={() => setModal({ client: null })}
          className="rounded-md bg-sea px-5 py-2.5 font-semibold text-white hover:bg-navy"
        >
          Add New
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-navy text-white">
            <tr>
              <th className="px-4 py-3 font-semibold">ID</th>
              <th className="px-4 py-3 font-semibold">Logo</th>
              <th className="px-4 py-3 font-semibold">Nama Perusahaan</th>
              <th className="px-4 py-3 font-semibold">Kategori</th>
              <th className="px-4 py-3 text-right font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {clients.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-slate-500">
                  Belum ada data. Klik "Add New" untuk menambah.
                </td>
              </tr>
            )}
            {clients.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50">
                <td className="max-w-32 truncate px-4 py-3 font-mono text-xs text-slate-500">{c.id}</td>
                <td className="px-4 py-3"><Logo name={c.name} logoUrl={c.logoUrl} className="h-10 w-10" /></td>
                <td className="px-4 py-3 font-semibold">{c.name}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      c.category === "Customer" ? "bg-sea/10 text-sea" : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {c.category}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => setModal({ client: c })} className="mr-2 rounded-md border border-slate-300 px-3 py-1.5 font-semibold hover:bg-slate-100">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(c)} className="rounded-md border border-red-300 px-3 py-1.5 font-semibold text-red-600 hover:bg-red-50">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <ClientFormModal
          key={modal.client?.id ?? "new"}
          client={modal.client}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
