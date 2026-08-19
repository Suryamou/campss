import Link from "next/link";
import {
  FileText,
  CreditCard,
  Stethoscope,
  Ticket,
  UserPlus,
  CalendarDays,
  WalletCards,
  Backpack,
  MapPin,
  ScanLine,
  ShieldCheck,
  Footprints,
  Tent,
  Trash2,
  Route,
  LogOut,
  AlertTriangle,
} from "lucide-react";

import Navbar from "@/components/Navbar";

const langkahPendakian = [
  {
    icon: UserPlus,
    title: "Buat Akun CAMPSS",
    description:
      "Daftarkan diri Anda melalui platform kami. Isi data diri dengan lengkap dan sesuai identitas asli agar proses verifikasi berjalan dengan baik.",
    dark: true,
  },
  {
    icon: CalendarDays,
    title: "Pilih Jadwal & Pesan Tiket",
    description:
      "Cek ketersediaan kuota pada tanggal yang Anda inginkan. Pilih jumlah pendaki dan selesaikan pemesanan.",
    dark: true,
  },
  {
    icon: WalletCards,
    title: "Selesaikan Pembayaran",
    description:
      "Lakukan pembayaran melalui metode yang tersedia (Transfer Bank, E-Wallet). E-Tiket akan otomatis terbit setelah pembayaran terkonfirmasi.",
    dark: true,
  },
  {
    icon: Backpack,
    title: "Persiapan Fisik & Logistik",
    description:
      "Pastikan kondisi fisik prima. Siapkan perlengkapan standar pendakian (tenda, sleeping bag, jaket tebal) dan logistik yang cukup.",
    dark: false,
  },
  {
    icon: MapPin,
    title: "Tiba di Basecamp Campurejo",
    description:
      "Lapor kedatangan Anda di pos utama Basecamp Campurejo. Siapkan E-Tiket dan dokumen identitas fisik.",
    dark: false,
  },
  {
    icon: ScanLine,
    title: "Scan Tiket Keberangkatan",
    description:
      "Petugas akan melakukan scan QR code pada E-Tiket Anda. Status Anda di sistem akan berubah menjadi 'Sedang Mendaki'.",
    dark: true,
  },
  {
    icon: ShieldCheck,
    title: "Briefing Keselamatan",
    description:
      "Ikuti arahan petugas dan pastikan Anda memahami kondisi jalur, area camping, dan aturan pelestarian lingkungan.",
    dark: false,
  },
  {
    icon: Footprints,
    title: "Mulai Pendakian",
    description:
      "Ikuti jalur resmi yang telah ditentukan dengan membuka jalur baru dan selalu patuhi rambu jalur.",
    dark: false,
  },
  {
    icon: Tent,
    title: "Camping di Area Resmi",
    description:
      "Dirikan tenda hanya di area camp yang telah ditentukan (Camp Area). Jaga ketenangan dan kebersihan lingkungan.",
    dark: false,
  },
  {
    icon: Trash2,
    title: "Bawa Turun Sampah",
    description:
      "Bawa semua sampah plastik dan sisa makanan Anda. Jangan tinggalkan apapun selain jejak kaki.",
    dark: false,
  },
  {
    icon: Route,
    title: "Perjalanan Turun",
    description:
      "Berhati-hati saat turun, terutama jika jalur licin. Pastikan seluruh anggota rombongan turun bersama-sama.",
    dark: false,
  },
  {
    icon: LogOut,
    title: "Lapor Kembali (Scan Out)",
    description:
      "Tiba di basecamp, segera lapor ke pos jaga dan lakukan scan QR code untuk kembali. Status Anda akan tercatat telah kembali dengan selamat dan proses pendakian selesai.",
    dark: true,
  },
];

export default function PanduanPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f4f1eb]">
        {/* HEADER */}
        <section className="border-b border-[#e3dfd7] bg-[#f4f1eb]">
          <div className="mx-auto max-w-7xl px-6 py-12 text-center">
            <h1 className="text-2xl font-bold text-[#063d2b] md:text-3xl">
              Panduan Pendakian
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-500">
              Persiapkan pendakian Anda di Gunung Prau via Campurejo
              dengan panduan langkah demi langkah ini. Keselamatan
              dan kenyamanan Anda adalah prioritas kami.
            </p>
          </div>
        </section>

        {/* CONTENT */}
        <section className="mx-auto max-w-7xl px-6 py-10">
          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            {/* LEFT SIDEBAR */}
            <aside className="h-fit">
              <div className="rounded-xl bg-[#dff7ec] p-6">
                <h2 className="text-base font-bold text-[#063d2b]">
                  Dokumen Diperlukan
                </h2>

                <div className="mt-5 space-y-5">
                  {/* KTP */}
                  <div className="flex gap-3">
                    <CreditCard
                      size={17}
                      className="mt-0.5 shrink-0 text-[#063d2b]"
                    />

                    <div>
                      <p className="text-sm font-semibold text-[#063d2b]">
                        KTP / Kartu Identitas
                      </p>

                      <p className="mt-1 text-xs leading-5 text-gray-600">
                        Wajib dibawa oleh setiap pendaki.
                      </p>
                    </div>
                  </div>

                  {/* SURAT SEHAT */}
                  <div className="flex gap-3">
                    <Stethoscope
                      size={17}
                      className="mt-0.5 shrink-0 text-[#063d2b]"
                    />

                    <div>
                      <p className="text-sm font-semibold text-[#063d2b]">
                        Surat Sehat
                      </p>

                      <p className="mt-1 text-xs leading-5 text-gray-600">
                        Dari puskesmas atau klinik terdekat
                        (maks. 3 hari sebelum).
                      </p>
                    </div>
                  </div>

                  {/* E-TIKET */}
                  <div className="flex gap-3">
                    <Ticket
                      size={17}
                      className="mt-0.5 shrink-0 text-[#063d2b]"
                    />

                    <div>
                      <p className="text-sm font-semibold text-[#063d2b]">
                        E-Tiket CAMPSS
                      </p>

                      <p className="mt-1 text-xs leading-5 text-gray-600">
                        Disimpan di HP atau dicetak untuk dibawa
                        saat pendakian.
                      </p>
                    </div>
                  </div>
                </div>

                {/* PERHATIAN */}
                <div className="mt-7 border-l-2 border-[#063d2b] bg-[#cdeedc] p-4">
                  <div className="flex gap-2">
                    <AlertTriangle
                      size={14}
                      className="mt-0.5 shrink-0 text-[#063d2b]"
                    />

                    <div>
                      <p className="text-xs font-semibold text-[#063d2b]">
                        Perhatian
                      </p>

                      <p className="mt-2 text-[11px] leading-5 text-gray-600">
                        Pastikan semua dokumen fisik maupun digital
                        tersedia dan dapat ditunjukkan saat proses
                        pemeriksaan.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* TIMELINE */}
            <div className="rounded-xl bg-[#dff7ec] p-6 md:p-8">
              <h2 className="text-lg font-semibold text-[#063d2b]">
                Langkah Pendakian
              </h2>

              <div className="relative mt-7">
                {/* GARIS TIMELINE */}
                <div className="absolute bottom-5 left-[15px] top-5 w-px bg-[#b9d9ca]" />

                <div className="space-y-7">
                  {langkahPendakian.map((langkah, index) => {
                    const Icon = langkah.icon;

                    return (
                      <div
                        key={langkah.title}
                        className="relative flex gap-4"
                      >
                        {/* ICON */}
                        <div
                          className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${
                            langkah.dark
                              ? "border-[#063d2b] bg-[#063d2b] text-white"
                              : "border-[#063d2b] bg-[#e8f8f0] text-[#063d2b]"
                          }`}
                        >
                          <Icon size={15} />
                        </div>

                        {/* TEXT */}
                        <div className="pt-0.5">
                          <h3 className="text-sm font-semibold text-[#063d2b]">
                            {langkah.title}
                          </h3>

                          <p className="mt-1 max-w-3xl text-xs leading-5 text-gray-600">
                            {langkah.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-8 bg-[#d9f1e4]">
          <div className="mx-auto max-w-7xl px-6 py-10 text-center">
            <p className="text-lg font-bold text-[#063d2b]">
              CAMPSS
            </p>

            <p className="mt-2 text-xs text-gray-500">
              Campurejo Mountain Hiking Information System
            </p>

            <div className="mt-5 flex flex-wrap justify-center gap-5 text-xs text-gray-500">
              <Link
                href="/"
                className="transition hover:text-[#063d2b]"
              >
                Tentang Kami
              </Link>

              <Link
                href="/jalur"
                className="transition hover:text-[#063d2b]"
              >
                Kebijakan Privasi
              </Link>

              <Link
                href="/panduan"
                className="transition hover:text-[#063d2b]"
              >
                Syarat & Ketentuan
              </Link>

              <Link
                href="/"
                className="transition hover:text-[#063d2b]"
              >
                Hubungi Kami
              </Link>
            </div>

            <p className="mt-6 text-[11px] text-gray-400">
              © 2026 CAMPSS - Campurejo Mountain Hiking Information
              System. Semua Hak Dilindungi.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}