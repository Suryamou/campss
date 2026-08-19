"use client";

import Link from "next/link";
import { useState } from "react";

export default function DaftarPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <main className="min-h-screen bg-[#f4faf7]">
      <div className="flex min-h-screen">

        {/* BAGIAN KIRI */}
        <section className="relative hidden overflow-hidden bg-[#063d2b] lg:flex lg:w-1/2">

          <div
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{
              backgroundImage: "url('/images/2.jpg')",
            }}
          />

          <div className="absolute inset-0 bg-[#063d2b]/70" />

          <div className="relative z-10 flex items-center px-16">
            <div className="max-w-lg text-white">

              <Link
                href="/"
                className="text-2xl font-bold"
              >
                CAMPSS
              </Link>

              <h1 className="mt-12 text-4xl font-bold leading-tight">
                Mulai Petualanganmu
                <br />
                Bersama CAMPSS
              </h1>

              <p className="mt-5 text-sm leading-7 text-white/80">
                Buat akun CAMPSS untuk melakukan pemesanan
                tiket pendakian Gunung Prau via Campurejo.
              </p>

            </div>
          </div>

        </section>

        {/* BAGIAN KANAN */}
        <section className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2">

          <div className="w-full max-w-md">

            {/* HEADER */}
            <div className="mb-8">

              <Link
                href="/"
                className="text-sm font-medium text-[#17634a] hover:underline"
              >
                ← Kembali ke Beranda
              </Link>

              <h2 className="mt-8 text-3xl font-bold text-[#063d2b]">
                Buat Akun CAMPSS
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Daftarkan akun kamu untuk melanjutkan pemesanan.
              </p>

            </div>

            {/* FORM */}
            <form className="space-y-5">

              {/* NAMA */}
              <div>
                <label
                  htmlFor="nama"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Nama Lengkap
                </label>

                <input
                  id="nama"
                  type="text"
                  placeholder="Masukkan nama lengkap"
                  className="w-full rounded-lg border border-gray-200 bg-[#f8fbf9] px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-[#17634a] focus:bg-white focus:ring-2 focus:ring-[#17634a]/10"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="Masukkan email"
                  className="w-full rounded-lg border border-gray-200 bg-[#f8fbf9] px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-[#17634a] focus:bg-white focus:ring-2 focus:ring-[#17634a]/10"
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Kata Sandi
                </label>

                <div className="relative">

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan kata sandi"
                    className="w-full rounded-lg border border-gray-200 bg-[#f8fbf9] px-4 py-3 pr-20 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-[#17634a] focus:bg-white focus:ring-2 focus:ring-[#17634a]/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-[#17634a]"
                  >
                    {showPassword ? "Sembunyikan" : "Lihat"}
                  </button>

                </div>
              </div>

              {/* KONFIRMASI PASSWORD */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Konfirmasi Kata Sandi
                </label>

                <div className="relative">

                  <input
                    id="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Ulangi kata sandi"
                    className="w-full rounded-lg border border-gray-200 bg-[#f8fbf9] px-4 py-3 pr-20 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-[#17634a] focus:bg-white focus:ring-2 focus:ring-[#17634a]/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-[#17634a]"
                  >
                    {showConfirmPassword
                      ? "Sembunyikan"
                      : "Lihat"}
                  </button>

                </div>
              </div>

              {/* PERSETUJUAN */}
              <div className="flex items-start gap-3">

                <input
                  id="agreement"
                  type="checkbox"
                  className="mt-1 h-4 w-4 accent-[#17634a]"
                />

                <label
                  htmlFor="agreement"
                  className="text-sm leading-6 text-gray-600"
                >
                  Saya menyetujui ketentuan penggunaan CAMPSS
                  dan peraturan pendakian yang berlaku di
                  Basecamp Campurejo.
                </label>

              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="w-full rounded-lg bg-[#063d2b] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#052f22]"
              >
                Daftar
              </button>

            </form>

            {/* LOGIN */}
            <div className="mt-7 text-center">

              <p className="text-sm text-gray-500">
                Sudah memiliki akun?{" "}

                <Link
                  href="/login"
                  className="font-semibold text-[#17634a] hover:underline"
                >
                  Masuk sekarang
                </Link>
              </p>

            </div>

            {/* INFO */}
            <div className="mt-8 rounded-lg border border-[#cfe6dc] bg-[#e9f7f1] p-4">

              <p className="text-xs leading-5 text-gray-600">
                Akun CAMPSS digunakan untuk melakukan pemesanan
                tiket pendakian dan melihat riwayat pemesanan.
              </p>

            </div>

          </div>

        </section>

      </div>
    </main>
  );
}