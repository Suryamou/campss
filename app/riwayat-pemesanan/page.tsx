"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type StatusPemesanan =
  | "TERVERIFIKASI"
  | "MENUNGGU PEMBAYARAN"
  | "MENUNGGU VERIFIKASI"
  | "DITOLAK"
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

function formatDateIndo(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export default function RiwayatPemesananPage() {
  const router = useRouter();
  const [dataPemesanan, setDataPemesanan] = useState<Pemesanan[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"SEMUA" | StatusPemesanan>("SEMUA");

  useEffect(() => {
    const loggedIn =
      localStorage.getItem("campss_logged_in") === "true" ||
      sessionStorage.getItem("campss_logged_in") === "true";
    if (!loggedIn) {
      router.push("/login");
      return;
    }

    async function fetchMyPemesanan() {
      try {
        const token =
          localStorage.getItem("campss_access_token") ||
          sessionStorage.getItem("campss_access_token");
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/user/pemesanan`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.ok) {
          const json = await res.json();
          const mapped: Pemesanan[] = json.data.map((item: any) => {
            let status: StatusPemesanan = "MENUNGGU PEMBAYARAN";
            if (item.status_pembayaran === "diverifikasi") {
              if (item.status_pendakian === "check_out") {
                status = "SELESAI";
              } else {
                status = "TERVERIFIKASI";
              }
            } else if (item.status_pembayaran === "ditolak") {
              status = "DITOLAK";
            } else if (item.status_pembayaran === "menunggu") {
              if (item.pembayaran) {
                status = "MENUNGGU VERIFIKASI";
              } else {
                status = "MENUNGGU PEMBAYARAN";
              }
            }

            return {
              id: item.id,
              tanggalPemesanan: formatDateIndo(item.created_at),
              tanggalPendakian: formatDateIndo(item.tanggal_naik),
              jalur: item.jalur?.nama_jalur || "Gunung Prau via Campurejo",
              jumlahPendaki: item.jumlah_anggota,
              total: item.total_harga,
              status: status,
            };
          });
          setDataPemesanan(mapped);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchMyPemesanan();
    
    // Auto-refresh data riwayat setiap 5 detik (tanpa reload page)
    const intervalId = setInterval(fetchMyPemesanan, 5000);
    
    // Cleanup interval saat komponen ditutup/berpindah halaman
    return () => clearInterval(intervalId);
  }, [router]);

  const pemesananDitampilkan =
    filter === "SEMUA"
      ? dataPemesanan
      : dataPemesanan.filter((p) => p.status === filter);

  return (
    <main className="min-h-screen bg-[#f4faf7]">
      <section className="border-b border-[#dcece5] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <Link
            href="/"
            className="text-sm font-medium text-[#17634a] hover:underline"
          >
            ← Kembali ke Beranda
          </Link>

          <h1 className="mt-5 text-3xl font-bold text-[#063d2b] md:text-4xl">
            Riwayat Pemesanan
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
            Daftar tiket pendakian yang pernah kamu pesan melalui CAMPSS.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {["SEMUA", "TERVERIFIKASI", "MENUNGGU PEMBAYARAN", "MENUNGGU VERIFIKASI", "DITOLAK", "SELESAI"].map(
            (status) => (
              <button
                key={status}
                onClick={() => setFilter(status as any)}
                className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  filter === status
                    ? "bg-[#063d2b] text-white"
                    : "bg-white text-gray-500 hover:bg-gray-100"
                }`}
              >
                {status === "SEMUA" ? "Semua Pesanan" : status}
              </button>
            )
          )}
        </div>

        {loading ? (
          <div className="flex justify-center py-20 text-sm text-gray-500">
            Memuat riwayat pemesanan...
          </div>
        ) : pemesananDitampilkan.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[#cfe6dc] bg-[#f8fcfa] p-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e5f4ee] text-3xl">
              🏕️
            </div>

            <p className="mt-5 text-sm font-semibold text-[#063d2b]">
              Belum Ada Pemesanan
            </p>
            <p className="mt-2 text-xs text-gray-500">
              Kamu belum memiliki riwayat pemesanan tiket pendakian.
            </p>

            <Link
              href="/cek-kuota"
              className="mt-6 inline-block rounded-lg bg-[#063d2b] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#052f22]"
            >
              Mulai Pendakian
            </Link>
          </div>
        ) : (
          <div className="grid gap-5">
            {pemesananDitampilkan.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-xl border border-[#dcece5] bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="flex flex-col gap-4 border-b border-gray-100 bg-[#f8fcfa] px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-medium text-gray-500">
                      ID: <span className="text-gray-900">{item.id}</span>
                    </span>
                    <span className="h-4 w-px bg-gray-300" />
                    <span className="text-xs font-medium text-gray-500">
                      Dipesan: {item.tanggalPemesanan}
                    </span>
                  </div>

                  <span
                    className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-[11px] font-bold tracking-wide ${
                      item.status === "TERVERIFIKASI"
                        ? "bg-emerald-100 text-emerald-700"
                        : item.status === "SELESAI"
                        ? "bg-blue-100 text-blue-700"
                        : item.status === "DITOLAK"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-4">
                  <Info label="Gunung & Jalur" value={item.jalur} />
                  <Info
                    label="Tanggal Pendakian"
                    value={item.tanggalPendakian}
                  />
                  <Info
                    label="Jumlah Pendaki"
                    value={`${item.jumlahPendaki} Orang`}
                  />
                  <Info
                    label="Total Pembayaran"
                    value={`Rp ${item.total.toLocaleString("id-ID")}`}
                  />
                </div>

                <div className="flex items-center justify-end gap-3 bg-gray-50 px-6 py-4">
                  {item.status === "MENUNGGU PEMBAYARAN" && (
                    <Link
                      href={`/pembayaran?id=${item.id}`}
                      className="rounded-lg bg-[#063d2b] px-4 py-2 text-xs font-semibold text-white hover:bg-[#052f22]"
                    >
                      Bayar Sekarang
                    </Link>
                  )}
                  {item.status === "TERVERIFIKASI" && (
                    <Link
                      href={`/e-tiket?id=${item.id}`}
                      className="rounded-lg border border-[#063d2b] bg-white px-4 py-2 text-xs font-semibold text-[#063d2b] hover:bg-gray-50"
                    >
                      Lihat E-Tiket
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-[#063d2b]">{value}</p>
    </div>
  );
}