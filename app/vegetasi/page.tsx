"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";

const dataVegetasi = [
  {
    id: 1,
    nama: "Kopi Arabika",
    namaLatin: "Coffea arabica",
    kategori: "Flora Pegunungan",
    foto: "/images/vegetasi/kopi-arabika.jpg",
    deskripsi:
      "Ditemukan di sepanjang jalur pendakian Gunung Prau via Campurejo. Kopi Arabika bukan sekadar tanaman biasa, melainkan bagian dari ekosistem dan kehidupan masyarakat lokal.",
    peran:
      "Menjaga stabilitas tanah di lereng gunung dan berfungsi sebagai penyerap karbon yang sangat efektif, membantu menyeimbangkan iklim mikro di area pegunungan.",
    lokasi:
      "Dapat dijumpai di area sekitar Pos 1 hingga Pos 2 jalur pendakian Campurejo.",
    manfaat:
      "Merupakan sumber ekonomi utama bagi masyarakat lokal Campurejo dan diolah menjadi minuman khas yang menyenangkan bagi para pendaki.",
    fakta:
      "Kopi Arabika yang ditanam di ketinggian Prau memiliki profil rasa yang sangat unik. Hal ini dipengaruhi oleh kombinasi tanah vulkanik yang subur dan suhu udara pegunungan yang sejuk.",
  },
  {
    id: 2,
    nama: "Vegetasi 02",
    namaLatin: "Nama ilmiah",
    kategori: "Flora Pegunungan",
    foto: "/images/vegetasi/vegetasi-02.jpg",
    deskripsi:
      "Informasi mengenai vegetasi ini akan ditampilkan berdasarkan dokumentasi dan data yang tersedia di kawasan Gunung Prau via Campurejo.",
    peran:
      "Informasi mengenai peran ekologis vegetasi akan ditampilkan berdasarkan data yang tersedia.",
    lokasi:
      "Lokasi vegetasi akan ditampilkan berdasarkan dokumentasi kawasan pendakian.",
    manfaat:
      "Manfaat vegetasi bagi lingkungan maupun masyarakat sekitar akan dijelaskan di sini.",
    fakta:
      "Fakta menarik mengenai vegetasi ini akan ditambahkan berdasarkan dokumentasi yang tersedia.",
  },
  {
    id: 3,
    nama: "Vegetasi 03",
    namaLatin: "Nama ilmiah",
    kategori: "Flora Pegunungan",
    foto: "/images/vegetasi/vegetasi-03.jpg",
    deskripsi:
      "Informasi mengenai vegetasi ini akan ditampilkan berdasarkan dokumentasi dan data yang tersedia di kawasan Gunung Prau via Campurejo.",
    peran:
      "Informasi mengenai peran ekologis vegetasi akan ditampilkan berdasarkan data yang tersedia.",
    lokasi:
      "Lokasi vegetasi akan ditampilkan berdasarkan dokumentasi kawasan pendakian.",
    manfaat:
      "Manfaat vegetasi bagi lingkungan maupun masyarakat sekitar akan dijelaskan di sini.",
    fakta:
      "Fakta menarik mengenai vegetasi ini akan ditambahkan berdasarkan dokumentasi yang tersedia.",
  },
  {
    id: 4,
    nama: "Vegetasi 04",
    namaLatin: "Nama ilmiah",
    kategori: "Flora Pegunungan",
    foto: "/images/vegetasi/vegetasi-04.jpg",
    deskripsi:
      "Informasi mengenai vegetasi ini akan ditampilkan berdasarkan dokumentasi dan data yang tersedia di kawasan Gunung Prau via Campurejo.",
    peran:
      "Informasi mengenai peran ekologis vegetasi akan ditampilkan berdasarkan data yang tersedia.",
    lokasi:
      "Lokasi vegetasi akan ditampilkan berdasarkan dokumentasi kawasan pendakian.",
    manfaat:
      "Manfaat vegetasi bagi lingkungan maupun masyarakat sekitar akan dijelaskan di sini.",
    fakta:
      "Fakta menarik mengenai vegetasi ini akan ditambahkan berdasarkan dokumentasi yang tersedia.",
  },
  {
    id: 5,
    nama: "Vegetasi 05",
    namaLatin: "Nama ilmiah",
    kategori: "Flora Pegunungan",
    foto: "/images/vegetasi/vegetasi-05.jpg",
    deskripsi:
      "Informasi mengenai vegetasi ini akan ditampilkan berdasarkan dokumentasi dan data yang tersedia di kawasan Gunung Prau via Campurejo.",
    peran:
      "Informasi mengenai peran ekologis vegetasi akan ditampilkan berdasarkan data yang tersedia.",
    lokasi:
      "Lokasi vegetasi akan ditampilkan berdasarkan dokumentasi kawasan pendakian.",
    manfaat:
      "Manfaat vegetasi bagi lingkungan maupun masyarakat sekitar akan dijelaskan di sini.",
    fakta:
      "Fakta menarik mengenai vegetasi ini akan ditambahkan berdasarkan dokumentasi yang tersedia.",
  },
  {
    id: 6,
    nama: "Vegetasi 06",
    namaLatin: "Nama ilmiah",
    kategori: "Flora Pegunungan",
    foto: "/images/vegetasi/vegetasi-06.jpg",
    deskripsi:
      "Informasi mengenai vegetasi ini akan ditampilkan berdasarkan dokumentasi dan data yang tersedia di kawasan Gunung Prau via Campurejo.",
    peran:
      "Informasi mengenai peran ekologis vegetasi akan ditampilkan berdasarkan data yang tersedia.",
    lokasi:
      "Lokasi vegetasi akan ditampilkan berdasarkan dokumentasi kawasan pendakian.",
    manfaat:
      "Manfaat vegetasi bagi lingkungan maupun masyarakat sekitar akan dijelaskan di sini.",
    fakta:
      "Fakta menarik mengenai vegetasi ini akan ditambahkan berdasarkan dokumentasi yang tersedia.",
  },
];

export default function VegetasiPage() {
  const [vegetasiAktif, setVegetasiAktif] = useState(dataVegetasi[0]);

  return (
    <>
      {/* NAVBAR CAMPSS */}
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
                Kenali berbagai vegetasi yang dapat ditemukan di sekitar
                kawasan pendakian Gunung Prau via Campurejo.
              </p>
            </div>
          </div>
        </section>

        {/* VEGETASI UTAMA */}
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

                <h3 className="text-sm font-semibold text-[#063d2b]">
                  Peran Ekologis
                </h3>
              </div>

              <p className="mt-3 text-xs leading-5 text-gray-500">
                {vegetasiAktif.peran}
              </p>
            </div>

            {/* LOKASI */}
            <div className="rounded-lg bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#17634a]">⌖</span>

                <h3 className="text-sm font-semibold text-[#063d2b]">
                  Lokasi
                </h3>
              </div>

              <p className="mt-3 text-xs leading-5 text-gray-500">
                {vegetasiAktif.lokasi}
              </p>
            </div>

            {/* MANFAAT */}
            <div className="rounded-lg bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#17634a]">♡</span>

                <h3 className="text-sm font-semibold text-[#063d2b]">
                  Manfaat
                </h3>
              </div>

              <p className="mt-3 text-xs leading-5 text-gray-500">
                {vegetasiAktif.manfaat}
              </p>
            </div>

            {/* FAKTA MENARIK */}
            <div className="rounded-lg bg-[#063d2b] p-5 text-white shadow-sm">
              <div className="flex items-center gap-2">
                <span className="text-sm text-emerald-300">✦</span>

                <h3 className="text-sm font-semibold">
                  Fakta Menarik
                </h3>
              </div>

              <p className="mt-3 text-xs leading-5 text-white/70">
                {vegetasiAktif.fakta}
              </p>
            </div>
          </div>
        </section>

        {/* DAFTAR VEGETASI */}
        <section className="bg-white py-14">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#17634a]">
                Koleksi Vegetasi
              </p>

              <h2 className="mt-2 text-2xl font-bold text-[#063d2b] md:text-3xl">
                Vegetasi di Sekitar Campurejo
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                Pilih salah satu vegetasi untuk melihat informasi
                lengkapnya.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {dataVegetasi.map((item) => {
                const aktif = vegetasiAktif.id === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setVegetasiAktif(item);

                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
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
                      />
                    </div>

                    {/* CARD INFO */}
                    <div className="p-5">
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-[#17634a]">
                        {item.kategori}
                      </span>

                      <h3 className="mt-2 font-bold text-[#063d2b]">
                        {item.nama}
                      </h3>

                      <p className="mt-1 text-xs italic text-gray-400">
                        {item.namaLatin}
                      </p>

                      <p className="mt-3 text-xs leading-5 text-gray-500">
                        Klik untuk melihat informasi vegetasi.
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* KONSERVASI */}
        <section className="mx-auto max-w-7xl px-6 py-10">
          <div className="rounded-xl bg-[#d5eee3] px-7 py-10 md:px-10">
            <div className="grid items-center gap-8 md:grid-cols-[1fr_180px]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#17634a]">
                  Pelestarian Alam
                </p>

                <h2 className="mt-2 text-2xl font-bold text-[#063d2b] md:text-3xl">
                  Pentingnya Konservasi
                </h2>

                <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-600">
                  Melindungi kawasan Gunung Prau berarti ikut menjaga
                  keseimbangan ekosistem dan keberlangsungan lingkungan
                  bagi generasi mendatang. Jangan merusak vegetasi,
                  jangan membuang sampah sembarangan, dan tetap hormati
                  kawasan pendakian.
                </p>
              </div>

              <div className="flex justify-center">
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[#c4e5d7] text-6xl">
                  🌱
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-7xl px-6 pb-16">
          <div className="rounded-xl border border-[#cfe6dc] bg-white p-7 text-center shadow-sm">
            <h2 className="text-xl font-bold text-[#063d2b]">
              Kenali alam sebelum menjelajahinya.
            </h2>

            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-gray-500">
              Pelajari jalur pendakian dan persiapkan perjalananmu
              sebelum menuju Gunung Prau via Campurejo.
            </p>

            <Link
              href="/jalur"
              className="mt-5 inline-block rounded-lg bg-[#063d2b] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#052f22]"
            >
              Lihat Jalur Pendakian
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}