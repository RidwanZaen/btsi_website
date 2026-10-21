import { useClients } from "../context/ClientsContext";
import Logo from "./Logo";

// Ticker horizontal tanpa henti; berhenti saat kursor di atasnya.
function CustomerMarquee({ items }) {
  if (items.length === 0) {
    return <p className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500">Belum ada data.</p>;
  }
  // Ulangi daftar agar lebar track selalu melebihi layar walau datanya sedikit.
  const base = Array.from({ length: Math.ceil(8 / items.length) }, () => items).flat();

  return (
    <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] motion-reduce:overflow-x-auto">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex flex-none">
            {base.map((c, i) => (
              <li
                key={`${c.id}-${i}`}
                className="mr-6 flex h-24 w-56 flex-none items-center justify-center rounded-xl border border-slate-200 bg-white px-5 opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
              >
                <Logo name={c.name} logoUrl={c.logoUrl} layout="row" className="h-10 w-10" imageClassName="h-12 w-40" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

function PartnerGrid({ items }) {
  if (items.length === 0) {
    return <p className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500">Belum ada data.</p>;
  }
  return (
    <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((c) => (
        <li
          key={c.id}
          className="group flex h-36 items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:scale-105 hover:border-teal/60 hover:shadow-xl"
        >
          <div className="opacity-80 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0">
            <Logo name={c.name} logoUrl={c.logoUrl} layout="col" className="h-10 w-10" imageClassName="h-14 w-40" />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function ClientPartnerSection() {
  const { clients } = useClients();
  const customers = clients.filter((c) => c.category === "Customer");
  const partners = clients.filter((c) => c.category === "Partner");

  return (
    <>
      <section className="bg-slate-50 py-20" aria-labelledby="customers-title">
        <div className="mx-auto mb-10 max-w-6xl px-6">
          <h2 id="customers-title" className="text-3xl font-extrabold text-navy">Our Customers</h2>
          <p className="mt-2 text-slate-600">{customers.length} institusi yang mempercayakan keamanan dan infrastrukturnya kepada kami.</p>
        </div>
        <CustomerMarquee items={customers} />
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20" aria-labelledby="partners-title">
        <h2 id="partners-title" className="text-3xl font-extrabold text-navy">Our Partners</h2>
        <p className="mb-10 mt-2 text-slate-600">{partners.length} mitra teknologi dan konsultasi yang mendukung solusi kami.</p>
        <PartnerGrid items={partners} />
      </section>
    </>
  );
}
