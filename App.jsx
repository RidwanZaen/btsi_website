import { useEffect } from "react";
import { Navigate, NavLink, Route, Routes, useLocation } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import CustomersPartnersPage from "./pages/CustomersPartnersPage";
import HomePage from "./pages/HomePage";
import { COMPANY } from "./data/content";

const linkClass = ({ isActive }) =>
  `rounded-full px-4 py-2 text-sm font-semibold transition ${
    isActive ? "bg-teal text-navy" : "text-slate-300 hover:bg-white/10 hover:text-white"
  }`;

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy/90 text-white backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <NavLink to="/" className="flex items-center gap-2 text-lg font-extrabold">
          <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none" aria-hidden="true">
            <rect width="32" height="32" rx="8" fill="#0B5CA8" />
            <path d="M4 18c4-6 7-6 10 0s6 6 10 0 4-3 4-3" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
            <path d="M4 24c4-5 7-5 10 0s6 5 10 0 4-3 4-3" stroke="#14B8C4" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
          BTSI
        </NavLink>
        <nav className="flex gap-1" aria-label="Navigasi utama">
          <NavLink to="/" end className={linkClass}>Home</NavLink>
          <NavLink to="/customers-partners" className={linkClass}>
            <span className="sm:hidden">Clients</span>
            <span className="hidden sm:inline">Customers &amp; Partners</span>
          </NavLink>
          <NavLink to="/admin" className={linkClass}>Admin</NavLink>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-navy py-10 text-sm text-slate-400">
      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-6 px-6">
        <div className="max-w-md">
          <p className="font-bold text-white">{COMPANY.name}</p>
          <p className="mt-2">{COMPANY.address}</p>
        </div>
        <a href={`https://${COMPANY.website}`} className="font-semibold text-teal hover:text-white">{COMPANY.website}</a>
      </div>
    </footer>
  );
}

export default function App() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 antialiased">
      <Header />
      {/* key berubah tiap pindah halaman, sehingga animasi masuk diputar ulang */}
      <main key={pathname} className="animate-page-in motion-reduce:animate-none">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/customers-partners" element={<CustomersPartnersPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
