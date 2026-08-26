"use client";

import { useState, useEffect } from "react";

type HikerStatus = "BELUM_CHECK_IN" | "SEDANG_MENDAKI" | "SELESAI_MENDAKI";

export default function PemantauanPage() {
  const [filter, setFilter] = useState<"SEMUA" | HikerStatus>("SEMUA");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedHiker, setSelectedHiker] = useState<any | null>(null);
  
  const [hikers, setHikers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPemantauan();
  }, []);

  async function fetchPemantauan() {
    setLoading(true);
    try {
      const token = localStorage.getItem("campss_admin_token") || sessionStorage.getItem("campss_admin_token") || localStorage.getItem("campss_access_token") || sessionStorage.getItem("campss_access_token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/pemantauan`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const json = await res.json();
        setHikers(json.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleManualCheckIn = async (hash: string) => {
    try {
      const token = localStorage.getItem("campss_admin_token") || sessionStorage.getItem("campss_admin_token") || localStorage.getItem("campss_access_token") || sessionStorage.getItem("campss_access_token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/monitoring/checkin/${hash}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setSelectedHiker(null);
        fetchPemantauan();
      } else {
        alert("Gagal Check-In");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleManualCheckOut = async (hash: string) => {
    try {
      const token = localStorage.getItem("campss_admin_token") || sessionStorage.getItem("campss_admin_token") || localStorage.getItem("campss_access_token") || sessionStorage.getItem("campss_access_token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/monitoring/checkout/${hash}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setSelectedHiker(null);
        fetchPemantauan();
      } else {
        alert("Gagal Check-Out");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredHikers = hikers.filter((h) => {
    const matchFilter = filter === "SEMUA" || h.status === filter;
    const matchSearch =
      h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.ticketId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchFilter && matchSearch;
  });

  const countBelum = hikers.filter(h => h.status === "BELUM_CHECK_IN").reduce((sum, h) => sum + (parseInt(h.groupSize) || 0), 0);
  const countSedang = hikers.filter(h => h.status === "SEDANG_MENDAKI").reduce((sum, h) => sum + (parseInt(h.groupSize) || 0), 0);
  const countSelesai = hikers.filter(h => h.status === "SELESAI_MENDAKI").reduce((sum, h) => sum + (parseInt(h.groupSize) || 0), 0);

  return (
    <div className="p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-[#073d2b]">Pemantauan Pendaki</h1>
        <p className="mt-1 text-sm text-gray-500">Monitor status pergerakan pendaki secara real-time.</p>
      </header>

      <div className="mb-8 grid gap-5 sm:grid-cols-3">
        <StatCard title="Belum Check-in" value={countBelum} description="Telah bayar, belum naik" icon="🕒" />
        <StatCard title="Sedang Mendaki" value={countSedang} description="Di dalam kawasan" icon="🚶‍♂️" />
        <StatCard title="Selesai Mendaki" value={countSelesai} description="Telah check-out" icon="✅" />
      </div>

      <section className="rounded-2xl border border-[#dfe9e4] bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
        <div className="flex flex-col gap-5 border-b border-gray-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            <FilterButton active={filter === "SEMUA"} label="Semua Status" onClick={() => setFilter("SEMUA")} />
            <FilterButton active={filter === "BELUM_CHECK_IN"} label="Belum Check-in" onClick={() => setFilter("BELUM_CHECK_IN")} />
            <FilterButton active={filter === "SEDANG_MENDAKI"} label="Sedang Mendaki" onClick={() => setFilter("SEDANG_MENDAKI")} />
            <FilterButton active={filter === "SELESAI_MENDAKI"} label="Selesai Mendaki" onClick={() => setFilter("SELESAI_MENDAKI")} />
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Cari nama atau ID tiket..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#073d2b] focus:bg-white sm:w-64"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          </div>
        </div>

        <div className="mt-5">
          {loading ? (
            <p className="text-center text-sm py-10 text-gray-500">Memuat data...</p>
          ) : filteredHikers.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredHikers.map((hiker) => (
                <div
                  key={hiker.id}
                  onClick={() => setSelectedHiker(hiker)}
                  className="group cursor-pointer rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:border-[#17634a] hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f4faf7] text-sm font-bold text-[#17634a]">
                        {getInitials(hiker.name)}
                      </div>
                      <div>
                        <p className="font-bold text-[#073d2b]">{hiker.name}</p>
                        <p className="text-[10px] text-gray-400">ID: {hiker.ticketId}</p>
                      </div>
                    </div>
                    <StatusBadge status={hiker.status} />
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-4 border-t border-gray-50 pt-4">
                    <div>
                      <p className="text-[10px] text-gray-400">Tanggal Naik</p>
                      <p className="mt-1 text-xs font-semibold text-[#073d2b]">{hiker.date}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400">Jumlah Pendaki</p>
                      <p className="mt-1 text-xs font-semibold text-[#073d2b]">{hiker.groupSize} orang</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-50 text-2xl text-gray-400">🚷</div>
              <p className="mt-4 font-bold text-gray-700">Pendaki tidak ditemukan</p>
              <p className="mt-1 text-xs text-gray-400">Coba gunakan kata kunci pencarian lain.</p>
            </div>
          )}
        </div>
      </section>

      {/* DETAIL MODAL */}
      {selectedHiker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#03241a]/50 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 p-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#17634a]">Detail Pendaki</p>
                <h2 className="mt-1 text-lg font-bold text-[#073d2b]">{selectedHiker.name}</h2>
              </div>
              <button onClick={() => setSelectedHiker(null)} className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-50 text-gray-500 hover:bg-gray-100">×</button>
            </div>
            <div className="p-6">
              <div className="rounded-xl bg-[#f7faf8] p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-gray-400">Status Saat Ini</p>
                    <div className="mt-2"><StatusBadge status={selectedHiker.status} /></div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-gray-400">ID E-Tiket</p>
                    <p className="mt-1 font-mono text-[10px] font-bold text-[#073d2b]">{selectedHiker.ticketId}</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 divide-y divide-gray-100 rounded-xl border border-gray-100">
                <DetailRow label="Nama Lengkap" value={selectedHiker.name} />
                <DetailRow label="Nomor Telepon" value={selectedHiker.phone} />
                <DetailRow label="Tanggal Pendakian" value={selectedHiker.date} />
                <DetailRow label="Jumlah Pendaki" value={`${selectedHiker.groupSize} orang`} />
                <DetailRow label="Waktu Check-in" value={selectedHiker.checkIn || "Belum check-in"} />
                <DetailRow label="Waktu Check-out" value={selectedHiker.checkOut || "Belum check-out"} />
                <DetailRow label="Kontak Darurat" value={selectedHiker.emergencyContact} />
              </div>

              {selectedHiker.status === "BELUM_CHECK_IN" && (
                <button
                  onClick={() => handleManualCheckIn(selectedHiker.qr_code_hash)}
                  className="mt-5 w-full rounded-xl bg-[#073d2b] px-5 py-3.5 text-sm font-bold text-white hover:bg-[#052f22]"
                >
                  Konfirmasi Check-in
                </button>
              )}
              {selectedHiker.status === "SEDANG_MENDAKI" && (
                <button
                  onClick={() => handleManualCheckOut(selectedHiker.qr_code_hash)}
                  className="mt-5 w-full rounded-xl bg-amber-600 px-5 py-3.5 text-sm font-bold text-white hover:bg-amber-700"
                >
                  Konfirmasi Check-out
                </button>
              )}
              {selectedHiker.status === "SELESAI_MENDAKI" && (
                <div className="mt-5 rounded-xl bg-emerald-50 p-4 text-center">
                  <p className="text-sm font-bold text-emerald-700">Pendakian Selesai</p>
                  <p className="mt-1 text-xs text-emerald-600">Pendaki telah kembali ke basecamp.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, description, icon }: { title: string; value: number; description: string; icon: string; }) {
  return (
    <div className="rounded-2xl border border-[#dfe9e4] bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500">{title}</p>
          <p className="mt-3 text-3xl font-bold tracking-tight text-[#073d2b]">{value}</p>
          <p className="mt-1 text-[10px] text-gray-400">{description}</p>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f4ee] text-lg text-[#17634a]">{icon}</div>
      </div>
    </div>
  );
}

function FilterButton({ active, label, onClick }: { active: boolean; label: string; onClick: () => void; }) {
  return (
    <button onClick={onClick} className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-xs font-semibold transition ${active ? "bg-[#073d2b] text-white" : "border border-gray-200 bg-white text-gray-500 hover:bg-gray-50"}`}>
      {label}
    </button>
  );
}

function StatusBadge({ status }: { status: string; }) {
  const config = {
    BELUM_CHECK_IN: { label: "Belum Check-in", className: "bg-gray-100 text-gray-600", dot: "bg-gray-400" },
    SEDANG_MENDAKI: { label: "Sedang Mendaki", className: "bg-amber-100 text-amber-700", dot: "bg-amber-500" },
    SELESAI_MENDAKI: { label: "Selesai Mendaki", className: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500" },
  } as any;
  const item = config[status] || config["BELUM_CHECK_IN"];
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-bold ${item.className}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${item.dot}`} />
      {item.label}
    </span>
  );
}

function DetailRow({ label, value }: { label: string; value: string; }) {
  return (
    <div className="flex items-start justify-between gap-5 px-4 py-4">
      <span className="text-xs text-gray-500">{label}</span>
      <span className="max-w-[60%] text-right text-xs font-semibold leading-5 text-[#073d2b]">{value}</span>
    </div>
  );
}

function getInitials(name: string) {
  return name.split(" ").slice(0, 2).map((word) => word[0]).join("").toUpperCase();
}
