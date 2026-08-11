"use client";

import { useState } from "react";

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen bg-[#f4faf7]">

      <div className="grid min-h-screen lg:grid-cols-2">

        {/* LEFT */}
        <section className="hidden bg-[#063d2b] p-10 text-white lg:flex lg:flex-col lg:justify-between">

          <div>

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 font-bold">
                C
              </div>

              <div>
                <p className="text-lg font-bold">
                  CAMPSS
                </p>

                <p className="text-xs text-white/60">
                  Campurejo Mountain Hiking Information System
                </p>
              </div>

            </div>

          </div>

          <div className="max-w-lg">

            <p className="text-sm font-medium text-emerald-300">
              PANEL ADMINISTRATOR
            </p>

            <h1 className="mt-4 text-4xl font-bold leading-tight">
              Kelola Pendakian
              <br />
              Gunung Prau via Campurejo
            </h1>

            <p className="mt-5 text-sm leading-7 text-white/70">
              Kelola kuota pendakian, verifikasi pembayaran,
              pemantauan pendaki, pemindaian e-tiket, dan
              informasi jalur melalui satu panel administrasi.
            </p>

          </div>

          <p className="text-xs text-white/40">
            CAMPSS • Panel Administrasi Basecamp Campurejo
          </p>

        </section>

        {/* RIGHT */}
        <section className="flex items-center justify-center px-6 py-10">

          <div className="w-full max-w-md">

            {/* Mobile Logo */}
            <div className="mb-10 text-center lg:hidden">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-[#063d2b] font-bold text-white">
                C
              </div>

              <p className="mt-3 text-xl font-bold text-[#063d2b]">
                CAMPSS
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Panel Administrasi Basecamp
              </p>

            </div>

            {/* Login Card */}
            <div className="rounded-2xl border border-[#dcece5] bg-white p-7 shadow-sm md:p-9">

              <div>

                <p className="text-sm font-medium text-[#17634a]">
                  Selamat Datang
                </p>

                <h2 className="mt-2 text-2xl font-bold text-[#063d2b]">
                  Login Admin
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Masuk menggunakan akun administrator
                  yang telah ditentukan.
                </p>

              </div>

              {/* Username */}
              <div className="mt-7">

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Username Admin
                </label>

                <input
                  type="text"
                  placeholder="Masukkan username"
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#17634a] focus:ring-2 focus:ring-[#17634a]/10"
                />

              </div>

              {/* Password */}
              <div className="mt-5">

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Password
                </label>

                <div className="relative">

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password"
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 pr-20 text-sm outline-none transition focus:border-[#17634a] focus:ring-2 focus:ring-[#17634a]/10"
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

              {/* Login */}
              <button
                type="button"
                className="mt-7 w-full rounded-lg bg-[#063d2b] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#052f22]"
              >
                Masuk ke Dashboard
              </button>

              {/* Security */}
              <div className="mt-6 rounded-lg bg-[#f4faf7] p-4">

                <div className="flex gap-3">

                  <div className="mt-0.5 text-sm">
                    🔒
                  </div>

                  <div>

                    <p className="text-xs font-semibold text-[#063d2b]">
                      Akses Terbatas
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      Halaman ini khusus administrator Basecamp.
                      Jangan membagikan informasi akun kepada
                      pihak lain.
                    </p>

                  </div>

                </div>

              </div>

            </div>

            <p className="mt-6 text-center text-xs text-gray-400">
              © 2026 CAMPSS • Basecamp Campurejo
            </p>

          </div>

        </section>

      </div>

    </main>
  );
}