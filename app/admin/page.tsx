"use client";

import Link from "next/link";

const stats = [
  {
    title: "Pendaki Hari Ini",
    value: "72",
    detail: "dari 100 kuota",
    icon: "◉",
  },
  {
    title: "Sisa Kuota",
    value: "28",
    detail: "orang tersedia",
    icon: "▣",
  },
  {
    title: "Menunggu Verifikasi",
    value: "5",
    detail: "pembayaran",
    icon: "◇",
  },
  {
    title: "Sedang Mendaki",
    value: "18",
    detail: "pendaki aktif",
    icon: "⌁",
  },
];

export default function AdminDashboard() {
  return (
    <div className="px-5 py-7 md:px-8 md:py-9">

      {/* PAGE HEADER */}
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

        <div>

          <p className="text-sm font-semibold text-[#17634a]">
            Selamat datang kembali
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#073d2b] md:text-3xl">
            Dashboard
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Pantau aktivitas pendakian Gunung Prau via Campurejo.
          </p>

        </div>

        <div className="rounded-xl border border-[#dfe9e4] bg-white px-4 py-3">

          <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
            Tanggal Operasional
          </p>

          <p className="mt-1 text-sm font-bold text-[#073d2b]">
            11 Agustus 2026
          </p>

        </div>

      </div>

      {/* STATISTICS */}
      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-2xl border border-[#dfe9e4] bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
          >

            <div className="flex items-start justify-between">

              <div>

                <p className="text-xs font-medium text-gray-500">
                  {stat.title}
                </p>

                <p className="mt-3 text-3xl font-bold tracking-tight text-[#073d2b]">
                  {stat.value}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  {stat.detail}
                </p>

              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f4ee] text-lg text-[#17634a]">
                {stat.icon}
              </div>

            </div>

          </div>
        ))}

      </div>

      {/* MAIN GRID */}
      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">

        {/* LEFT */}
        <div className="space-y-6">

          {/* QUOTA */}
          <section className="rounded-2xl border border-[#dfe9e4] bg-white p-6">

            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">

              <div>

                <p className="text-xs font-semibold uppercase tracking-wider text-[#17634a]">
                  Operasional Hari Ini
                </p>

                <h2 className="mt-2 text-lg font-bold text-[#073d2b]">
                  Kuota Pendakian
                </h2>

                <p className="mt-1 text-xs text-gray-400">
                  Jalur Pendakian Gunung Prau via Campurejo
                </p>

              </div>

              <Link
                href="/admin/kuota"
                className="text-xs font-bold text-[#17634a] hover:underline"
              >
                Kelola Kuota →
              </Link>

            </div>

            <div className="mt-7">

              <div className="flex items-end justify-between">

                <div>

                  <span className="text-4xl font-bold tracking-tight text-[#073d2b]">
                    72
                  </span>

                  <span className="ml-2 text-sm text-gray-400">
                    / 100 orang
                  </span>

                </div>

                <p className="text-sm font-bold text-[#17634a]">
                  72%
                </p>

              </div>

              <div className="mt-3 h-3 overflow-hidden rounded-full bg-[#edf3f0]">

                <div
                  className="h-full rounded-full bg-[#17634a]"
                  style={{ width: "72%" }}
                />

              </div>

              <div className="mt-4 grid grid-cols-3 divide-x rounded-xl bg-[#f7faf8] py-4">

                <div className="text-center">
                  <p className="text-lg font-bold text-[#073d2b]">
                    100
                  </p>
                  <p className="mt-1 text-[10px] text-gray-400">
                    Kuota Dibuka
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-lg font-bold text-[#073d2b]">
                    72
                  </p>
                  <p className="mt-1 text-[10px] text-gray-400">
                    Terisi
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-lg font-bold text-[#17634a]">
                    28
                  </p>
                  <p className="mt-1 text-[10px] text-gray-400">
                    Tersisa
                  </p>
                </div>

              </div>

            </div>

          </section>

          {/* HIKERS */}
          <section className="rounded-2xl border border-[#dfe9e4] bg-white p-6">

            <div className="flex items-start justify-between">

              <div>
                <h2 className="font-bold text-[#073d2b]">
                  Status Pendaki
                </h2>

                <p className="mt-1 text-xs text-gray-400">
                  Kondisi pendaki pada tanggal operasional hari ini
                </p>
              </div>

              <Link
                href="/admin/pemantauan"
                className="text-xs font-bold text-[#17634a] hover:underline"
              >
                Lihat Semua →
              </Link>

            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-3">

              <StatusCard
                label="Belum Check-in"
                value="49"
                description="pendaki"
                type="neutral"
              />

              <StatusCard
                label="Sedang Mendaki"
                value="18"
                description="pendaki aktif"
                type="warning"
              />

              <StatusCard
                label="Sudah Kembali"
                value="5"
                description="pendaki selesai"
                type="success"
              />

            </div>

          </section>

        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          {/* QUICK ACTION */}
          <section className="rounded-2xl border border-[#dfe9e4] bg-white p-6">

            <h2 className="font-bold text-[#073d2b]">
              Aksi Cepat
            </h2>

            <p className="mt-1 text-xs text-gray-400">
              Akses fitur operasional utama.
            </p>

            <div className="mt-5 space-y-3">

              <QuickAction
                href="/admin/pemindai"
                icon="⌗"
                title="Scan E-Tiket"
                description="Check-in / check-out pendaki"
              />

              <QuickAction
                href="/admin/verifikasi"
                icon="◇"
                title="Verifikasi Pembayaran"
                description="5 pembayaran menunggu"
                badge="5"
              />

              <QuickAction
                href="/admin/kuota"
                icon="▤"
                title="Kelola Kuota"
                description="Atur kuota berdasarkan tanggal"
              />

            </div>

          </section>

          {/* INFORMATION */}
          <section className="rounded-2xl border border-[#dfe9e4] bg-[#073d2b] p-6 text-white">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
              i
            </div>

            <h2 className="mt-5 font-bold">
              Informasi Operasional
            </h2>

            <p className="mt-2 text-xs leading-6 text-white/55">
              Pastikan setiap pendaki telah melakukan
              check-in sebelum memasuki jalur dan
              melakukan check-out setelah kembali.
            </p>

            <Link
              href="/admin/pemantauan"
              className="mt-5 inline-block text-xs font-bold text-emerald-200 hover:text-white"
            >
              Buka Pemantauan →
            </Link>

          </section>

        </div>

      </div>

    </div>
  );
}

function StatusCard({
  label,
  value,
  description,
  type,
}: {
  label: string;
  value: string;
  description: string;
  type: "neutral" | "warning" | "success";
}) {
  const styles = {
    neutral: "bg-gray-50 text-gray-700",
    warning: "bg-amber-50 text-amber-700",
    success: "bg-emerald-50 text-emerald-700",
  };

  return (
    <div className={`rounded-xl p-5 ${styles[type]}`}>

      <p className="text-xs font-medium opacity-80">
        {label}
      </p>

      <p className="mt-3 text-2xl font-bold">
        {value}
      </p>

      <p className="mt-1 text-[11px] opacity-60">
        {description}
      </p>

    </div>
  );
}

function QuickAction({
  href,
  icon,
  title,
  description,
  badge,
}: {
  href: string;
  icon: string;
  title: string;
  description: string;
  badge?: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-xl border border-[#e3ebe7] p-3 transition hover:border-[#bcd9cb] hover:bg-[#f7fbf9]"
    >

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e8f4ee] font-semibold text-[#17634a]">
        {icon}
      </div>

      <div className="min-w-0 flex-1">

        <p className="truncate text-xs font-bold text-[#073d2b]">
          {title}
        </p>

        <p className="mt-1 truncate text-[10px] text-gray-400">
          {description}
        </p>

      </div>

      {badge && (
        <span className="rounded-full bg-amber-100 px-2 py-1 text-[10px] font-bold text-amber-700">
          {badge}
        </span>
      )}

      <span className="text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-[#17634a]">
        →
      </span>

    </Link>
  );
}