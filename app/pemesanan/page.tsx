"use client";

import { useState } from "react";
import Link from "next/link";

export default function PemesananPage() {
  const [jumlahPendaki, setJumlahPendaki] = useState(1);

  const HARGA_TIKET = 40000;
  const totalPembayaran = jumlahPendaki * HARGA_TIKET;

  return (
    <main className="min-h-screen bg-[#f4faf7]">

      {/* Header */}
      <section className="border-b border-[#dcece5] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">

          <Link
            href="/cek-kuota"
            className="text-sm font-medium text-[#17634a] hover:underline"
          >
            ← Kembali ke Cek Kuota
          </Link>

          <div className="mt-6">

            <p className="text-sm font-medium text-[#17634a]">
              Pemesanan Tiket Pendakian
            </p>

            <h1 className="mt-2 text-3xl font-bold text-[#063d2b]">
              Lengkapi Data Pendakian
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
              Isi data dengan benar sesuai dokumen identitas yang
              akan digunakan saat proses verifikasi di Basecamp
              Campurejo.
            </p>

          </div>

        </div>
      </section>

      {/* Progress */}
      <section className="border-b border-[#dcece5] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-5">

          <div className="flex items-center gap-3 text-sm">

            <div className="flex items-center gap-2 font-semibold text-[#063d2b]">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#063d2b] text-xs text-white">
                1
              </span>
              Data Pendaki
            </div>

            <div className="h-px w-10 bg-gray-200" />

            <div className="text-gray-400">
              2. Ringkasan
            </div>

            <div className="h-px w-10 bg-gray-200" />

            <div className="text-gray-400">
              3. Pembayaran
            </div>

          </div>

        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-6 py-10">

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">

          {/* FORM */}
          <div className="space-y-6">

            {/* Jadwal */}
            <div className="rounded-xl border border-[#dcece5] bg-white p-6 shadow-sm">

              <h2 className="text-lg font-bold text-[#063d2b]">
                Detail Pendakian
              </h2>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">

                <div className="rounded-lg bg-[#f4faf7] p-4">
                  <p className="text-xs text-gray-500">
                    Jalur Pendakian
                  </p>

                  <p className="mt-1 font-semibold text-[#063d2b]">
                    Gunung Prau via Campurejo
                  </p>
                </div>

                <div className="rounded-lg bg-[#f4faf7] p-4">
                  <p className="text-xs text-gray-500">
                    Tanggal Pendakian
                  </p>

                  <p className="mt-1 font-semibold text-[#063d2b]">
                    12 Agustus 2026
                  </p>
                </div>

              </div>

            </div>

            {/* Ketua Pendakian */}
            <div className="rounded-xl border border-[#dcece5] bg-white p-6 shadow-sm">

              <h2 className="text-lg font-bold text-[#063d2b]">
                Data Ketua Pendakian
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Data ketua rombongan digunakan sebagai kontak utama
                selama proses pendakian.
              </p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">

                <div className="sm:col-span-2">

                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Nama Lengkap
                  </label>

                  <input
                    type="text"
                    placeholder="Sesuai kartu identitas"
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#17634a] focus:ring-2 focus:ring-[#17634a]/10"
                  />

                </div>

                <div>

                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Email
                  </label>

                  <input
                    type="email"
                    placeholder="Email aktif"
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#17634a] focus:ring-2 focus:ring-[#17634a]/10"
                  />

                </div>

                <div>

                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Nomor WhatsApp
                  </label>

                  <input
                    type="tel"
                    placeholder="08xxxxxxxxxx"
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#17634a] focus:ring-2 focus:ring-[#17634a]/10"
                  />

                </div>

                <div>

                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Nomor Identitas
                  </label>

                  <input
                    type="text"
                    placeholder="Nomor KTP / identitas"
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#17634a] focus:ring-2 focus:ring-[#17634a]/10"
                  />

                </div>

                <div>

                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Jenis Identitas
                  </label>

                  <select
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#17634a] focus:ring-2 focus:ring-[#17634a]/10"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Pilih identitas
                    </option>
                    <option value="ktp">KTP</option>
                    <option value="sim">SIM</option>
                    <option value="lainnya">Tanda Pengenal Lainnya</option>
                  </select>

                </div>

              </div>

            </div>

            {/* Jumlah Pendaki */}
            <div className="rounded-xl border border-[#dcece5] bg-white p-6 shadow-sm">

              <h2 className="text-lg font-bold text-[#063d2b]">
                Jumlah Pendaki
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Tentukan jumlah anggota yang ikut dalam rombongan.
              </p>

              <div className="mt-5 flex items-center gap-4">

                <button
                  type="button"
                  onClick={() =>
                    setJumlahPendaki(
                      Math.max(1, jumlahPendaki - 1)
                    )
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-lg hover:bg-gray-50"
                >
                  −
                </button>

                <div className="min-w-12 text-center">

                  <p className="text-xl font-bold text-[#063d2b]">
                    {jumlahPendaki}
                  </p>

                  <p className="text-xs text-gray-500">
                    orang
                  </p>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    setJumlahPendaki(
                      Math.min(10, jumlahPendaki + 1)
                    )
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-lg hover:bg-gray-50"
                >
                  +
                </button>

              </div>

              <p className="mt-3 text-xs text-gray-500">
                Maksimal jumlah anggota dalam satu pemesanan
                sementara dibatasi 10 orang.
              </p>

            </div>

            {/* Dokumen */}
            <div className="rounded-xl border border-[#dcece5] bg-white p-6 shadow-sm">

              <h2 className="text-lg font-bold text-[#063d2b]">
                Dokumen Pendaki
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Siapkan dokumen identitas untuk proses verifikasi.
              </p>

              <div className="mt-5 rounded-lg border-2 border-dashed border-[#cfe6dc] bg-[#f8fcfa] p-6 text-center">

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#e5f4ee] text-xl">
                  📄
                </div>

                <p className="mt-3 text-sm font-semibold text-[#063d2b]">
                  Upload dokumen identitas
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  KTP, SIM, atau tanda pengenal lainnya
                </p>

                <label className="mt-4 inline-block cursor-pointer rounded-lg border border-[#17634a] px-4 py-2 text-sm font-semibold text-[#17634a] hover:bg-[#e9f7f1]">

                  Pilih File

                  <input
                    type="file"
                    accept="image/*,.pdf"
                    className="hidden"
                  />

                </label>

              </div>

            </div>

            {/* Persetujuan */}
            <div className="rounded-xl border border-[#cfe6dc] bg-[#e9f7f1] p-5">

              <div className="flex gap-3">

                <input
                  id="agreement"
                  type="checkbox"
                  className="mt-1 h-4 w-4 accent-[#17634a]"
                />

                <label
                  htmlFor="agreement"
                  className="text-sm leading-6 text-gray-600"
                >
                  Saya menyatakan bahwa data yang saya masukkan
                  benar dan bersedia mengikuti seluruh peraturan
                  pendakian yang berlaku di Basecamp Campurejo.
                </label>

              </div>

            </div>

          </div>

          {/* RINGKASAN */}
          <aside className="h-fit rounded-xl border border-[#dcece5] bg-white p-6 shadow-sm lg:sticky lg:top-6">

            <h2 className="text-lg font-bold text-[#063d2b]">
              Ringkasan Pemesanan
            </h2>

            <div className="mt-5 space-y-4">

              <div className="flex justify-between gap-4 text-sm">

                <span className="text-gray-500">
                  Jalur
                </span>

                <span className="text-right font-medium text-[#063d2b]">
                  Campurejo
                </span>

              </div>

              <div className="flex justify-between gap-4 text-sm">

                <span className="text-gray-500">
                  Tanggal
                </span>

                <span className="font-medium text-[#063d2b]">
                  12 Agustus 2026
                </span>

              </div>

              <div className="flex justify-between gap-4 text-sm">

                <span className="text-gray-500">
                  Jumlah Pendaki
                </span>

                <span className="font-medium text-[#063d2b]">
                  {jumlahPendaki} orang
                </span>

              </div>

            </div>

            <div className="my-5 h-px bg-gray-100" />

            <div className="flex items-center justify-between">

              <span className="text-sm text-gray-500">
                Total
              </span>

              <span className="text-xl font-bold text-[#063d2b]">
                Rp {totalPembayaran.toLocaleString("id-ID")}
              </span>

            </div>

            <p className="mt-2 text-xs leading-5 text-gray-400">
              Tarid Pendakian Rp40.000 per orang.
            </p>

            <Link
              href="/pembayaran"
              className="mt-6 block w-full rounded-lg bg-[#063d2b] px-5 py-3.5 text-center text-sm font-semibold text-white hover:bg-[#052f22]"
            >
              Lanjut ke Pembayaran
            </Link>

          </aside>

        </div>

      </section>

    </main>
  );
}