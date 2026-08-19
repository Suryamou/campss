"use client";

import { useState } from "react";
import Link from "next/link";

export default function PembayaranPage() {
  const [fileName, setFileName] = useState("");

  return (
    <main className="min-h-screen bg-[#f4faf7]">

      {/* Header */}
      <section className="border-b border-[#dcece5] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">

          <Link
            href="/pemesanan"
            className="text-sm font-medium text-[#17634a] hover:underline"
          >
            ← Kembali ke Pemesanan
          </Link>

          <div className="mt-6">
            <p className="text-sm font-medium text-[#17634a]">
              Pembayaran Tiket Pendakian
            </p>

            <h1 className="mt-2 text-3xl font-bold text-[#063d2b]">
              Selesaikan Pembayaran
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
              Lakukan pembayaran sesuai nominal yang tertera,
              kemudian unggah bukti pembayaran untuk diverifikasi
              oleh pihak Basecamp Campurejo.
            </p>
          </div>

        </div>
      </section>

      {/* Progress */}
      <section className="border-b border-[#dcece5] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-5">

          <div className="flex flex-wrap items-center gap-3 text-sm">

            <div className="flex items-center gap-2 text-gray-400">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-xs">
                ✓
              </span>
              Data Pendaki
            </div>

            <div className="h-px w-8 bg-gray-200" />

            <div className="flex items-center gap-2 font-semibold text-[#063d2b]">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#063d2b] text-xs text-white">
                2
              </span>
              Pembayaran
            </div>

            <div className="h-px w-8 bg-gray-200" />

            <div className="text-gray-400">
              3. E-Tiket
            </div>

          </div>

        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-6 py-10">

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">

          {/* Kiri */}
          <div className="space-y-6">

            {/* Informasi Pembayaran */}
            <div className="rounded-xl border border-[#dcece5] bg-white p-6 shadow-sm">

              <h2 className="text-lg font-bold text-[#063d2b]">
                Metode Pembayaran
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Gunakan salah satu rekening pembayaran resmi
                Basecamp Campurejo.
              </p>

              {/* DANA */}
              <div className="mt-6 rounded-xl border border-[#dcece5] bg-[#f8fcfa] p-5">

                <div className="flex items-start justify-between gap-4">

                  <div>
                    <p className="text-xs text-gray-500">
                      DANA
                    </p>

                    <p className="mt-1 text-lg font-bold text-[#063d2b]">
                      085842303879
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Sabar Alim
                    </p>
                  </div>

                  <span className="rounded-full bg-[#e9f7f1] px-3 py-1 text-xs font-semibold text-[#17634a]">
                    DANA
                  </span>

                </div>

              </div>

              {/* BRI */}
              <div className="mt-4 rounded-xl border border-[#dcece5] bg-[#f8fcfa] p-5">

                <div className="flex items-start justify-between gap-4">

                  <div>
                    <p className="text-xs text-gray-500">
                      Bank BRI
                    </p>

                    <p className="mt-1 text-lg font-bold text-[#063d2b]">
                      680701005107506
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Wahyu Ristianto
                    </p>
                  </div>

                  <span className="rounded-full bg-[#e9f7f1] px-3 py-1 text-xs font-semibold text-[#17634a]">
                    BRI
                  </span>

                </div>

              </div>

            </div>

            {/* Bukti Pembayaran */}
            <div className="rounded-xl border border-[#dcece5] bg-white p-6 shadow-sm">

              <h2 className="text-lg font-bold text-[#063d2b]">
                Bukti Pembayaran
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Upload bukti transfer yang jelas dan dapat dibaca.
              </p>

              <label className="mt-5 block cursor-pointer">

                <div className="rounded-xl border-2 border-dashed border-[#cfe6dc] bg-[#f8fcfa] p-8 text-center transition hover:bg-[#f0f9f5]">

                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e5f4ee] text-xl">
                    📷
                  </div>

                  <p className="mt-4 text-sm font-semibold text-[#063d2b]">
                    {fileName
                      ? fileName
                      : "Upload bukti pembayaran"}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    JPG, JPEG, PNG atau PDF
                  </p>

                  <span className="mt-4 inline-block rounded-lg border border-[#17634a] px-4 py-2 text-sm font-semibold text-[#17634a]">
                    Pilih File
                  </span>

                </div>

                <input
                  type="file"
                  accept="image/jpeg,image/png,application/pdf"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0];

                    if (file) {
                      setFileName(file.name);
                    }
                  }}
                />

              </label>

            </div>

            {/* Catatan */}
            <div className="rounded-xl border border-[#cfe6dc] bg-[#e9f7f1] p-5">

              <h3 className="font-semibold text-[#063d2b]">
                Perhatian
              </h3>

              <ul className="mt-3 space-y-2 text-sm leading-6 text-gray-600">

                <li>
                  • Pastikan nominal transfer sesuai total pembayaran.
                </li>

                <li>
                  • Pastikan bukti pembayaran terlihat jelas.
                </li>

                <li>
                  • Pembayaran akan diperiksa oleh admin Basecamp.
                </li>

                <li>
                  • E-Tiket diterbitkan setelah pembayaran disetujui.
                </li>

              </ul>

            </div>

          </div>

          {/* Ringkasan */}
          <aside className="h-fit rounded-xl border border-[#dcece5] bg-white p-6 shadow-sm lg:sticky lg:top-6">

            <h2 className="text-lg font-bold text-[#063d2b]">
              Ringkasan Pesanan
            </h2>

            <div className="mt-5 space-y-4">

              <div>
                <p className="text-xs text-gray-500">
                  Nomor Pemesanan
                </p>

                <p className="mt-1 font-semibold text-[#063d2b]">
                  CAMPSS-20260812-001
                </p>
              </div>

              <div className="flex justify-between text-sm">

                <span className="text-gray-500">
                  Jalur
                </span>

                <span className="font-medium text-[#063d2b]">
                  Campurejo
                </span>

              </div>

              <div className="flex justify-between text-sm">

                <span className="text-gray-500">
                  Tanggal
                </span>

                <span className="font-medium text-[#063d2b]">
                  12 Agustus 2026
                </span>

              </div>

              <div className="flex justify-between text-sm">

                <span className="text-gray-500">
                  Jumlah Pendaki
                </span>

                <span className="font-medium text-[#063d2b]">
                  1 orang
                </span>

              </div>

            </div>

            <div className="my-5 h-px bg-gray-100" />

            <div className="flex items-center justify-between">

              <span className="text-sm text-gray-500">
                Total Pembayaran
              </span>

              <span className="text-xl font-bold text-[#063d2b]">
                Rp 40.000
              </span>

            </div>

            <button
              type="button"
              className="mt-6 w-full rounded-lg bg-[#063d2b] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#052f22]"
            >
              Kirim Bukti Pembayaran
            </button>

            <p className="mt-3 text-center text-xs leading-5 text-gray-400">
              Dengan mengirim bukti pembayaran, data akan masuk
              ke proses verifikasi admin.
            </p>

          </aside>

        </div>

      </section>

    </main>
  );
}