"use client";

import { useMemo, useState } from "react";

type HikerStatus =
  | "BELUM_CHECK_IN"
  | "SEDANG_MENDAKI"
  | "SELESAI_MENDAKI";

type Hiker = {
  id: number;
  ticketId: string;
  name: string;
  phone: string;
  date: string;
  groupSize: number;
  status: HikerStatus;
  checkIn: string | null;
  checkOut: string | null;
  emergencyContact: string;
};

const initialHikers: Hiker[] = [
  {
    id: 1,
    ticketId: "CAMPSS-20260812-001",
    name: "Andi Saputra",
    phone: "081234567890",
    date: "12 Agustus 2026",
    groupSize: 2,
    status: "SEDANG_MENDAKI",
    checkIn: "07:32 WIB",
    checkOut: null,
    emergencyContact: "Budi Saputra - 081234567891",
  },
  {
    id: 2,
    ticketId: "CAMPSS-20260812-002",
    name: "Siti Rahma",
    phone: "081298765432",
    date: "12 Agustus 2026",
    groupSize: 1,
    status: "BELUM_CHECK_IN",
    checkIn: null,
    checkOut: null,
    emergencyContact: "Rina Rahma - 081298765433",
  },
  {
    id: 3,
    ticketId: "CAMPSS-20260812-003",
    name: "Fajar Nugroho",
    phone: "082112345678",
    date: "12 Agustus 2026",
    groupSize: 4,
    status: "SELESAI_MENDAKI",
    checkIn: "06:48 WIB",
    checkOut: "14:21 WIB",
    emergencyContact: "Dimas Nugroho - 082112345679",
  },
  {
    id: 4,
    ticketId: "CAMPSS-20260812-004",
    name: "Rizky Pratama",
    phone: "083812345678",
    date: "12 Agustus 2026",
    groupSize: 3,
    status: "SEDANG_MENDAKI",
    checkIn: "08:05 WIB",
    checkOut: null,
    emergencyContact: "Agus Pratama - 083812345679",
  },
  {
    id: 5,
    ticketId: "CAMPSS-20260812-005",
    name: "Dewi Lestari",
    phone: "085712345678",
    date: "12 Agustus 2026",
    groupSize: 2,
    status: "BELUM_CHECK_IN",
    checkIn: null,
    checkOut: null,
    emergencyContact: "Sari Lestari - 085712345679",
  },
  {
    id: 6,
    ticketId: "CAMPSS-20260812-006",
    name: "Yoga Prasetyo",
    phone: "087812345678",
    date: "12 Agustus 2026",
    groupSize: 5,
    status: "SEDANG_MENDAKI",
    checkIn: "08:17 WIB",
    checkOut: null,
    emergencyContact: "Arif Prasetyo - 087812345679",
  },
];

export default function PemantauanPage() {
  const [hikers, setHikers] = useState(initialHikers);
  const [filter, setFilter] = useState<"SEMUA" | HikerStatus>("SEMUA");
  const [search, setSearch] = useState("");
  const [selectedHiker, setSelectedHiker] = useState<Hiker | null>(null);

  const statistics = useMemo(() => {
    return {
      total: hikers.length,
      belum: hikers.filter(
        (item) => item.status === "BELUM_CHECK_IN"
      ).length,
      mendaki: hikers.filter(
        (item) => item.status === "SEDANG_MENDAKI"
      ).length,
      selesai: hikers.filter(
        (item) => item.status === "SELESAI_MENDAKI"
      ).length,
    };
  }, [hikers]);

  const filteredHikers = useMemo(() => {
    return hikers.filter((hiker) => {
      const matchesFilter =
        filter === "SEMUA" || hiker.status === filter;

      const keyword = search.toLowerCase();

      const matchesSearch =
        hiker.name.toLowerCase().includes(keyword) ||
        hiker.ticketId.toLowerCase().includes(keyword) ||
        hiker.phone.includes(keyword);

      return matchesFilter && matchesSearch;
    });
  }, [hikers, filter, search]);

  function handleManualCheckIn(id: number) {
    setHikers((current) =>
      current.map((hiker) =>
        hiker.id === id
          ? {
              ...hiker,
              status: "SEDANG_MENDAKI",
              checkIn: "Sekarang",
            }
          : hiker
      )
    );

    setSelectedHiker(null);
  }

  function handleManualCheckOut(id: number) {
    setHikers((current) =>
      current.map((hiker) =>
        hiker.id === id
          ? {
              ...hiker,
              status: "SELESAI_MENDAKI",
              checkOut: "Sekarang",
            }
          : hiker
      )
    );

    setSelectedHiker(null);
  }

  return (
    <div className="px-5 py-7 md:px-8 md:py-9">

      {/* HEADER */}
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

        <div>
          <p className="text-sm font-semibold text-[#17634a]">
            Monitoring Pendakian
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#073d2b] md:text-3xl">
            Pemantauan Pendaki
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
            Pantau status pendaki yang melakukan pendakian
            Gunung Prau via Campurejo.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2">

          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />

          <span className="text-xs font-semibold text-emerald-700">
            Monitoring Aktif
          </span>

        </div>

      </div>

      {/* STATISTICS */}
      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Pendaki"
          value={statistics.total}
          description="hari ini"
          icon="◉"
        />

        <StatCard
          title="Belum Check-in"
          value={statistics.belum}
          description="belum memasuki jalur"
          icon="○"
        />

        <StatCard
          title="Sedang Mendaki"
          value={statistics.mendaki}
          description="masih berada di jalur"
          icon="⌁"
        />

        <StatCard
          title="Sudah Kembali"
          value={statistics.selesai}
          description="pendakian selesai"
          icon="✓"
        />

      </div>

      {/* MAIN */}
      <section className="mt-6 rounded-2xl border border-[#dfe9e4] bg-white shadow-sm">

        {/* TOOLBAR */}
        <div className="border-b border-[#edf1ef] p-5 md:p-6">

          <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">

            <div>
              <h2 className="font-bold text-[#073d2b]">
                Daftar Pendaki
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                Data pendaki berdasarkan status pendakian.
              </p>
            </div>

            <div className="relative w-full xl:w-[300px]">

              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                ⌕
              </span>

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Cari nama atau ID tiket..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-9 pr-4 text-xs outline-none transition focus:border-[#17634a] focus:bg-white"
              />

            </div>

          </div>

          {/* FILTER */}
          <div className="mt-5 flex gap-2 overflow-x-auto pb-1">

            <FilterButton
              active={filter === "SEMUA"}
              onClick={() => setFilter("SEMUA")}
              label={`Semua (${statistics.total})`}
            />

            <FilterButton
              active={filter === "BELUM_CHECK_IN"}
              onClick={() => setFilter("BELUM_CHECK_IN")}
              label={`Belum Check-in (${statistics.belum})`}
            />

            <FilterButton
              active={filter === "SEDANG_MENDAKI"}
              onClick={() => setFilter("SEDANG_MENDAKI")}
              label={`Sedang Mendaki (${statistics.mendaki})`}
            />

            <FilterButton
              active={filter === "SELESAI_MENDAKI"}
              onClick={() => setFilter("SELESAI_MENDAKI")}
              label={`Selesai (${statistics.selesai})`}
            />

          </div>

        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">

          <table className="w-full min-w-[850px]">

            <thead>
              <tr className="border-b border-[#edf1ef] bg-[#f8faf9]">

                <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Pendaki
                </th>

                <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  ID E-Tiket
                </th>

                <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Jumlah
                </th>

                <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Check-in
                </th>

                <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Check-out
                </th>

                <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Aksi
                </th>

              </tr>
            </thead>

            <tbody>

              {filteredHikers.map((hiker) => (

                <tr
                  key={hiker.id}
                  className="border-b border-[#f0f3f1] transition hover:bg-[#fafcfb]"
                >

                  {/* NAME */}
                  <td className="px-6 py-5">

                    <div className="flex items-center gap-3">

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e8f4ee] text-xs font-bold text-[#17634a]">
                        {getInitials(hiker.name)}
                      </div>

                      <div>

                        <p className="text-xs font-bold text-[#073d2b]">
                          {hiker.name}
                        </p>

                        <p className="mt-1 text-[10px] text-gray-400">
                          {hiker.phone}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* TICKET */}
                  <td className="px-6 py-5">

                    <span className="rounded-lg bg-gray-50 px-2.5 py-1.5 font-mono text-[10px] font-semibold text-gray-600">
                      {hiker.ticketId}
                    </span>

                  </td>

                  {/* GROUP */}
                  <td className="px-6 py-5">

                    <span className="text-xs font-semibold text-[#073d2b]">
                      {hiker.groupSize} orang
                    </span>

                  </td>

                  {/* CHECK IN */}
                  <td className="px-6 py-5">

                    {hiker.checkIn ? (
                      <span className="text-xs font-medium text-gray-600">
                        {hiker.checkIn}
                      </span>
                    ) : (
                      <span className="text-xs text-gray-300">
                        —
                      </span>
                    )}

                  </td>

                  {/* CHECK OUT */}
                  <td className="px-6 py-5">

                    {hiker.checkOut ? (
                      <span className="text-xs font-medium text-gray-600">
                        {hiker.checkOut}
                      </span>
                    ) : (
                      <span className="text-xs text-gray-300">
                        —
                      </span>
                    )}

                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-5">
                    <StatusBadge status={hiker.status} />
                  </td>

                  {/* ACTION */}
                  <td className="px-6 py-5 text-right">

                    <button
                      onClick={() => setSelectedHiker(hiker)}
                      className="rounded-lg border border-gray-200 px-3 py-2 text-[10px] font-bold text-gray-600 transition hover:border-[#bcd9cb] hover:bg-[#f7fbf9] hover:text-[#17634a]"
                    >
                      Detail
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          {filteredHikers.length === 0 && (

            <div className="px-6 py-16 text-center">

              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 text-gray-400">
                ⌕
              </div>

              <p className="mt-4 text-sm font-bold text-[#073d2b]">
                Pendaki tidak ditemukan
              </p>

              <p className="mt-1 text-xs text-gray-400">
                Coba gunakan kata kunci pencarian lain.
              </p>

            </div>

          )}

        </div>

      </section>

      {/* INFO */}
      <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-4">

        <div className="flex gap-3">

          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">
            i
          </div>

          <div>

            <p className="text-xs font-bold text-blue-800">
              Pemantauan Pendaki
            </p>

            <p className="mt-1 text-xs leading-5 text-blue-700">
              Gunakan data ini untuk memastikan seluruh
              pendaki yang telah check-in terpantau hingga
              melakukan check-out di basecamp.
            </p>

          </div>

        </div>

      </div>

      {/* DETAIL MODAL */}
      {selectedHiker && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#03241a]/50 p-4 backdrop-blur-sm">

          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl">

            {/* MODAL HEADER */}
            <div className="flex items-center justify-between border-b border-gray-100 p-6">

              <div>

                <p className="text-[10px] font-bold uppercase tracking-wider text-[#17634a]">
                  Detail Pendaki
                </p>

                <h2 className="mt-1 text-lg font-bold text-[#073d2b]">
                  {selectedHiker.name}
                </h2>

              </div>

              <button
                onClick={() => setSelectedHiker(null)}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-50 text-gray-500 hover:bg-gray-100"
              >
                ×
              </button>

            </div>

            {/* MODAL CONTENT */}
            <div className="p-6">

              <div className="rounded-xl bg-[#f7faf8] p-4">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-[10px] text-gray-400">
                      Status Saat Ini
                    </p>

                    <div className="mt-2">
                      <StatusBadge
                        status={selectedHiker.status}
                      />
                    </div>

                  </div>

                  <div className="text-right">

                    <p className="text-[10px] text-gray-400">
                      ID E-Tiket
                    </p>

                    <p className="mt-1 font-mono text-[10px] font-bold text-[#073d2b]">
                      {selectedHiker.ticketId}
                    </p>

                  </div>

                </div>

              </div>

              <div className="mt-5 divide-y divide-gray-100 rounded-xl border border-gray-100">

                <DetailRow
                  label="Nama Lengkap"
                  value={selectedHiker.name}
                />

                <DetailRow
                  label="Nomor Telepon"
                  value={selectedHiker.phone}
                />

                <DetailRow
                  label="Tanggal Pendakian"
                  value={selectedHiker.date}
                />

                <DetailRow
                  label="Jumlah Pendaki"
                  value={`${selectedHiker.groupSize} orang`}
                />

                <DetailRow
                  label="Waktu Check-in"
                  value={selectedHiker.checkIn || "Belum check-in"}
                />

                <DetailRow
                  label="Waktu Check-out"
                  value={selectedHiker.checkOut || "Belum check-out"}
                />

                <DetailRow
                  label="Kontak Darurat"
                  value={selectedHiker.emergencyContact}
                />

              </div>

              {/* ACTION */}
              {selectedHiker.status === "BELUM_CHECK_IN" && (

                <button
                  onClick={() =>
                    handleManualCheckIn(selectedHiker.id)
                  }
                  className="mt-5 w-full rounded-xl bg-[#073d2b] px-5 py-3.5 text-sm font-bold text-white hover:bg-[#052f22]"
                >
                  Konfirmasi Check-in
                </button>

              )}

              {selectedHiker.status === "SEDANG_MENDAKI" && (

                <button
                  onClick={() =>
                    handleManualCheckOut(selectedHiker.id)
                  }
                  className="mt-5 w-full rounded-xl bg-amber-600 px-5 py-3.5 text-sm font-bold text-white hover:bg-amber-700"
                >
                  Konfirmasi Check-out
                </button>

              )}

              {selectedHiker.status === "SELESAI_MENDAKI" && (

                <div className="mt-5 rounded-xl bg-emerald-50 p-4 text-center">

                  <p className="text-sm font-bold text-emerald-700">
                    Pendakian Selesai
                  </p>

                  <p className="mt-1 text-xs text-emerald-600">
                    Pendaki telah kembali ke basecamp.
                  </p>

                </div>

              )}

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

/* =========================
   COMPONENTS
========================= */

function StatCard({
  title,
  value,
  description,
  icon,
}: {
  title: string;
  value: number;
  description: string;
  icon: string;
}) {
  return (
    <div className="rounded-2xl border border-[#dfe9e4] bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-xs font-medium text-gray-500">
            {title}
          </p>

          <p className="mt-3 text-3xl font-bold tracking-tight text-[#073d2b]">
            {value}
          </p>

          <p className="mt-1 text-[10px] text-gray-400">
            {description}
          </p>

        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f4ee] text-lg text-[#17634a]">
          {icon}
        </div>

      </div>

    </div>
  );
}

function FilterButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-xs font-semibold transition ${
        active
          ? "bg-[#073d2b] text-white"
          : "border border-gray-200 bg-white text-gray-500 hover:bg-gray-50"
      }`}
    >
      {label}
    </button>
  );
}

function StatusBadge({
  status,
}: {
  status: HikerStatus;
}) {
  const config = {
    BELUM_CHECK_IN: {
      label: "Belum Check-in",
      className: "bg-gray-100 text-gray-600",
      dot: "bg-gray-400",
    },

    SEDANG_MENDAKI: {
      label: "Sedang Mendaki",
      className: "bg-amber-100 text-amber-700",
      dot: "bg-amber-500",
    },

    SELESAI_MENDAKI: {
      label: "Selesai Mendaki",
      className: "bg-emerald-100 text-emerald-700",
      dot: "bg-emerald-500",
    },
  };

  const item = config[status];

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-bold ${item.className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${item.dot}`} />
      {item.label}
    </span>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-5 px-4 py-4">

      <span className="text-xs text-gray-500">
        {label}
      </span>

      <span className="max-w-[60%] text-right text-xs font-semibold leading-5 text-[#073d2b]">
        {value}
      </span>

    </div>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}