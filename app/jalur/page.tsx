import Link from "next/link";
import Navbar from "@/components/Navbar";

const jalur = [
  {
    nama: "Gerbang Pendakian",
    waktu: "30 menit",
    deskripsi: "Gerbang awal menuju jalur pendakian Gunung Prau via Campurejo.",
  },
  {
    nama: "Pos 1 Nganjul",
    waktu: "1 jam menuju Pos 2",
    deskripsi: "Pos pertama setelah melewati Gerbang Pendakian.",
  },
  {
    nama: "Kandang Macan",
    waktu: null,
    deskripsi: "Titik yang berada di antara Pos 1 Nganjul dan Sewu Andam.",
  },
  {
    nama: "Sewu Andam",
    waktu: null,
    deskripsi: "Titik jalur sebelum menuju Pos 2 Sikumbang.",
  },
  {
    nama: "Pos 2 Sikumbang",
    waktu: "45 menit menuju Pos 3",
    deskripsi: "Pos kedua pada jalur pendakian via Campurejo.",
  },
  {
    nama: "Pos Bayangan Panjalu",
    waktu: null,
    deskripsi: "Pos bayangan yang berada setelah Pos 2 Sikumbang.",
  },
  {
    nama: "Pos Air",
    waktu: null,
    deskripsi: "Titik sumber air yang ditandai pada jalur pendakian.",
  },
  {
    nama: "Pos 3 Simpang Buntu",
    waktu: "25 menit menuju Camp Area Radjagesa",
    deskripsi: "Pos ketiga sebelum menuju area Camp Radjagesa.",
  },
  {
    nama: "Puncak Cantigi",
    waktu: "5 menit dari Camp Area Radjagesa",
    deskripsi: "Titik Puncak Cantigi yang berada dekat dengan Area Camp Radjagesa.",
  },
  {
    nama: "Area Camp Radjagesa",
    waktu: "30 menit menuju Sunrise Camp",
    deskripsi: "Area camp sebelum menuju Sunrise Camp.",
  },
  {
    nama: "Pertigaan Kenjuran",
    waktu: null,
    deskripsi: "Persimpangan jalur yang ditandai pada rute pendakian.",
  },
  {
    nama: "Pertigaan Wates",
    waktu: null,
    deskripsi: "Persimpangan sebelum menuju Sunrise Camp.",
  },
  {
    nama: "Sunrise Camp G Prau",
    waktu: "1 jam menuju Puncak Prau",
    deskripsi: "Area camp untuk menuju puncak Gunung Prau.",
  },
  {
    nama: "Puncak G Prau",
    waktu: null,
    deskripsi: "Tujuan akhir jalur dengan ketinggian 2.590 MDPL.",
  },
];

const estimasi = [
  ["Basecamp → Gerbang Pendakian", "15 menit"],
  ["Gerbang Pendakian → Pos 1", "30 menit"],
  ["Pos 1 → Pos 2", "1 jam"],
  ["Pos 2 → Pos 3", "45 menit"],
  ["Pos 3 → Camp Area Radjagesa", "25 menit"],
  ["Camp Area Radjagesa → Puncak Cantigi", "5 menit"],
  ["Camp Area Radjagesa → Sunrise Camp", "30 menit"],
  ["Sunrise Camp → Puncak Prau", "1 jam"],
];

export default function JalurPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f8fcfa]">
        {/* Header */}
        <section className="border-b border-[#dcece5] bg-white">
          <div className="mx-auto max-w-7xl px-6 py-10">

            <div className="mt-7 max-w-3xl">
              <p className="text-sm font-semibold text-[#17634a]">Informasi Jalur Pendakian</p>

              <h1 className="mt-2 text-3xl font-bold text-[#063d2b] md:text-4xl">Gunung Prau via Campurejo</h1>

              <p className="mt-3 text-sm leading-7 text-gray-500 md:text-base">Kenali urutan jalur pendakian dari Basecamp hingga Puncak Gunung Prau melalui jalur Campurejo.</p>
            </div>
          </div>
        </section>

        {/* Informasi utama */}
        <section className="mx-auto max-w-7xl px-6 py-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            {/* Kiri */}
            <div className="space-y-6">
              {/* Overview */}
              <div className="rounded-2xl border border-[#dcece5] bg-white p-6 shadow-sm md:p-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#17634a]">Jalur Pendakian</p>

                    <h2 className="mt-2 text-2xl font-bold text-[#063d2b]">Basecamp Campurejo</h2>

                    <p className="mt-2 text-sm leading-6 text-gray-500">Rute pendakian menuju Puncak G Prau dengan beberapa titik penting sepanjang perjalanan.</p>
                  </div>

                  <div className="rounded-xl bg-[#e9f7f1] px-5 py-4 sm:min-w-[150px]">
                    <p className="text-xs text-gray-500">Ketinggian Puncak</p>

                    <p className="mt-1 text-xl font-bold text-[#063d2b]">2.590 MDPL</p>
                  </div>
                </div>
              </div>

              {/* Jalur */}
              <div className="rounded-2xl border border-[#dcece5] bg-white p-6 shadow-sm md:p-8">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#17634a]">Rute</p>

                  <h2 className="mt-2 text-2xl font-bold text-[#063d2b]">Urutan Jalur Pendakian</h2>

                  <p className="mt-2 text-sm leading-6 text-gray-500">Titik-titik berikut disusun berdasarkan dokumentasi jalur pendakian Campurejo.</p>
                </div>

                <div className="mt-8">
                  {jalur.map((item, index) => {
                    const isLast = index === jalur.length - 1;

                    return (
                      <div key={item.nama} className="relative flex gap-4">
                        {/* Garis */}
                        {!isLast && <div className="absolute left-[15px] top-8 h-[calc(100%-8px)] w-px bg-[#cfe6dc]" />}

                        {/* Nomor */}
                        <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#063d2b] text-xs font-bold text-white">{index + 1}</div>

                        {/* Isi */}
                        <div className={`w-full ${isLast ? "pb-0" : "pb-7"}`}>
                          <div className="rounded-xl border border-[#e5eee9] bg-[#f8fcfa] p-4">
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                              <div>
                                <h3 className="font-semibold text-[#063d2b]">{item.nama}</h3>

                                <p className="mt-1 text-sm leading-6 text-gray-500">{item.deskripsi}</p>
                              </div>

                              {item.waktu && <span className="w-fit shrink-0 rounded-full bg-[#e9f7f1] px-3 py-1 text-xs font-semibold text-[#17634a]">{item.waktu}</span>}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Catatan */}
              <div className="rounded-xl border border-[#cfe6dc] bg-[#e9f7f1] p-5">
                <div className="flex gap-3">
                  <div className="mt-0.5 text-lg">ℹ️</div>

                  <div>
                    <h3 className="font-semibold text-[#063d2b]">Informasi Jalur</h3>

                    <p className="mt-1 text-sm leading-6 text-gray-600">Estimasi waktu merupakan informasi perjalanan pada dokumentasi jalur Campurejo. Kondisi perjalanan dapat berbeda tergantung kondisi pendaki dan situasi jalur.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Kanan */}
            <aside className="h-fit space-y-6 lg:sticky lg:top-24">
              {/* Ringkasan */}
              <div className="rounded-2xl border border-[#dcece5] bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#17634a]">Ringkasan Jalur</p>

                <h2 className="mt-2 text-xl font-bold text-[#063d2b]">Campurejo → Prau</h2>

                <div className="mt-6 space-y-4">
                  <div className="rounded-xl bg-[#f4faf7] p-4">
                    <p className="text-xs text-gray-500">Titik Awal</p>

                    <p className="mt-1 font-semibold text-[#063d2b]">Basecamp Pendakian</p>
                  </div>

                  <div className="rounded-xl bg-[#f4faf7] p-4">
                    <p className="text-xs text-gray-500">Titik Akhir</p>

                    <p className="mt-1 font-semibold text-[#063d2b]">Puncak G Prau</p>
                  </div>

                  <div className="rounded-xl bg-[#f4faf7] p-4">
                    <p className="text-xs text-gray-500">Ketinggian</p>

                    <p className="mt-1 font-semibold text-[#063d2b]">2.590 MDPL</p>
                  </div>
                </div>

                <Link href="/cek-kuota" className="mt-6 block rounded-lg bg-[#063d2b] px-5 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-[#052f22]">Cek Kuota Pendakian</Link>
              </div>

              {/* Estimasi */}
              <div className="rounded-2xl border border-[#dcece5] bg-white p-6 shadow-sm">
                <h2 className="text-lg font-bold text-[#063d2b]">Estimasi Waktu</h2>

                <p className="mt-1 text-xs leading-5 text-gray-500">Estimasi perjalanan berdasarkan dokumentasi jalur.</p>

                <div className="mt-5 space-y-3">
                  {estimasi.map(([rute, waktu]) => (
                    <div key={rute} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-xs leading-5 text-gray-600">{rute}</p>

                        <span className="shrink-0 text-xs font-semibold text-[#17634a]">{waktu}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
