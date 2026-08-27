"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import VegetationScanner from "@/components/VegetationScanner";
import { readVegetationHistory, saveVegetationView } from "@/lib/vegetasi";
import { useEffect, useState } from "react";

export default function VegetasiPage() {
  const [dataVegetasi, setDataVegetasi] = useState<any[]>([]);
  const [vegetasiAktif, setVegetasiAktif] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const [learnedSlugs, setLearnedSlugs] = useState<string[]>([]);

  useEffect(() => {
    // Only access localStorage on client-side
    setLearnedSlugs(readVegetationHistory().map((item) => item.slug));
    
    async function fetchVegetasi() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/vegetasi`);
        if (res.ok) {
          const json = await res.json();
          if (json.data && json.data.length > 0) {
            const mappedData = json.data.map((item: any) => ({
              id: item.id,
              nama: item.nama,
              namaLatin: item.nama_latin || item.namaLatin || "-",
              kategori: item.kategori || "Flora Gunung Prau",
              foto: item.foto ? (item.foto.startsWith('http') ? item.foto : `/storage/${item.foto}`) : "/images/placeholder.jpg",
              deskripsi: item.deskripsi || "Tidak ada deskripsi tersedia.",
              peran: item.peran || "Menjaga keseimbangan ekosistem pegunungan.",
              lokasi: item.lokasi || "Jalur pendakian Gunung Prau",
              manfaat: item.manfaat || "Sebagai bagian dari keanekaragaman hayati.",
              fakta: item.fakta || "Flora pegunungan memiliki adaptasi khusus terhadap cuaca dingin.",
              slug: item.slug || item.nama.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
            }));
            setDataVegetasi(mappedData);
            setVegetasiAktif(mappedData[0]);
          }
        }
      } catch (error) {
        console.error("Gagal mengambil data vegetasi", error);
      } finally {
        setLoading(false);
      }
    }
    fetchVegetasi();
  }, []);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#e9f9f2] text-[#063d2b]">
        {/* INTRO */}
        <section className="border-b border-[#cfe8dc] bg-white">
          <div className="mx-auto max-w-7xl px-6 py-10">
            <div className="mt-7">
              <p className="text-sm font-semibold text-[#17634a]">
                Flora Gunung Prau
              </p>
              <h1 className="mt-2 text-3xl font-bold md:text-4xl">
                Vegetasi Gunung Prau
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500">
                Kenali lebih dekat ragam jenis tanaman dan vegetasi yang akan Anda temui di sepanjang jalur pendakian Gunung Prau via Campurejo.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pt-10">
          <VegetationScanner />
          <p className="mt-3 text-xs text-gray-500">
            Sudah dipelajari: {learnedSlugs.length} vegetasi
          </p>
        </section>

        {loading ? (
          <section className="mx-auto max-w-7xl px-6 py-20 text-center">
            <p className="text-gray-500">Memuat data vegetasi...</p>
          </section>
        ) : dataVegetasi.length === 0 ? (
          <section className="mx-auto max-w-7xl px-6 py-20 text-center">
            <p className="text-gray-500">Belum ada data vegetasi yang tersedia.</p>
          </section>
        ) : (
          <>
            {/* VEGETASI UTAMA */}
            {vegetasiAktif && (
              <section className="mx-auto max-w-7xl px-6 py-10">
                <div className="grid overflow-hidden rounded-2xl bg-white shadow-sm lg:grid-cols-[1.05fr_1fr]">
                  {/* FOTO */}
                  <div className="relative min-h-[300px] bg-gray-100 md:min-h-[390px]">
                    <Image
                      src={vegetasiAktif.foto}
                      alt={vegetasiAktif.nama}
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>

                  {/* DESKRIPSI */}
                  <div className="flex flex-col justify-center p-7 md:p-10">
                    <span className="w-fit rounded-full bg-[#e5f5ee] px-3 py-1 text-[10px] font-semibold text-[#17634a]">
                      {vegetasiAktif.kategori}
                    </span>
                    <h2 className="mt-4 text-3xl font-bold text-[#063d2b]">
                      {vegetasiAktif.nama}
                    </h2>
                    <p className="mt-1 text-sm italic text-gray-500">
                      {vegetasiAktif.namaLatin}
                    </p>
                    <p className="mt-5 text-sm leading-6 text-gray-600">
                      {vegetasiAktif.deskripsi}
                    </p>
                  </div>
                </div>

                {/* INFORMASI */}
                <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                  {/* PERAN EKOLOGIS */}
                  <div className="rounded-lg bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-[#17634a]">♧</span>
                      <h3 className="text-sm font-semibold text-[#063d2b]">Peran Ekologis</h3>
                    </div>
                    <p className="mt-3 text-xs leading-5 text-gray-500">{vegetasiAktif.peran}</p>
                  </div>

                  {/* LOKASI */}
                  <div className="rounded-lg bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-[#17634a]">⌖</span>
                      <h3 className="text-sm font-semibold text-[#063d2b]">Lokasi</h3>
                    </div>
                    <p className="mt-3 text-xs leading-5 text-gray-500">{vegetasiAktif.lokasi}</p>
                  </div>

                  {/* MANFAAT */}
                  <div className="rounded-lg bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-[#17634a]">♡</span>
                      <h3 className="text-sm font-semibold text-[#063d2b]">Manfaat</h3>
                    </div>
                    <p className="mt-3 text-xs leading-5 text-gray-500">{vegetasiAktif.manfaat}</p>
                  </div>

                  {/* FAKTA MENARIK */}
                  <div className="rounded-lg bg-[#063d2b] p-5 text-white shadow-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-emerald-300">✦</span>
                      <h3 className="text-sm font-semibold">Fakta Menarik</h3>
                    </div>
                    <p className="mt-3 text-xs leading-5 text-white/70">{vegetasiAktif.fakta}</p>
                  </div>
                </div>
              </section>
            )}

            {/* DAFTAR VEGETASI */}
            <section className="bg-white py-14">
              <div className="mx-auto max-w-7xl px-6">
                <div className="mb-8">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#17634a]">Koleksi Vegetasi</p>
                  <h2 className="mt-2 text-2xl font-bold text-[#063d2b] md:text-3xl">Vegetasi di Sekitar Campurejo</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">Pilih salah satu vegetasi untuk melihat informasi lengkapnya.</p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {dataVegetasi.map((item) => {
                    const aktif = vegetasiAktif?.id === item.id;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setVegetasiAktif(item);
                          const learnedSlug = item.slug;

                          saveVegetationView(learnedSlug);
                          setLearnedSlugs((current) =>
                            current.includes(learnedSlug) ? current : [...current, learnedSlug]
                          );

                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className={`group overflow-hidden rounded-xl border text-left transition ${
                          aktif
                            ? "border-[#17634a] bg-[#f0faf6] shadow-md"
                            : "border-[#dcece5] bg-white hover:-translate-y-1 hover:shadow-md"
                        }`}
                      >
                        {/* FOTO CARD */}
                        <div className="relative h-48 overflow-hidden bg-gray-100">
                          <Image
                            src={item.foto}
                            alt={item.nama}
                            fill
                            className="object-cover transition duration-300 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>

                        {/* CARD INFO */}
                        <div className="p-5">
                          <span className="text-[10px] font-semibold uppercase tracking-wide text-[#17634a]">{item.kategori}</span>
                          <h3 className="mt-2 font-bold text-[#063d2b]">{item.nama}</h3>
                          <p className="mt-1 text-xs italic text-gray-400">{item.namaLatin}</p>
                          <p className="mt-3 text-xs leading-5 text-gray-500">Klik untuk melihat informasi vegetasi.</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>
          </>
        )}

        {/* KONSERVASI */}
        <section className="mx-auto max-w-7xl px-6 py-10">
          <div className="overflow-hidden rounded-2xl border border-[#cfe6dc] bg-white shadow-sm">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
              <div className="relative min-h-[270px] overflow-hidden bg-[#063d2b]">
                <Image src="/images/hero-prau.jpg" alt="Lanskap Gunung Prau" fill className="object-cover" />
                <div className="absolute inset-0 bg-[#063d2b]/35" />
                <div className="absolute bottom-6 left-6 right-6 text-white md:left-8 md:right-8">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-100">Menjaga yang kita lewati</p>
                  <p className="mt-2 max-w-xs text-lg font-semibold leading-7">Gunung yang baik untuk didaki, juga baik untuk ditinggalkan.</p>
                </div>
              </div>

              <div className="p-7 md:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#17634a]">Pelestarian Alam</p>
                <h2 className="mt-3 text-2xl font-bold text-[#063d2b] md:text-3xl">Pentingnya Konservasi</h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-600">
                  Setiap langkah di jalur pendakian meninggalkan pengaruh. Dengan mengenali vegetasi dan memperlakukannya dengan hormat, kita ikut menjaga air, tanah, dan rumah bagi banyak makhluk hidup di Gunung Prau.
                </p>

                <div className="mt-7 grid gap-4 border-t border-[#e3f0e9] pt-6 sm:grid-cols-3">
                  <div>
                    <p className="text-lg font-bold text-[#17634a]">01</p>
                    <p className="mt-1 text-xs font-semibold text-[#063d2b]">Tetap di jalur</p>
                    <p className="mt-1 text-xs leading-5 text-gray-500">Lindungi tunas dan tanaman di tepi trek.</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-[#17634a]">02</p>
                    <p className="mt-1 text-xs font-semibold text-[#063d2b]">Bawa kembali sampah</p>
                    <p className="mt-1 text-xs leading-5 text-gray-500">Yang dibawa naik, dibawa turun kembali.</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-[#17634a]">03</p>
                    <p className="mt-1 text-xs font-semibold text-[#063d2b]">Jangan mengambil</p>
                    <p className="mt-1 text-xs leading-5 text-gray-500">Biarkan flora tetap tumbuh di habitatnya.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-7xl px-6 pb-16">
          <div className="rounded-xl border border-[#cfe6dc] bg-white p-7 text-center shadow-sm">
            <h2 className="text-xl font-bold text-[#063d2b]">Kenali alam sebelum menjelajahinya.</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-gray-500">
              Pelajari jalur pendakian dan persiapkan perjalananmu sebelum menuju Gunung Prau via Campurejo.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
