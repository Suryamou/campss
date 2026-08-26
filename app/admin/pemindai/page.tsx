"use client";

import { useEffect, useRef, useState } from "react";
import type { Html5Qrcode } from "html5-qrcode";
import { readMockRepository, updateBookingStatus } from "@/lib/campss";
import AdminModal from "@/components/AdminModal";

type TicketStatus =
  | "BELUM_CHECK_IN"
  | "SEDANG_MENDAKI"
  | "SELESAI_MENDAKI";

type Ticket = {
  id: string;
  name: string;
  date: string;
  hikers: number;
  paymentStatus: "TERVERIFIKASI";
  hikingStatus: TicketStatus;
  hash: string;
};

export default function PemindaiPage() {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [scannerRunning, setScannerRunning] = useState(false);
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [message, setMessage] = useState("");
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: "",
    message: "",
  });

  const showAlert = (title: string, msg: string) => {
    setModalState({ isOpen: true, title, message: msg });
  };


  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);

  async function startScanner() {
    setMessage("");
    setTicket(null);

    try {
      const { Html5Qrcode } = await import("html5-qrcode");

      const scanner = new Html5Qrcode("qr-reader");

      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: {
            width: 260,
            height: 260,
          },
        },
        (decodedText: string) => {
          handleScan(decodedText);
        },
        () => {
          // Abaikan error scan sementara.
        }
      );

      setScannerRunning(true);
    } catch (error) {
      console.error(error);

      setMessage(
        "Kamera tidak dapat digunakan. Pastikan browser memiliki izin kamera."
      );
    }
  }

  async function stopScanner() {
    try {
      if (scannerRef.current) {
        await scannerRef.current.stop();
        scannerRef.current.clear();
        scannerRef.current = null;
      }
    } catch (error) {
      console.error(error);
    }

    setScannerRunning(false);
  }

  async function handleScan(decodedText: string) {
    setTicket(null);
    setMessage("Mencari data tiket...");

    try {
      const token = localStorage.getItem("campss_admin_token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/monitoring/ticket/${decodedText}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        }
      });
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message || "QR Code tidak valid.");
      }

      const pemesanan = json.data;
      setTicket({
        id: pemesanan.id,
        name: pemesanan.user?.name || "Pengguna",
        date: pemesanan.tanggal_naik,
        hikers: pemesanan.jumlah_anggota,
        paymentStatus: "TERVERIFIKASI",
        hikingStatus: pemesanan.status_pendakian.toUpperCase() as TicketStatus,
        hash: pemesanan.qr_code_hash
      });

      setMessage("E-tiket berhasil ditemukan.");
      stopScanner();
    } catch (err: any) {
      setTicket(null);
      setMessage(err.message || "E-tiket tidak ditemukan.");
      stopScanner();
    }
  }

  async function handleCheckIn() {
    if (!ticket) return;
    try {
      const token = localStorage.getItem("campss_admin_token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/monitoring/checkin/${ticket.hash}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        }
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message);

      setTicket({
        ...ticket,
        hikingStatus: "SEDANG_MENDAKI",
      });

      setMessage("Check-in berhasil. Pendaki sekarang berstatus sedang mendaki.");
    } catch (err: any) {
      showAlert("Gagal Check-in", err.message);
    }
  }

  async function handleCheckOut() {
    if (!ticket) return;
    try {
      const token = localStorage.getItem("campss_admin_token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/monitoring/checkout/${ticket.hash}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        }
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message);

      setTicket({
        ...ticket,
        hikingStatus: "SELESAI_MENDAKI",
      });

      setMessage("Check-out berhasil. Pendaki telah selesai mendaki.");
    } catch (err: any) {
      showAlert("Gagal Check-out", err.message);
    }
  }

  function resetScanner() {
    setTicket(null);
    setMessage("");
  }

  function getStatusLabel(status: TicketStatus) {
    switch (status) {
      case "BELUM_CHECK_IN":
        return "BELUM CHECK-IN";

      case "SEDANG_MENDAKI":
        return "SEDANG MENDAKI";

      case "SELESAI_MENDAKI":
        return "SELESAI MENDAKI";
    }
  }

  function getStatusStyle(status: TicketStatus) {
    switch (status) {
      case "BELUM_CHECK_IN":
        return "bg-gray-100 text-gray-700";

      case "SEDANG_MENDAKI":
        return "bg-amber-100 text-amber-700";

      case "SELESAI_MENDAKI":
        return "bg-emerald-100 text-emerald-700";
    }
  }

  return (
    <div className="px-5 py-7 md:px-8 md:py-9">

      {/* HEADER */}
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

        <div>

          <p className="text-sm font-semibold text-[#17634a]">
            Operasional Basecamp
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#073d2b] md:text-3xl">
            Pemindai E-Tiket
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
            Scan QR Code e-tiket pendaki untuk melakukan
            check-in dan check-out.
          </p>

        </div>

        <div className="flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2">

          <span className="h-2 w-2 rounded-full bg-emerald-500" />

          <span className="text-xs font-semibold text-emerald-700">
            Scanner Siap
          </span>

        </div>

      </div>

      {/* MAIN GRID */}
      <div className="mt-7 grid gap-6 xl:grid-cols-[minmax(0,1fr)_400px]">

        {/* SCANNER */}
        <section className="rounded-2xl border border-[#dfe9e4] bg-white p-5 shadow-sm md:p-7">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="font-bold text-[#073d2b]">
                Scan QR Code
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                Arahkan QR Code e-tiket ke kamera.
              </p>

            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f4ee] text-[#17634a]">
              ⌗
            </div>

          </div>

          {/* CAMERA */}
          <div className="mt-6 overflow-hidden rounded-2xl bg-[#071f18]">

            <div
              id="qr-reader"
              className="min-h-[380px] w-full"
            />

          </div>

          {/* BUTTONS */}
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">

            {!scannerRunning ? (
              <button
                onClick={startScanner}
                className="flex-1 rounded-xl bg-[#073d2b] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#052f22]"
              >
                Mulai Scan
              </button>
            ) : (
              <button
                onClick={stopScanner}
                className="flex-1 rounded-xl border border-red-200 bg-red-50 px-5 py-3.5 text-sm font-bold text-red-600 transition hover:bg-red-100"
              >
                Hentikan Kamera
              </button>
            )}

            <button
              onClick={resetScanner}
              className="rounded-xl border border-gray-200 px-5 py-3.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
            >
              Reset
            </button>

          </div>

          {/* INSTRUCTION */}
          <div className="mt-5 rounded-xl bg-[#f7faf8] p-4">

            <p className="text-xs font-bold text-[#073d2b]">
              Cara menggunakan scanner
            </p>

            <ol className="mt-3 space-y-2 text-xs leading-5 text-gray-500">

              <li>
                1. Klik <b>Mulai Scan</b>.
              </li>

              <li>
                2. Izinkan browser mengakses kamera.
              </li>

              <li>
                3. Arahkan kamera ke QR Code e-tiket.
              </li>

              <li>
                4. Periksa identitas dan status pendaki.
              </li>

              <li>
                5. Konfirmasi check-in atau check-out.
              </li>

            </ol>

          </div>

        </section>

        {/* RESULT */}
        <section className="rounded-2xl border border-[#dfe9e4] bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs font-semibold uppercase tracking-wider text-[#17634a]">
                Hasil Pemindaian
              </p>

              <h2 className="mt-1 text-lg font-bold text-[#073d2b]">
                Data E-Tiket
              </h2>

            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f4ee]">
              ✓
            </div>

          </div>

          {/* EMPTY */}
          {!ticket && !message && (

            <div className="mt-8 rounded-xl border border-dashed border-gray-200 px-5 py-12 text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f1f7f4] text-2xl text-[#17634a]">
                ⌗
              </div>

              <p className="mt-4 text-sm font-semibold text-[#073d2b]">
                Belum ada hasil scan
              </p>

              <p className="mx-auto mt-2 max-w-xs text-xs leading-5 text-gray-400">
                Scan QR Code e-tiket untuk menampilkan
                data pendaki.
              </p>

            </div>

          )}

          {/* MESSAGE */}
          {message && !ticket && (

            <div className="mt-6 rounded-xl border border-red-100 bg-red-50 p-5">

              <div className="flex gap-3">

                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                  !
                </div>

                <div>

                  <p className="text-sm font-bold text-red-700">
                    QR Code Tidak Valid
                  </p>

                  <p className="mt-1 text-xs leading-5 text-red-600">
                    {message}
                  </p>

                </div>

              </div>

            </div>

          )}

          {/* VALID TICKET */}
          {ticket && (

            <div className="mt-6">

              {/* VALID */}
              <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-lg text-emerald-700">
                    ✓
                  </div>

                  <div>

                    <p className="text-sm font-bold text-emerald-700">
                      E-Tiket Valid
                    </p>

                    <p className="mt-0.5 text-[11px] text-emerald-600">
                      Pembayaran telah diverifikasi
                    </p>

                  </div>

                </div>

              </div>

              {/* DETAILS */}
              <div className="mt-5 divide-y divide-gray-100 rounded-xl border border-gray-100">

                <InfoRow
                  label="ID Tiket"
                  value={ticket.id}
                />

                <InfoRow
                  label="Nama Pendaki"
                  value={ticket.name}
                />

                <InfoRow
                  label="Tanggal Pendakian"
                  value={ticket.date}
                />

                <InfoRow
                  label="Jumlah Pendaki"
                  value={`${ticket.hikers} orang`}
                />

                <InfoRow
                  label="Pembayaran"
                  value="Terverifikasi"
                  success
                />

                <div className="flex items-center justify-between gap-5 px-4 py-4">

                  <span className="text-xs text-gray-500">
                    Status Pendakian
                  </span>

                  <span
                    className={`rounded-full px-3 py-1.5 text-[10px] font-bold ${getStatusStyle(
                      ticket.hikingStatus
                    )}`}
                  >
                    {getStatusLabel(ticket.hikingStatus)}
                  </span>

                </div>

              </div>

              {/* ACTION */}
              <div className="mt-5">

                {ticket.hikingStatus === "BELUM_CHECK_IN" && (

                  <button
                    onClick={handleCheckIn}
                    className="w-full rounded-xl bg-[#073d2b] px-5 py-3.5 text-sm font-bold text-white hover:bg-[#052f22]"
                  >
                    Konfirmasi Check-in
                  </button>

                )}

                {ticket.hikingStatus === "SEDANG_MENDAKI" && (

                  <button
                    onClick={handleCheckOut}
                    className="w-full rounded-xl bg-amber-600 px-5 py-3.5 text-sm font-bold text-white hover:bg-amber-700"
                  >
                    Konfirmasi Check-out
                  </button>

                )}

                {ticket.hikingStatus === "SELESAI_MENDAKI" && (

                  <div className="rounded-xl bg-emerald-50 px-5 py-4 text-center">

                    <p className="text-sm font-bold text-emerald-700">
                      Pendakian Selesai
                    </p>

                    <p className="mt-1 text-xs text-emerald-600">
                      Pendaki telah melakukan check-out.
                    </p>

                  </div>

                )}

              </div>

            </div>

          )}

          {/* SUCCESS MESSAGE */}
          {message && ticket && (

            <div className="mt-4 rounded-xl border border-[#dcece5] bg-[#f7faf8] p-4">

              <p className="text-xs font-medium leading-5 text-[#17634a]">
                {message}
              </p>

            </div>

          )}

        </section>

      </div>

      {/* SECURITY NOTE */}
      <div className="mt-6 rounded-xl border border-amber-100 bg-amber-50 p-4">

        <div className="flex gap-3">

          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
            !
          </div>

          <div>

            <p className="text-xs font-bold text-amber-800">
              Perhatian Admin
            </p>

            <p className="mt-1 text-xs leading-5 text-amber-700">
              Pastikan nama pendaki, tanggal pendakian,
              jumlah pendaki, dan status pembayaran sesuai
              sebelum melakukan check-in.
            </p>

          </div>

        </div>

      </div>

      <AdminModal
        isOpen={modalState.isOpen}
        type="alert"
        title={modalState.title}
        message={modalState.message}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
      />
    </div>
  );
}

function InfoRow({
  label,
  value,
  success = false,
}: {
  label: string;
  value: string;
  success?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-5 px-4 py-4">

      <span className="text-xs text-gray-500">
        {label}
      </span>

      <span
        className={`max-w-[60%] text-right text-xs font-semibold ${
          success
            ? "text-emerald-600"
            : "text-[#073d2b]"
        }`}
      >
        {value}
      </span>

    </div>
  );
}