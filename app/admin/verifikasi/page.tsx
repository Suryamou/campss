"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Payment = any;

export default function VerifikasiPembayaranPage() {
  const router = useRouter();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  async function fetchPayments() {
    try {
      const token = localStorage.getItem("campss_admin_token");
      if (!token) {
        router.push("/admin/login");
        return;
      }
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/pembayaran`, {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
      });
      const data = await res.json();
      if (res.ok) {
        setPayments(data.data || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const [selectedPayment, setSelectedPayment] =
    useState<Payment | null>(null);

  const [showRejectModal, setShowRejectModal] = useState(false);

  const [rejectReason, setRejectReason] = useState("");

  async function verifyPayment(id: string) {
    try {
      const token = localStorage.getItem("campss_admin_token");
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/verifikasi/${id}`, {
        method: "POST",
        headers: { 
          Authorization: `Bearer ${token}`, 
          "Content-Type": "application/json",
          Accept: "application/json" 
        },
        body: JSON.stringify({ status: "diverifikasi" })
      });
      fetchPayments();
      setSelectedPayment(null);
    } catch (e) {
      console.error(e);
    }
  }

  async function rejectPayment(id: string) {
    try {
      const token = localStorage.getItem("campss_admin_token");
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/verifikasi/${id}`, {
        method: "POST",
        headers: { 
          Authorization: `Bearer ${token}`, 
          "Content-Type": "application/json",
          Accept: "application/json" 
        },
        body: JSON.stringify({ status: "ditolak", catatan: rejectReason })
      });
      fetchPayments();
      setShowRejectModal(false);
      setSelectedPayment(null);
      setRejectReason("");
    } catch (e) {
      console.error(e);
    }
  }

  const waitingPayments = payments.filter(
    (payment) => payment.status_pembayaran === "menunggu"
  );

  return (
    <main className="min-h-screen bg-[#f4faf7]">

      <div className="flex min-h-screen">

        {/* MAIN */}
        <section className="min-w-0 flex-1">

          {/* TOPBAR */}
          <header className="border-b border-[#dcece5] bg-white">

            <div className="flex items-center justify-between px-6 py-5 lg:px-8">

              <div>
                <p className="text-xs text-gray-400">
                  Panel Administrator
                </p>

                <h1 className="mt-1 text-xl font-bold text-[#063d2b]">
                  Verifikasi Pembayaran
                </h1>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e5f4ee] font-semibold text-[#17634a]">
                A
              </div>

            </div>

          </header>

          {/* CONTENT */}
          <div className="px-6 py-8 lg:px-8">

            {/* TITLE */}
            <div>

              <p className="text-sm font-medium text-[#17634a]">
                Pemeriksaan Pembayaran
              </p>

              <h2 className="mt-2 text-2xl font-bold text-[#063d2b]">
                Verifikasi Pembayaran Pendaki
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                Periksa bukti pembayaran sebelum menerbitkan
                e-tiket pendakian.
              </p>

            </div>

            {/* SUMMARY */}
            <div className="mt-6 grid gap-4 sm:grid-cols-3">

              <div className="rounded-xl border border-[#dcece5] bg-white p-5">
                <p className="text-xs text-gray-500">
                  Menunggu Verifikasi
                </p>

                <p className="mt-2 text-3xl font-bold text-amber-600">
                  {waitingPayments.length}
                </p>
              </div>

              <div className="rounded-xl border border-[#dcece5] bg-white p-5">
                <p className="text-xs text-gray-500">
                  Diverifikasi
                </p>

                <p className="mt-2 text-3xl font-bold text-emerald-600">
                  {
                    payments.filter(
                      (payment) =>
                        payment.status_pembayaran === "diverifikasi"
                    ).length
                  }
                </p>
              </div>

              <div className="rounded-xl border border-[#dcece5] bg-white p-5">
                <p className="text-xs text-gray-500">
                  Ditolak
                </p>

                <p className="mt-2 text-3xl font-bold text-red-600">
                  {
                    payments.filter(
                      (payment) =>
                        payment.status_pembayaran === "ditolak"
                    ).length
                  }
                </p>
              </div>

            </div>

            {/* TABLE */}
            <div className="mt-6 overflow-hidden rounded-xl border border-[#dcece5] bg-white shadow-sm">

              <div className="border-b border-gray-100 px-6 py-5">

                <h3 className="font-bold text-[#063d2b]">
                  Daftar Pembayaran
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  Klik salah satu pemesanan untuk melihat
                  detail dan bukti pembayaran.
                </p>

              </div>

              <div className="overflow-x-auto">

                <table className="w-full min-w-[800px] text-left">

                  <thead className="bg-[#f8fcfa]">

                    <tr className="text-xs text-gray-500">

                      <th className="px-6 py-4 font-medium">
                        Pemesanan
                      </th>

                      <th className="px-6 py-4 font-medium">
                        Tanggal
                      </th>

                      <th className="px-6 py-4 font-medium">
                        Pendaki
                      </th>

                      <th className="px-6 py-4 font-medium">
                        Total
                      </th>

                      <th className="px-6 py-4 font-medium">
                        Status
                      </th>

                      <th className="px-6 py-4 font-medium">
                        Aksi
                      </th>

                    </tr>

                  </thead>

                  <tbody className="divide-y divide-gray-100">

                    {payments.map((payment) => (

                      <tr
                        key={payment.id}
                        className="text-sm hover:bg-[#fbfdfc]"
                      >

                        <td className="px-6 py-5">

                          <p className="font-semibold text-[#063d2b]">
                            {payment.id}
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            {payment.user?.name || "Pendaki CAMPSS"}
                          </p>

                        </td>

                        <td className="px-6 py-5 text-gray-600">
                          {payment.tanggal_pendakian}
                        </td>

                        <td className="px-6 py-5 text-gray-600">
                          {payment.jumlah_anggota} orang
                        </td>

                        <td className="px-6 py-5 font-semibold text-[#063d2b]">
                          Rp{" "}
                          {Number(payment.total_harga || 0).toLocaleString("id-ID")}
                        </td>

                        <td className="px-6 py-5">

                          {payment.status_pembayaran === "menunggu" && (
                            <span className="rounded-full bg-amber-100 px-3 py-1.5 text-xs font-semibold text-amber-700">
                              Menunggu
                            </span>
                          )}

                          {payment.status_pembayaran === "diverifikasi" && (
                            <span className="rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                              Diverifikasi
                            </span>
                          )}

                          {payment.status_pembayaran === "ditolak" && (
                            <span className="rounded-full bg-red-100 px-3 py-1.5 text-xs font-semibold text-red-700">
                              Ditolak
                            </span>
                          )}

                        </td>

                        <td className="px-6 py-5">

                          <button
                            onClick={() =>
                              setSelectedPayment(payment)
                            }
                            className="rounded-lg border border-[#17634a] px-3 py-2 text-xs font-semibold text-[#17634a] hover:bg-[#f4faf7]"
                          >
                            Lihat Detail
                          </button>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </div>

          </div>

        </section>

      </div>

      {/* DETAIL MODAL */}
      {selectedPayment && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5">

          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl">

            <div className="border-b border-gray-100 px-6 py-5">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-xs text-gray-400">
                    Detail Pembayaran
                  </p>

                  <h3 className="mt-1 font-bold text-[#063d2b]">
                    {selectedPayment.id}
                  </h3>

                </div>

                <button
                  onClick={() => setSelectedPayment(null)}
                  className="text-xl text-gray-400 hover:text-gray-700"
                >
                  ×
                </button>

              </div>

            </div>

            <div className="p-6">

              {/* Dummy bukti */}
              <div className="flex h-64 items-center justify-center rounded-xl border-2 border-dashed border-[#cfe6dc] bg-[#f8fcfa]">

                <div className="text-center">

                  <div className="text-4xl">
                    🧾
                  </div>

                  <p className="mt-3 text-sm font-semibold text-[#063d2b]">
                    Bukti Pembayaran
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    Preview bukti pembayaran akan
                    ditampilkan di sini.
                  </p>

                </div>

              </div>

              {/* Detail */}
              <div className="mt-6 space-y-4">

                <div className="flex justify-between gap-5 text-sm">

                  <span className="text-gray-500">
                    Nama Pendaki
                  </span>

                  <span className="font-medium text-[#063d2b]">
                    {selectedPayment.user?.name || "Pendaki CAMPSS"}
                  </span>

                </div>

                <div className="flex justify-between gap-5 text-sm">

                  <span className="text-gray-500">
                    Tanggal Pendakian
                  </span>

                  <span className="font-medium text-[#063d2b]">
                    {selectedPayment.tanggal_pendakian}
                  </span>

                </div>

                <div className="flex justify-between gap-5 text-sm">

                  <span className="text-gray-500">
                    Jumlah Pendaki
                  </span>

                  <span className="font-medium text-[#063d2b]">
                    {selectedPayment.jumlah_anggota} orang
                  </span>

                </div>

                <div className="flex justify-between gap-5 text-sm">

                  <span className="text-gray-500">
                    Metode
                  </span>

                  <span className="font-medium text-[#063d2b]">
                    {selectedPayment.pembayaran?.metode_pembayaran || "Transfer Bank"}
                  </span>

                </div>

                <div className="flex justify-between gap-5 border-t border-gray-100 pt-4">

                  <span className="font-semibold text-gray-700">
                    Total
                  </span>

                  <span className="font-bold text-[#063d2b]">
                    Rp{" "}
                    {Number(selectedPayment.total_harga || 0).toLocaleString("id-ID")}
                  </span>

                </div>

              </div>

              {/* Actions */}
              {selectedPayment.status_pembayaran === "menunggu" && (

                <div className="mt-7 grid grid-cols-2 gap-3">

                  <button
                    onClick={() => setShowRejectModal(true)}
                    className="rounded-lg border border-red-200 px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50"
                  >
                    Tolak
                  </button>

                  <button
                    onClick={() =>
                      verifyPayment(selectedPayment.id)
                    }
                    className="rounded-lg bg-[#063d2b] px-4 py-3 text-sm font-semibold text-white hover:bg-[#052f22]"
                  >
                    Terima Pembayaran
                  </button>

                </div>

              )}

            </div>

          </div>

        </div>

      )}

      {/* REJECT MODAL */}
      {showRejectModal && selectedPayment && (

        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-5">

          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

            <h3 className="text-lg font-bold text-[#063d2b]">
              Tolak Pembayaran
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Berikan alasan agar pendaki mengetahui
              mengapa pembayaran ditolak.
            </p>

            <textarea
              value={rejectReason}
              onChange={(event) =>
                setRejectReason(event.target.value)
              }
              placeholder="Contoh: Bukti pembayaran tidak jelas..."
              rows={4}
              className="mt-5 w-full rounded-lg border border-gray-200 p-3 text-sm outline-none focus:border-[#17634a]"
            />

            <div className="mt-5 flex gap-3">

              <button
                onClick={() => setShowRejectModal(false)}
                className="flex-1 rounded-lg border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-600"
              >
                Batal
              </button>

              <button
                onClick={() =>
                  rejectPayment(selectedPayment.id)
                }
                disabled={!rejectReason.trim()}
                className="flex-1 rounded-lg bg-red-600 px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                Konfirmasi Tolak
              </button>

            </div>

          </div>

        </div>

      )}

    </main>
  );
}