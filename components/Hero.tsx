import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 min-h-[560px] bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/hero-prau.jpg')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 min-h-[560px] bg-black/35" />

      {/* Content */}
      <div className="relative mx-auto flex min-h-[560px] max-w-7xl items-center justify-center px-6 text-center">
        <div className="max-w-3xl text-white">

          <h1 className="text-4xl font-bold leading-tight md:text-6xl">
            Jelajahi Gunung Prau via
            <br />
            Campurejo
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-white/90 md:text-base">
            Temukan informasi pendakian, cek kuota, pesan tiket,
            kenali jalur, dan jelajahi wisata Campurejo.
          </p>

          <div className="mt-8 flex justify-center gap-3">
            <Link
              href="/cek-kuota"
              className="rounded-md bg-[#063d2b] px-6 py-3 text-sm font-semibold text-white hover:bg-[#052f22]"
            >
              Pesan Tiket Pendakian
            </Link>

            <Link
              href="/panduan"
              className="rounded-md border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/20"
            >
              Jelajahi Pendakian
            </Link>
          </div>

        </div>
      </div>

      {/* Status Kuota */}
      <div className="relative z-10 mx-auto -mt-12 max-w-2xl px-6 pb-10">
        <div className="grid grid-cols-1 overflow-hidden rounded-xl bg-white shadow-xl md:grid-cols-2">

          <div className="p-5">
            <p className="text-xs text-gray-500">
              Status Pendakian
            </p>

            <div className="mt-2 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" />

              <span className="font-semibold text-[#063d2b]">
                TERBUKA
              </span>
            </div>
          </div>

          <div className="border-t p-5 md:border-l md:border-t-0">
            <p className="text-xs text-gray-500">
              Kuota Hari Ini
            </p>

            <p className="mt-2 font-semibold text-[#063d2b]">
              80 / 100
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}