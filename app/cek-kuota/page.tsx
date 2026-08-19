import Link from "next/link";
import Navbar from "@/components/Navbar";

const jadwal = [
  {
    tanggal: "12",
    hari: "SEL",
    status: "Tersedia",
    kuota: 70,
    maksimal: 100,
  },
  {
    tanggal: "13",
    hari: "RAB",
    status: "Tersedia",
    kuota: 42,
    maksimal: 100,
  },
  {
    tanggal: "14",
    hari: "KAM",
    status: "Hampir Penuh",
    kuota: 8,
    maksimal: 100,
  },
  {
    tanggal: "15",
    hari: "JUM",
    status: "Penuh",
    kuota: 0,
    maksimal: 100,
  },
];

export default function CekKuotaPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#f4faf7]">

      {/* Header */}
      <section className="border-b border-[#dcece5] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10">

          <h1 className="mt-5 text-3xl font-bold text-[#063d2b] md:text-4xl">
            Cek Kuota Pendakian
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
            Pilih tanggal pendakian untuk melihat ketersediaan
            kuota Gunung Prau via Campurejo.
          </p>

        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-6 py-10">

        {/* Bulan */}
        <div className="mb-6 flex items-center justify-between rounded-xl bg-white p-5 shadow-sm">

          <button
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50"
            aria-label="Bulan sebelumnya"
          >
            ←
          </button>

          <h2 className="font-semibold text-[#063d2b]">
            Agustus 2026
          </h2>

          <button
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50"
            aria-label="Bulan berikutnya"
          >
            →
          </button>

        </div>

        {/* Daftar jadwal */}
        <div className="grid gap-4">

          {jadwal.map((item) => {

            const penuh = item.kuota === 0;
            const hampirPenuh =
              item.kuota > 0 && item.kuota <= 10;

            return (
              <div
                key={item.tanggal}
                className="rounded-xl border border-[#dcece5] bg-white p-5 shadow-sm"
              >

                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                  {/* Tanggal */}
                  <div className="flex items-center gap-4">

                    <div className="flex h-16 w-16 flex-col items-center justify-center rounded-xl bg-[#e5f4ee]">

                      <span className="text-xs font-medium text-[#17634a]">
                        {item.hari}
                      </span>

                      <span className="text-xl font-bold text-[#063d2b]">
                        {item.tanggal}
                      </span>

                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[#063d2b]">
                        Pendakian Gunung Prau
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        Via Basecamp Campurejo
                      </p>
                    </div>

                  </div>

                  {/* Kuota */}
                  <div className="min-w-[180px]">

                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">
                        Sisa Kuota
                      </span>

                      <span className="font-semibold text-[#063d2b]">
                        {item.kuota} / {item.maksimal}
                      </span>
                    </div>

                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">

                      <div
                        className="h-full rounded-full bg-[#17634a]"
                        style={{
                          width: `${(item.kuota / item.maksimal) * 100}%`,
                        }}
                      />

                    </div>

                  </div>

                  {/* Status + tombol */}
                  <div className="flex items-center gap-4">

                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                        penuh
                          ? "bg-red-100 text-red-700"
                          : hampirPenuh
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {penuh
                        ? "Penuh"
                        : hampirPenuh
                        ? "Hampir Penuh"
                        : "Tersedia"}
                    </span>

                    <Link
                      href={penuh ? "#" : "/pemesanan"}
                      className={`rounded-lg px-4 py-2.5 text-sm font-semibold ${
                        penuh
                          ? "pointer-events-none bg-gray-100 text-gray-400"
                          : "bg-[#063d2b] text-white hover:bg-[#052f22]"
                      }`}
                    >
                      {penuh ? "Tidak Tersedia" : "Pesan Tiket"}
                    </Link>

                  </div>

                </div>

              </div>
            );
          })}

        </div>

        {/* Informasi */}
        <div className="mt-8 rounded-xl border border-[#cfe6dc] bg-[#e9f7f1] p-5">

          <h3 className="font-semibold text-[#063d2b]">
            Informasi Kuota
          </h3>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            Kuota pendakian dapat berubah sewaktu-waktu sesuai
            pengaturan pihak Basecamp Campurejo. Pastikan memilih
            tanggal yang tersedia sebelum melakukan pemesanan.
          </p>

        </div>

      </section>

      </main>
    </>
  );
}