"use client";

import { useState } from "react";
import Link from "next/link";
import { useEffect } from "react";
import { BookingDraft, formatCurrency, readBooking, saveBooking, saveBookingToHistory, updateBooking } from "@/lib/campss";

export default function PembayaranPage() {
  const [fileName, setFileName] = useState("");
  const [booking, setBooking] = useState<BookingDraft | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileError, setFileError] = useState("");

  useEffect(() => {
    queueMicrotask(() => setBooking(readBooking()));
  }, []);

  function handleSubmitPayment() {
    if (!booking) {
      setError("Data pemesanan belum tersedia. Silakan buat pemesanan terlebih dahulu.");
      return;
    }
    if (!fileName || fileError) {
      setError("Bukti pembayaran belum dipilih.");
      return;
    }
    setLoading(true);
    const updated = updateBooking({ status: "WAITING_VERIFICATION", paymentProofName: fileName });
    if (updated) {
      saveBooking(updated);
      saveBookingToHistory(updated);
      setBooking(updated);
      setMessage("Bukti pembayaran berhasil dikirim dan menunggu verifikasi admin.");
    }
    setLoading(false);
  }

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

              {/* QRIS */}
              <div className="mt-6 rounded-xl border-2 border-[#17634a] bg-[#f2f8f5] p-5 text-center">
                <div className="flex items-center justify-between border-b border-[#dcece5] pb-3">
                  <div className="text-lg font-black tracking-tight text-[#063d2b]">
                    QRIS <span className="text-xs font-normal text-gray-500">National QR</span>
                  </div>
                  <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-[10px] font-bold text-red-600">
                    GPN
                  </span>
                </div>

                <div className="my-4 flex justify-center">
                  <div className="relative rounded-xl border border-[#dcece5] bg-white p-3 shadow-sm">
                    <img src="/images/qris.jpeg"
                      alt="QRIS Basecamp Campurejo"
                      className="h-90 w-90 object-contain"
                    />
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#063d2b] text-xs font-bold text-white shadow-md">
                        C
                      </div>
                    </div>
                  </div>
                </div>

                <a
                  href="/images/qris.jpeg"
                  download="qris-basecamp-campurejo.jpeg"
                  className=" inline-flex items-center rounded-lg bg-[#17634a] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0f503b]"
                >
                  Download QRIS
                </a>

                <p className="mt-3 text-xs font-bold uppercase text-[#063d2b]">
                  Nama QRIS: Basecamp Prau via Campurejo
                </p>
                <p className="mt-1 text-[11px] text-gray-500">
                  Scan dengan GoPay, OVO, DANA, ShopeePay, BCA, Mandiri, BRI, dll.
                </p>
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
                      const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
                      const maxSize = 5 * 1024 * 1024;
                      if (!allowedTypes.includes(file.type) || file.size === 0 || file.size > maxSize) {
                        setFileName("");
                        setFileError("File harus JPG, PNG, atau PDF dengan ukuran maksimal 5 MB.");
                        return;
                      }
                      setFileError("");
                      setFileName(file.name);
                    }
                  }}
                />

              </label>

            </div>

            {fileError && <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-700">{fileError}</p>}

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
                  {booking?.bookingId || "Belum ada pemesanan"}
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
                  Harga per orang
                </span>

                <span className="font-medium text-[#063d2b]">
                  {booking ? formatCurrency(booking.pricePerPerson) : "Rp 0"}
                </span>

              </div>

              <div className="flex justify-between text-sm">

                <span className="text-gray-500">
                  Tanggal
                </span>

                <span className="font-medium text-[#063d2b]">
                  {booking?.dateLabel || "-"}
                </span>

              </div>

              <div className="flex justify-between text-sm">

                <span className="text-gray-500">
                  Jumlah Pendaki
                </span>

                <span className="font-medium text-[#063d2b]">
                  {booking?.participantCount || 0} orang
                </span>

              </div>

            </div>

            <div className="my-5 h-px bg-gray-100" />

            <div className="flex items-center justify-between">

              <span className="text-sm text-gray-500">
                Total Pembayaran
              </span>

              <span className="text-xl font-bold text-[#063d2b]">
                {booking ? formatCurrency(booking.total) : "Rp 0"}
              </span>

            </div>

            {(error || message) && (
              <p className={`mt-4 rounded-lg border px-4 py-3 text-xs font-medium ${error ? "border-red-200 bg-red-50 text-red-700" : "border-emerald-200 bg-emerald-50 text-emerald-700"}`}>
                {error || message}
              </p>
            )}

            <button
              type="button"
              onClick={handleSubmitPayment}
              disabled={loading || Boolean(message)}
              className="mt-6 w-full rounded-lg bg-[#063d2b] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#052f22]"
            >
              {loading ? "Mengirim..." : message ? "Menunggu Verifikasi" : "Kirim Bukti Pembayaran"}
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