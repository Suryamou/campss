"use client";

import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function ETiketContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [dataTiket, setDataTiket] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    async function fetchTicket() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pemesanan/${id}`);
        if (res.ok) {
          const json = await res.json();
          setDataTiket(json.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchTicket();
  }, [id]);

  function formatDateIndo(dateStr: string) {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  }

  if (!id) {
    return (
      <div className="text-center py-20">
        <p className="mb-4 text-gray-600">ID Pemesanan tidak ditemukan.</p>
        <Link href="/riwayat-pemesanan" className="rounded-lg bg-[#063d2b] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#052f22]">
          Kembali ke Riwayat Pemesanan
        </Link>
      </div>
    );
  }
  
  if (loading) return <p className="text-center py-20">Memuat e-tiket...</p>;
  
  if (!dataTiket) {
    return (
      <main className="min-h-screen bg-[#f4faf7] px-6 py-16 text-center">
        <h1 className="text-2xl font-bold text-[#063d2b]">Tiket belum tersedia</h1>
        <p className="mt-2 text-sm text-gray-500">Selesaikan pemesanan terlebih dahulu untuk melihat e-tiket.</p>
        <Link href="/cek-kuota" className="mt-6 inline-block rounded-lg bg-[#063d2b] px-5 py-3 text-sm font-semibold text-white">Cek Kuota</Link>
      </main>
    );
  }

  const checkinStatus = dataTiket.status_pendakian; 
  const paymentVerified = dataTiket.status_pembayaran === "diverifikasi";

  return (
    <main className="min-h-screen bg-[#f4faf7]">
      <section className="border-b border-[#dcece5] bg-white">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <Link href="/riwayat-pemesanan" className="text-sm font-medium text-[#17634a] hover:underline">
            ← Kembali ke Riwayat
          </Link>
          <div className="mt-6">
            <h1 className="mt-2 text-3xl font-bold text-[#063d2b] md:text-4xl">
              E-Tiket Pendakian
            </h1>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Tunjukkan QR Code ini kepada petugas Basecamp Campurejo saat melakukan proses check-in.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">✓</div>
            <div>
              <p className="text-sm font-semibold text-emerald-800">
                {paymentVerified ? "E-Tiket Terverifikasi" : "E-Tiket Belum Terverifikasi"}
              </p>
              <p className="mt-1 text-xs text-emerald-700">
                {paymentVerified
                  ? "E-Tiket kamu dapat digunakan untuk proses check-in di Basecamp."
                  : "E-Tiket akan dapat digunakan setelah pembayaran diverifikasi admin."}
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
          <div className="bg-[#063d2b] px-6 py-7 text-white md:px-10">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-white/70">CAMPSS</p>
                <h2 className="mt-1 text-2xl font-bold">Tiket Pendakian</h2>
              </div>
              <div className="rounded-lg bg-white/10 px-4 py-2 text-right">
                <p className="text-[10px] uppercase tracking-wider text-white/60">ID Pemesanan</p>
                <p className="mt-1 text-sm font-semibold">{dataTiket.id}</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_280px]">
            <div className="p-6 md:p-10">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-gray-500">Nama Pendaki</p>
                  <p className="mt-1 font-semibold text-[#063d2b]">{dataTiket.user ? dataTiket.user.name : "Pengguna"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Tanggal Pendakian</p>
                  <p className="mt-1 font-semibold text-[#063d2b]">{formatDateIndo(dataTiket.tanggal_naik)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Jalur Pendakian</p>
                  <p className="mt-1 font-semibold text-[#063d2b]">{dataTiket.jalur ? dataTiket.jalur.nama_jalur : "Campurejo"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Jumlah Pendaki</p>
                  <p className="mt-1 font-semibold text-[#063d2b]">{dataTiket.jumlah_anggota} orang</p>
                </div>
              </div>

              <div className="my-8 h-px bg-gray-100" />

              <div>
                <p className="text-sm font-semibold text-[#063d2b]">Status Pendakian</p>
                <div className={`mt-4 flex items-center gap-3 ${checkinStatus === "belum_check_in" ? "" : "opacity-50"}`}>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">1</span>
                  <div>
                    <p className="text-sm font-semibold text-[#063d2b]">Belum Check-in</p>
                    <p className="text-xs text-gray-500">Scan QR di Basecamp sebelum mendaki.</p>
                  </div>
                </div>
              </div>

              <div className={`mt-5 flex items-center gap-3 ${checkinStatus === "sedang_mendaki" ? "" : "opacity-50"}`}>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">2</span>
                <div>
                  <p className="text-sm font-semibold text-[#063d2b]">Sedang Mendaki</p>
                  <p className="text-xs text-gray-500">Status berubah setelah check-in.</p>
                </div>
              </div>

              <div className={`mt-5 flex items-center gap-3 ${checkinStatus === "selesai_mendaki" ? "" : "opacity-50"}`}>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">3</span>
                <div>
                  <p className="text-sm font-semibold text-[#063d2b]">Selesai Mendaki</p>
                  <p className="text-xs text-gray-500">Scan kembali setelah turun.</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 bg-[#f8fcfa] p-8 lg:border-l lg:border-t-0">
              <div className="flex flex-col items-center text-center">
                <p className="text-sm font-bold text-[#063d2b]">
                  {paymentVerified ? "QR Code E-Tiket" : "QR Code Belum Aktif"}
                </p>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  {paymentVerified ? "Tunjukkan QR Code kepada petugas Basecamp." : "QR akan tersedia setelah pembayaran diverifikasi admin."}
                </p>

                {paymentVerified && dataTiket.qr_code_hash ? (
                  <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm">
                    <QRCodeSVG value={dataTiket.qr_code_hash} size={190} level="H" includeMargin />
                  </div>
                ) : (
                  <div className="mt-6 rounded-2xl border border-dashed border-[#cfe6dc] bg-white px-5 py-14 text-center">
                    <p className="text-xs font-semibold text-gray-500">Menunggu verifikasi pembayaran</p>
                  </div>
                )}
                <p className="mt-5 text-xs text-gray-400">ID: {dataTiket.id}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-dashed border-gray-200 px-6 py-5 md:px-10">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs text-gray-500">Total Pembayaran</p>
                <p className="text-lg font-bold text-[#063d2b]">
                  Rp {Number(dataTiket.total_harga || 0).toLocaleString("id-ID")}
                </p>
              </div>
              <span className="rounded-full bg-emerald-100 px-4 py-2 text-xs font-semibold text-emerald-700">
                {dataTiket.status_pembayaran.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-[#cfe6dc] bg-[#e9f7f1] p-5">
            <p className="font-semibold text-[#063d2b]">Saat Berangkat</p>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Tunjukkan QR Code kepada petugas Basecamp. Setelah berhasil dipindai, status pendakian akan berubah menjadi <b>SEDANG MENDAKI</b>.
            </p>
          </div>

          <div className="rounded-xl border border-[#cfe6dc] bg-[#e9f7f1] p-5">
            <p className="font-semibold text-[#063d2b]">Saat Kembali</p>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Lakukan scan kembali kepada petugas Basecamp. Status kemudian berubah menjadi <b> SELESAI MENDAKI</b>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function ETiketPage() {
  return (
    <Suspense fallback={<p className="text-center py-20">Memuat tiket...</p>}>
      <ETiketContent />
    </Suspense>
  );
}
