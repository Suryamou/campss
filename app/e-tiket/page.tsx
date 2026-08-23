"use client";

import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";
import { BookingDraft, formatCurrency, readBooking } from "@/lib/campss";

export default function ETiketPage() {
  const [booking, setBooking] = useState<BookingDraft | null>(null);

  useEffect(() => {
    queueMicrotask(() => setBooking(readBooking()));
  }, []);

  if (!booking) {
    return (
      <main className="min-h-screen bg-[#f4faf7] px-6 py-16 text-center">
        <h1 className="text-2xl font-bold text-[#063d2b]">Tiket belum tersedia</h1>
        <p className="mt-2 text-sm text-gray-500">Selesaikan pemesanan terlebih dahulu untuk melihat e-tiket.</p>
        <Link href="/cek-kuota" className="mt-6 inline-block rounded-lg bg-[#063d2b] px-5 py-3 text-sm font-semibold text-white">Cek Kuota</Link>
      </main>
    );
  }

  const bookingId = booking.bookingId;
  const paymentVerified = booking.status !== "PENDING_PAYMENT" && booking.status !== "PAYMENT_SUBMITTED" && booking.status !== "WAITING_VERIFICATION" && booking.status !== "REJECTED";

  const qrValue = JSON.stringify({
    bookingId,
    type: "E_TIKET_CAMPSS",
  });

  return (
    <main className="min-h-screen bg-[#f4faf7]">

      {/* Header */}
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
              Tiket Elektronik Pendakian
            </p>

            <h1 className="mt-2 text-3xl font-bold text-[#063d2b] md:text-4xl">
              E-Tiket Pendakian
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Tunjukkan QR Code ini kepada petugas Basecamp
              Campurejo saat melakukan proses check-in.
            </p>

          </div>

        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-5xl px-6 py-10">

        {/* Status */}
        <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 p-5">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              ✓
            </div>

            <div>

              <p className="text-sm font-semibold text-emerald-800">
                {paymentVerified
                  ? "E-Tiket Terverifikasi"
                  : "E-Tiket Belum Terverifikasi"}
              </p>

              <p className="mt-1 text-xs text-emerald-700">
                {paymentVerified
                  ? "E-Tiket kamu dapat digunakan untuk proses check-in di Basecamp."
                  : "E-Tiket akan dapat digunakan setelah pembayaran diverifikasi admin."}
              </p>

            </div>

          </div>

        </div>

        {/* Ticket */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-xl">

          {/* Ticket Header */}
          <div className="bg-[#063d2b] px-6 py-7 text-white md:px-10">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <p className="text-sm font-medium text-white/70">
                  CAMPSS
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  Tiket Pendakian
                </h2>

              </div>

              <div className="rounded-lg bg-white/10 px-4 py-2 text-right">

                <p className="text-[10px] uppercase tracking-wider text-white/60">
                  ID Pemesanan
                </p>

                <p className="mt-1 text-sm font-semibold">
                  {bookingId}
                </p>

              </div>

            </div>

          </div>

          {/* Ticket Body */}
          <div className="grid lg:grid-cols-[1fr_280px]">

            {/* Detail */}
            <div className="p-6 md:p-10">

              <div className="grid gap-6 sm:grid-cols-2">

                <div>

                  <p className="text-xs text-gray-500">
                    Nama Pendaki
                  </p>

                  <p className="mt-1 font-semibold text-[#063d2b]">
                    {booking.leader.name}
                  </p>

                </div>

                <div>

                  <p className="text-xs text-gray-500">
                    Tanggal Pendakian
                  </p>

                  <p className="mt-1 font-semibold text-[#063d2b]">
                    {booking.dateLabel}
                  </p>

                </div>

                <div>

                  <p className="text-xs text-gray-500">
                    Jalur Pendakian
                  </p>

                  <p className="mt-1 font-semibold text-[#063d2b]">
                    {booking.route}
                  </p>

                </div>

                <div>

                  <p className="text-xs text-gray-500">
                    Jumlah Pendaki
                  </p>

                  <p className="mt-1 font-semibold text-[#063d2b]">
                    {booking.participantCount} orang
                  </p>

                </div>

              </div>

              <div className="my-8 h-px bg-gray-100" />

              {/* Status perjalanan */}
              <div>

                <p className="text-sm font-semibold text-[#063d2b]">
                  Status Pendakian
                </p>

                <div className="mt-4 flex items-center gap-3">

                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
                    1
                  </span>

                  <div>
                    <p className="text-sm font-semibold text-[#063d2b]">
                      Belum Check-in
                    </p>

                    <p className="text-xs text-gray-500">
                      Scan QR di Basecamp sebelum mendaki.
                    </p>
                  </div>

                </div>

              </div>

              <div className="mt-5 flex items-center gap-3 opacity-50">

                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
                  2
                </span>

                <div>
                  <p className="text-sm font-semibold text-[#063d2b]">
                    Sedang Mendaki
                  </p>

                  <p className="text-xs text-gray-500">
                    Status berubah setelah check-in.
                  </p>
                </div>

              </div>

              <div className="mt-5 flex items-center gap-3 opacity-50">

                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
                  3
                </span>

                <div>
                  <p className="text-sm font-semibold text-[#063d2b]">
                    Selesai Mendaki
                  </p>

                  <p className="text-xs text-gray-500">
                    Scan kembali setelah turun.
                  </p>
                </div>

              </div>

            </div>

            {/* QR */}
            <div className="border-t border-gray-100 bg-[#f8fcfa] p-8 lg:border-l lg:border-t-0">

              <div className="flex flex-col items-center text-center">

                <p className="text-sm font-bold text-[#063d2b]">
                  {paymentVerified ? "QR Code E-Tiket" : "QR Code Belum Aktif"}
                </p>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  {paymentVerified ? "Tunjukkan QR Code kepada petugas Basecamp." : "QR akan tersedia setelah pembayaran diverifikasi admin."}
                </p>

                {paymentVerified ? (
                  <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm">
                    <QRCodeSVG value={qrValue} size={190} level="H" includeMargin />
                  </div>
                ) : (
                  <div className="mt-6 rounded-2xl border border-dashed border-[#cfe6dc] bg-white px-5 py-14 text-center">
                    <p className="text-xs font-semibold text-gray-500">Menunggu verifikasi pembayaran</p>
                  </div>
                )}

                <p className="mt-5 text-xs text-gray-400">
                  ID: {bookingId}
                </p>

              </div>

            </div>

          </div>

          {/* Footer Ticket */}
          <div className="border-t border-dashed border-gray-200 px-6 py-5 md:px-10">

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <p className="text-xs text-gray-500">
                  Total Pembayaran
                </p>

                <p className="text-lg font-bold text-[#063d2b]">
                  {formatCurrency(booking.total)}
                </p>

              </div>

              <span className="rounded-full bg-emerald-100 px-4 py-2 text-xs font-semibold text-emerald-700">
                {booking.status}
              </span>

            </div>

          </div>

        </div>

        {/* Informasi Scan */}
        <div className="mt-6 grid gap-4 md:grid-cols-2">

          <div className="rounded-xl border border-[#cfe6dc] bg-[#e9f7f1] p-5">

            <p className="font-semibold text-[#063d2b]">
              Saat Berangkat
            </p>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Tunjukkan QR Code kepada petugas Basecamp.
              Setelah berhasil dipindai, status pendakian akan
              berubah menjadi <b>SEDANG MENDAKI</b>.
            </p>

          </div>

          <div className="rounded-xl border border-[  #cfe6dc] bg-[#e9f7f1] p-5">

            <p className="font-semibold text-[#063d2b]">
              Saat Kembali
            </p>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Lakukan scan kembali kepada petugas Basecamp.
              Status kemudian berubah menjadi
              <b> SELESAI MENDAKI</b>.
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}