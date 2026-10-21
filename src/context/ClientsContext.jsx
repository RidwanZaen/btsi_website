import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { initialClients } from "../data/initialData";

const ClientsContext = createContext(null);

export function ClientsProvider({ children }) {
  const [clients, setClients] = useState(initialClients);

  const addClient = useCallback((data) => {
    setClients((prev) => [...prev, { id: crypto.randomUUID(), ...data }]);
  }, []);

  const updateClient = useCallback((id, data) => {
    setClients((prev) => prev.map((c) => (c.id === id ? { ...c, ...data } : c)));
  }, []);

  const deleteClient = useCallback((id) => {
    setClients((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const value = useMemo(
    () => ({ clients, addClient, updateClient, deleteClient }),
    [clients, addClient, updateClient, deleteClient]
  );

  return <ClientsContext.Provider value={value}>{children}</ClientsContext.Provider>;
}

export function useClients() {
  const ctx = useContext(ClientsContext);
  if (!ctx) throw new Error("useClients harus dipakai di dalam ClientsProvider");
  return ctx;
}
