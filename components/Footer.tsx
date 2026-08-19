import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white">
      {/* FOOTER UTAMA */}
      <div className="border-t border-[#dcece5] px-6 py-14">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* BRAND */}
          <div>
            <Link
              href="/"
              className="flex items-center gap-3"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#063d2b] text-lg font-black text-white shadow-lg shadow-emerald-900/20">
                C
              </span>

              <span className="text-2xl font-bold text-[#063d2b]">
                CAMPSS
              </span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-6 text-gray-500">
              Campurejo Mountain Hiking Information System. Sistem
              informasi pendakian Gunung Prau via Campurejo.
            </p>
          </div>

          {/* INFORMASI */}
          <div>
            <h3 className="text-lg font-semibold text-[#063d2b]">
              Informasi
            </h3>

            <div className="mt-5 space-y-3 text-sm text-gray-600">
              <Link
                href="/jalur"
                className="block transition hover:text-[#17634a]"
              >
                Jalur Pendakian
              </Link>

              <Link
                href="/cek-kuota"
                className="block transition hover:text-[#17634a]"
              >
                Cek Kuota
              </Link>

              <Link
                href="/vegetasi"
                className="block transition hover:text-[#17634a]"
              >
                Vegetasi
              </Link>

              <Link
                href="/panduan"
                className="block transition hover:text-[#17634a]"
              >
                Panduan Pendakian
              </Link>
            </div>
          </div>

          {/* LINK TERKAIT */}
          <div>
            <h3 className="text-lg font-semibold text-[#063d2b]">
              Link Terkait
            </h3>

            <div className="mt-5 space-y-3 text-sm text-gray-600">
              <a
                href="#wisata"
                className="block transition hover:text-[#17634a]"
              >
                Wisata Sekitar
              </a>

              <Link
                href="/pemesanan"
                className="block transition hover:text-[#17634a]"
              >
                Pemesanan Tiket
              </Link>

              <Link
                href="/riwayat-pemesanan"
                className="block transition hover:text-[#17634a]"
              >
                Riwayat Pemesanan
              </Link>

              <Link
                href="/e-tiket"
                className="block transition hover:text-[#17634a]"
              >
                E-Tiket
              </Link>
            </div>
          </div>

          {/* KONTAK */}
          <div>
            <h3 className="text-lg font-semibold text-[#063d2b]">
              Basecamp Campurejo
            </h3>

            <div className="mt-5 space-y-4 text-sm text-gray-600">
              <div className="flex gap-3">
                <span className="mt-0.5">📍</span>

                <p className="leading-6">
                  Basecamp Pendakian Gunung Prau via Campurejo
                </p>
              </div>

              <div className="flex gap-3">
                <span className="mt-0.5">🏔️</span>

                <p className="leading-6">
                  Gunung Prau
                  <br />
                  Jalur Pendakian Campurejo
                </p>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm font-medium text-gray-500">
                Ikuti informasi terbaru
              </p>

              <div className="mt-3 flex gap-3">
                <a
                  href="#"
                  aria-label="Instagram CAMPSS"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#dcece5] bg-[#f8fcfa] text-sm font-semibold text-[#063d2b] transition hover:bg-[#063d2b] hover:text-white"
                >
                  IG
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER BAWAH */}
      <div className="bg-[#063d2b] px-6 py-5">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-white/80 md:flex-row md:items-center md:justify-between">
          <p>
            © 2026 CAMPSS • Basecamp Campurejo
          </p>

          <p className="text-white/60">
            Informasi Pendakian Gunung Prau via Campurejo
          </p>
        </div>
      </div>
    </footer>
  );
}