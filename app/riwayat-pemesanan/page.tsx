"use client";

import Link from "next/link";
import { useState } from "react";

type StatusPemesanan =
  | "TERVERIFIKASI"
  | "MENUNGGU PEMBAYARAN"
  | "MENUNGGU VERIFIKASI"
  | "SELESAI";

type Pemesanan = {
  id: string;
  tanggalPemesanan: string;
  tanggalPendakian: string;
  jalur: string;
  jumlahPendaki: number;
  total: number;
  status: StatusPemesanan;
};

const dataPemesanan: Pemesanan[] = [
  {
    id: "CAMPSS-20260812-001",
    tanggalPemesanan: "10 Agustus 2026",
    tanggalPendakian: "12 Agustus 2026",
    jalur: "Gunung Prau via Campurejo",
    jumlahPendaki: 1,
    total: 40000,
    status: "TERVERIFIKASI",
  },
  {
    id: "CAMPSS-20260720-002",
    tanggalPemesanan: "18 Juli 2026",
    tanggalPendakian: "20 Juli 2026",
    jalur: "Gunung Prau via Campurejo",
    jumlahPendaki: 2,
    total: 80000,
    status: "SELESAI",
  },
  {
    id: "CAMPSS-20260615-003",
    tanggalPemesanan: "12 Juni 2026",
    tanggalPendakian: "15 Juni 2026",
    jalur: "Gunung Prau via Campurejo",
    jumlahPendaki: 3,
    total: 120000,
    status: "MENUNGGU VERIFIKASI",
  },
];

export default function RiwayatPemesananPage() {
  const [filter, setFilter] = useState<"SEMUA" | StatusPemesanan>("SEMUA");

  const pemesananDitampilkan =
    filter === "SEMUA"
      ? dataPemesanan
      : dataPemesanan.filter(
          (item) => item.status === filter
        );

  return (
    <main className="min-h-screen bg-[#f4faf7]">

      {/* HEADER */}
      <section className="border-b border-[#dcece5] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">

          <Link
            href="/"
            className="text-sm font-medium text-[#17634a] hover:underline"
          >
            ← Kembali ke Beranda
          </Link>

          <div className="mt-6">

            <p className="text-sm font-medium text-[#17634a]">
              Akun CAMPSS
            </p>

            <h1 className="mt-2 text-3xl font-bold text-[#063d2b] md:text-4xl">
              Riwayat Pemesanan
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
              Lihat seluruh riwayat pemesanan tiket pendakian
              Gunung Prau via Campurejo.
            </p>

          </div>

        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-6 py-10">

        {/* FILTER */}
        <div className="mb-6 rounded-xl border border-[#dcece5] bg-white p-4 shadow-sm">

          <div className="flex flex-wrap gap-2">

            <FilterButton
              active={filter === "SEMUA"}
              onClick={() => setFilter("SEMUA")}
            >
              Semua
            </FilterButton>

            <FilterButton
              active={filter === "TERVERIFIKASI"}
              onClick={() => setFilter("TERVERIFIKASI")}
            >
              Terverifikasi
            </FilterButton>

            <FilterButton
              active={filter === "MENUNGGU PEMBAYARAN"}
              onClick={() =>
                setFilter("MENUNGGU PEMBAYARAN")
              }
            >
              Menunggu Pembayaran
            </FilterButton>

            <FilterButton
              active={filter === "MENUNGGU VERIFIKASI"}
              onClick={() =>
                setFilter("MENUNGGU VERIFIKASI")
              }
            >
              Menunggu Verifikasi
            </FilterButton>

            <FilterButton
              active={filter === "SELESAI"}
              onClick={() => setFilter("SELESAI")}
            >
              Selesai
            </FilterButton>

          </div>

        </div>

        {/* LIST PEMESANAN */}
        <div className="space-y-5">

          {pemesananDitampilkan.length > 0 ? (
            pemesananDitampilkan.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-xl border border-[#dcece5] bg-white shadow-sm"
              >

                {/* TOP */}
                <div className="flex flex-col gap-4 border-b border-gray-100 p-5 md:flex-row md:items-center md:justify-between">

                  <div>

                    <p className="text-xs text-gray-400">
                      Nomor Pemesanan
                    </p>

                    <p className="mt-1 font-bold text-[#063d2b]">
                      {item.id}
                    </p>

                  </div>

                  <StatusBadge status={item.status} />

                </div>

                {/* BODY */}
                <div className="p-5">

                  <div className="grid gap-5 md:grid-cols-4">

                    <Info
                      label="Tanggal Pendakian"
                      value={item.tanggalPendakian}
                    />

                    <Info
                      label="Jalur"
                      value={item.jalur}
                    />

                    <Info
                      label="Jumlah Pendaki"
                      value={`${item.jumlahPendaki} orang`}
                    />

                    <Info
                      label="Total Pembayaran"
                      value={`Rp ${item.total.toLocaleString(
                        "id-ID"
                      )}`}
                    />

                  </div>

                  {/* FOOTER */}
                  <div className="mt-6 flex flex-col gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-between">

                    <p className="text-xs text-gray-400">
                      Dipesan pada {item.tanggalPemesanan}
                    </p>

                    <div className="flex flex-wrap gap-2">

                      {item.status === "TERVERIFIKASI" && (
                        <Link
                          href="/e-tiket"
                          className="rounded-lg bg-[#063d2b] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#052f22]"
                        >
                          Lihat E-Tiket
                        </Link>
                      )}

                      <button
                        type="button"
                        className="rounded-lg border border-[#dcece5] px-4 py-2.5 text-xs font-semibold text-[#17634a] transition hover:bg-[#f4faf7]"
                      >
                        Detail Pesanan
                      </button>

                    </div>

                  </div>

                </div>

              </div>
            ))
          ) : (
            <div className="rounded-xl border border-[#dcece5] bg-white p-10 text-center shadow-sm">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e5f4ee] text-2xl">
                📋
              </div>

              <h2 className="mt-4 font-bold text-[#063d2b]">
                Belum Ada Pemesanan
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Tidak ada riwayat pemesanan dengan status
                tersebut.
              </p>

              <Link
                href="/cek-kuota"
                className="mt-5 inline-block rounded-lg bg-[#063d2b] px-5 py-3 text-sm font-semibold text-white"
              >
                Cari Jadwal Pendakian
              </Link>

            </div>
          )}

        </div>

        {/* INFO */}
        <div className="mt-8 rounded-xl border border-[#cfe6dc] bg-[#e9f7f1] p-5">

          <h3 className="font-semibold text-[#063d2b]">
            Informasi Pemesanan
          </h3>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            Riwayat pemesanan menampilkan status tiket,
            tanggal pendakian, jumlah pendaki, dan total
            pembayaran. E-Tiket dapat digunakan setelah
            pembayaran berhasil diverifikasi oleh admin
            Basecamp Campurejo.
          </p>

        </div>

      </section>

    </main>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg px-4 py-2.5 text-xs font-semibold transition ${
        active
          ? "bg-[#063d2b] text-white"
          : "border border-gray-200 bg-white text-gray-500 hover:bg-gray-50"
      }`}
    >
      {children}
    </button>
  );
}

function StatusBadge({
  status,
}: {
  status: StatusPemesanan;
}) {
  const style =
    status === "TERVERIFIKASI"
      ? "bg-emerald-100 text-emerald-700"
      : status === "SELESAI"
      ? "bg-blue-100 text-blue-700"
      : status === "MENUNGGU PEMBAYARAN"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-orange-100 text-orange-700";

  return (
    <span
      className={`w-fit rounded-full px-3 py-1.5 text-[10px] font-bold ${style}`}
    >
      {status}
    </span>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>

      <p className="text-xs text-gray-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-[#063d2b]">
        {value}
      </p>

    </div>
  );
}