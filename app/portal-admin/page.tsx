"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [data, setData] = useState({
    kuotaMaksimal: 100,
    terpakai: 0,
    sisaKuota: 100,
    menungguVerifikasi: 0,
    belumCheckin: 0,
    sedangMendaki: 0,
    sudahKembali: 0
  });

  useEffect(() => {
    async function fetchSummary() {
      const token = localStorage.getItem("campss_admin_token");
      if (!token) {
        router.push("/portal-admin/login");
        return;
      }
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/dashboard-summary`, {
          headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
        });
        if (res.ok) {
          const json = await res.json();
          setData(json.data);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchSummary();
  }, [router]);

  const percentage = data.kuotaMaksimal > 0 ? (data.terpakai / data.kuotaMaksimal) * 100 : 0;

  const stats = [
    {
      title: "Pendaki Hari Ini",
      value: data.terpakai.toString(),
      detail: `dari ${data.kuotaMaksimal} kuota`,
      icon: "◉",
    },
    {
      title: "Sisa Kuota",
      value: data.sisaKuota.toString(),
      detail: "orang tersedia",
      icon: "▣",
    },
    {
      title: "Menunggu Verifikasi",
      value: data.menungguVerifikasi.toString(),
      detail: "pembayaran",
      icon: "◇",
    },
  ];

  return (
    <div className="p-4 md:p-6">

      {/* HEADER */}
      <div>
        <p className="text-sm font-bold text-[#17634a]">
          Selamat datang kembali
        </p>
        <h1 className="mt-1 text-2xl font-bold text-[#073d2b] md:text-4xl">
          Dashboard
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Pantau aktivitas pendakian Gunung Prau via Campurejo.
        </p>
      </div>

      {/* TOP STATS */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:mt-8">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="rounded-2xl border border-[#dfe9e4] bg-white p-6 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-gray-500">
                  {stat.title}
                </p>
                <p className="mt-3 text-3xl font-bold text-[#073d2b]">
                  {stat.value}
                </p>
                <p className="mt-1 text-[10px] text-gray-400">
                  {stat.detail}
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f4ee] text-[#17634a]">
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
                href="/portal-admin/kuota"
                className="text-xs font-bold text-[#17634a] hover:underline"
              >
                Kelola Kuota →
              </Link>
            </div>
            <div className="mt-7">
              <div className="flex items-end justify-between">
                <div>
                  <span className="text-4xl font-bold tracking-tight text-[#073d2b]">
                    {data.terpakai}
                  </span>
                  <span className="ml-2 text-sm text-gray-400">
                    / {data.kuotaMaksimal} orang
                  </span>
                </div>
                <p className="text-sm font-bold text-[#17634a]">
                  {Math.round(percentage)}%
                </p>
              </div>
              <div className="mt-3 h-3 overflow-hidden rounded-full bg-[#edf3f0]">
                <div
                  className="h-full rounded-full bg-[#17634a]"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="mt-4 grid grid-cols-3 divide-x rounded-xl bg-[#f7faf8] py-4">
                <div className="text-center">
                  <p className="text-lg font-bold text-[#073d2b]">
                    {data.kuotaMaksimal}
                  </p>
                  <p className="mt-1 text-[10px] text-gray-400">
                    Kuota Dibuka
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-[#073d2b]">
                    {data.terpakai}
                  </p>
                  <p className="mt-1 text-[10px] text-gray-400">
                    Terisi
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-[#17634a]">
                    {data.sisaKuota}
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
                href="/portal-admin/pemantauan"
                className="text-xs font-bold text-[#17634a] hover:underline"
              >
                Lihat Semua →
              </Link>
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              <StatusCard
                label="Belum Check-in"
                value={data.belumCheckin.toString()}
                description="pendaki"
                type="neutral"
              />
              <StatusCard
                label="Sedang Mendaki"
                value={data.sedangMendaki.toString()}
                description="pendaki aktif"
                type="warning"
              />
              <StatusCard
                label="Sudah Kembali"
                value={data.sudahKembali.toString()}
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
                href="/portal-admin/pemindai"
                icon="⌗"
                title="Scan E-Tiket"
                description="Check-in / check-out pendaki"
              />
              <QuickAction
                href="/portal-admin/verifikasi"
                icon="◇"
                title="Verifikasi Pembayaran"
                description={`${data.menungguVerifikasi} pembayaran menunggu`}
                badge={data.menungguVerifikasi > 0 ? data.menungguVerifikasi.toString() : undefined}
              />
              <QuickAction
                href="/portal-admin/kuota"
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
              href="/portal-admin/pemantauan"
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
