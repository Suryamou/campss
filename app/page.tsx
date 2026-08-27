"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import SectionBasecamp from "@/components/SectionBasecamp";
import SectionPickup from "@/components/SectionPickup";
import FloatingWA from "@/components/FloatingWA";

type Wisata = {
  nama: string;
  foto: string;
  lokasi: string;
  deskripsi: string;
  tiket: string;
  jam: string;
  kategori: string;
};

const wisataSekitar: Wisata[] = [
  {
    nama: "mBETENG SATA",
    foto: "/images/mbeteng-sata.jpeg",
    lokasi: "Campurejo, Tretep, Temanggung",
    deskripsi:
      "Destinasi wisata alam di sekitar kawasan Campurejo yang dapat menjadi pilihan untuk dikunjungi sebelum atau setelah pendakian.",
    tiket: "Informasi tarif tersedia di lokasi",
    jam: "Menyesuaikan operasional lokasi",
    kategori: "Wisata Alam",
  },
  {
    nama: "MBARISAN",
    foto: "/images/mbarisan.jpeg",
    lokasi: "Sekitar kawasan Campurejo",
    deskripsi:
      "Salah satu pilihan destinasi di sekitar kawasan Campurejo untuk menikmati suasana alam dan pemandangan pegunungan.",
    tiket: "Informasi tarif tersedia di lokasi",
    jam: "Menyesuaikan operasional lokasi",
    kategori: "Wisata Alam",
  },
];

export default function Home() {
  const [wisataTerpilih, setWisataTerpilih] =
    useState<Wisata | null>(null);

  return (
    <>
      <Navbar />

      <main>
        {/* HERO - TETAP PAKAI KOMPONEN YANG SUDAH ADA */}
        <Hero />

        {/* OVERVIEW */}
        <section className="bg-white px-6 py-20">
          <div className="mx-auto max-w-7xl">

            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-[#17634a]">
                Tentang CAMPSS
              </p>

              <h2 className="mt-2 text-2xl font-bold text-[#063d2b] md:text-3xl">
                Semua yang Kamu Butuhkan untuk Pendakian
              </h2>

              <p className="mt-4 text-sm leading-7 text-gray-600">
                CAMPSS membantu pendaki mendapatkan informasi
                mengenai pendakian Gunung Prau via Campurejo,
                mulai dari informasi jalur, kuota, vegetasi,
                panduan pendakian, hingga destinasi wisata di
                sekitar kawasan Campurejo.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">

              <div className="rounded-2xl border border-[#dcece5] bg-[#f8fcfa] p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e5f4ee] text-xl">
                  🥾
                </div>

                <h3 className="mt-5 font-bold text-[#063d2b]">
                  Informasi Pendakian
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Kenali jalur pendakian dan persiapkan
                  perjalananmu sebelum menuju Gunung Prau.
                </p>
              </div>

              <div className="rounded-2xl border border-[#dcece5] bg-[#f8fcfa] p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e5f4ee] text-xl">
                  🎫
                </div>

                <h3 className="mt-5 font-bold text-[#063d2b]">
                  Cek Kuota & Tiket
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Cek ketersediaan kuota dan lakukan pemesanan
                  tiket pendakian dengan mudah.
                </p>
              </div>

              <div className="rounded-2xl border border-[#dcece5] bg-[#f8fcfa] p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e5f4ee] text-xl">
                  🌿
                </div>

                <h3 className="mt-5 font-bold text-[#063d2b]">
                  Kenali Kawasan
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Pelajari vegetasi, wisata sekitar, dan
                  panduan agar pendakian lebih siap dan nyaman.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* WISATA SEKITAR */}
        <section id="wisata" className="bg-[#f4faf7] px-6 py-20">
          <div className="mx-auto max-w-7xl">

            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">

              <div className="max-w-2xl">
                <p className="text-sm font-semibold text-[#17634a]">
                  Jelajahi Sekitar Campurejo
                </p>

                <h2 className="mt-2 text-2xl font-bold text-[#063d2b] md:text-3xl">
                  Wisata di Sekitar Kawasan
                </h2>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Selain pendakian Gunung Prau, kamu juga dapat
                  mengenal beberapa destinasi wisata yang berada
                  di sekitar kawasan Campurejo.
                </p>
              </div>

              <span className="w-fit rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#17634a] shadow-sm">
                Informasi Wisata
              </span>

            </div>

            {/* CARD WISATA */}
            <div className="mt-10 grid gap-6 md:grid-cols-2">

              {wisataSekitar.map((wisata) => (
                <article
                  key={wisata.nama}
                  className="overflow-hidden rounded-2xl border border-[#dcece5] bg-white shadow-sm"
                >

                  {/* Area visual */}
                  <div className="relative h-52 overflow-hidden bg-[#063d2b]">

                    <Image
                      src={wisata.foto}
                      alt={`Foto ${wisata.nama}`}
                      fill
                      className="object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#063d2b]/85 via-[#063d2b]/25 to-transparent" />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/70">
                          Wisata Campurejo
                        </p>

                        <p className="mt-2 text-3xl font-bold">
                          {wisata.nama}
                        </p>
                      </div>
                    </div>

                  </div>

                  {/* Isi card */}
                  <div className="p-6">

                    <div className="flex items-start justify-between gap-4">

                      <div>
                        <p className="text-xs font-medium text-[#17634a]">
                          {wisata.kategori}
                        </p>

                        <h3 className="mt-1 text-xl font-bold text-[#063d2b]">
                          {wisata.nama}
                        </h3>
                      </div>

                      <span className="rounded-full bg-[#e9f7f1] px-3 py-1 text-[10px] font-semibold text-[#17634a]">
                        INFORMASI
                      </span>

                    </div>

                    <p className="mt-4 text-sm leading-6 text-gray-600">
                      {wisata.deskripsi}
                    </p>

                    <div className="mt-5 flex items-center gap-2 text-xs text-gray-500">
                      <span>📍</span>
                      <span>{wisata.lokasi}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setWisataTerpilih(wisata)}
                      className="mt-6 w-full rounded-lg bg-[#063d2b] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#052f22]"
                    >
                      Lihat Informasi
                    </button>

                  </div>

                </article>
              ))}

            </div>

          </div>
        </section>

        {/* LOKASI BASECAMP */}
        <SectionBasecamp />

        {/* TITIK PENJEMPUTAN */}
        <SectionPickup />

        {/* CTA */}
        <section className="bg-white px-6 py-20">
          <div className="mx-auto max-w-4xl text-center">

            <p className="text-sm font-semibold text-[#17634a]">
              Siap Mendaki?
            </p>

            <h2 className="mt-2 text-2xl font-bold text-[#063d2b] md:text-3xl">
              Persiapkan Pendakianmu dari Sekarang
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-600">
              Cek kuota pendakian, kenali jalur, dan persiapkan
              kebutuhan sebelum berangkat menuju Gunung Prau
              via Campurejo.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">

              <a
                href="/cek-kuota"
                className="rounded-lg bg-[#063d2b] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#052f22]"
              >
                Cek Kuota Pendakian
              </a>

              <a
                href="/panduan"
                className="rounded-lg border border-[#17634a] px-6 py-3.5 text-sm font-semibold text-[#17634a] transition hover:bg-[#e9f7f1]"
              >
                Lihat Panduan
              </a>

            </div>

          </div>
        </section>

        {/* MODAL INFORMASI WISATA */}
        {wisataTerpilih && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6"
            onClick={() => setWisataTerpilih(null)}
          >
            <div
              className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >

              <div className="flex items-start justify-between gap-4">

                <div>
                  <p className="text-xs font-semibold text-[#17634a]">
                    INFORMASI WISATA
                  </p>

                  <h2 className="mt-1 text-2xl font-bold text-[#063d2b]">
                    {wisataTerpilih.nama}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setWisataTerpilih(null)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-500 transition hover:bg-gray-200"
                  aria-label="Tutup"
                >
                  ×
                </button>

              </div>

              <div className="mt-6 space-y-4">

                <div className="rounded-lg bg-[#f4faf7] p-4">
                  <p className="text-xs text-gray-500">
                    Lokasi
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[#063d2b]">
                    {wisataTerpilih.lokasi}
                  </p>
                </div>

                <div className="rounded-lg bg-[#f4faf7] p-4">
                  <p className="text-xs text-gray-500">
                    Tiket Masuk
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[#063d2b]">
                    {wisataTerpilih.tiket}
                  </p>
                </div>

                <div className="rounded-lg bg-[#f4faf7] p-4">
                  <p className="text-xs text-gray-500">
                    Jam Operasional
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[#063d2b]">
                    {wisataTerpilih.jam}
                  </p>
                </div>

              </div>

              <p className="mt-5 text-xs leading-5 text-gray-400">
                Informasi tiket wisata hanya sebagai referensi.
                Pembelian tiket wisata tidak dilakukan melalui
                CAMPSS.
              </p>

              <button
                type="button"
                onClick={() => setWisataTerpilih(null)}
                className="mt-6 w-full rounded-lg border border-[#dcece5] px-5 py-3 text-sm font-semibold text-[#17634a] transition hover:bg-[#f4faf7]"
              >
                Tutup
              </button>

            </div>
          </div>
        )}

      </main>

      <FloatingWA />
    </>
  );
}