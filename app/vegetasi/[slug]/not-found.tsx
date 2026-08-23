import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function VegetasiNotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#e9f9f2] px-6 py-16 text-center">
        <h1 className="text-2xl font-bold text-[#063d2b]">Vegetasi tidak ditemukan</h1>
        <p className="mt-2 text-sm text-gray-500">Informasi vegetasi yang Anda cari belum tersedia.</p>
        <Link href="/vegetasi" className="mt-6 inline-block rounded-lg bg-[#063d2b] px-5 py-3 text-sm font-semibold text-white">Kembali ke Vegetasi</Link>
      </main>
    </>
  );
}
