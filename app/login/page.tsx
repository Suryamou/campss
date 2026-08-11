"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Email dan kata sandi wajib diisi.");
      return;
    }

    // Login sementara untuk tahap pengembangan
    if (
      email.trim().toLowerCase() !== "user@campss.com" ||
      password !== "123456"
    ) {
      setError("Email atau kata sandi tidak sesuai.");
      return;
    }

    // Simpan status login sementara
    if (remember) {
      localStorage.setItem("campss_logged_in", "true");
      localStorage.setItem("campss_user_email", email.trim());
    } else {
      sessionStorage.setItem("campss_logged_in", "true");
      sessionStorage.setItem("campss_user_email", email.trim());
    }

    // Kembali ke Beranda CAMPSS
    router.push("/");
  }

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
                Selamat Datang Kembali
                <br />
                di CAMPSS
              </h1>

              <p className="mt-5 text-sm leading-7 text-white/80">
                Masuk ke akun CAMPSS untuk melanjutkan pemesanan
                tiket pendakian Gunung Prau via Campurejo.
              </p>

            </div>
          </div>

        </section>

        {/* FORM LOGIN */}
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
                Masuk ke CAMPSS
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Masukkan akun kamu untuk melanjutkan.
              </p>

            </div>

            {/* FORM */}
            <form
              onSubmit={handleLogin}
              className="space-y-5"
            >

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
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="Masukkan email"
                  className="w-full rounded-lg border border-gray-200 bg-[#f8fbf9] px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-[#17634a] focus:bg-white focus:ring-2 focus:ring-[#17634a]/10"
                />

              </div>

              {/* PASSWORD */}
              <div>

                <div className="mb-2 flex items-center justify-between">

                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700"
                  >
                    Kata Sandi
                  </label>

                  <button
                    type="button"
                    className="text-xs font-medium text-[#17634a] hover:underline"
                    onClick={() =>
                      setError(
                        "Fitur lupa kata sandi akan dibuat pada tahap berikutnya."
                      )
                    }
                  >
                    Lupa kata sandi?
                  </button>

                </div>

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="Masukkan kata sandi"
                  className="w-full rounded-lg border border-gray-200 bg-[#f8fbf9] px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-[#17634a] focus:bg-white focus:ring-2 focus:ring-[#17634a]/10"
                />

              </div>

              {/* INGAT SAYA */}
              <div className="flex items-center gap-2">

                <input
                  id="remember"
                  type="checkbox"
                  checked={remember}
                  onChange={(event) =>
                    setRemember(event.target.checked)
                  }
                  className="h-4 w-4 accent-[#17634a]"
                />

                <label
                  htmlFor="remember"
                  className="text-sm text-gray-600"
                >
                  Ingat saya
                </label>

              </div>

              {/* ERROR */}
              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3">

                  <p className="text-xs font-medium text-red-700">
                    {error}
                  </p>

                </div>
              )}

              {/* BUTTON */}
              <button
                type="submit"
                className="w-full rounded-lg bg-[#063d2b] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#052f22]"
              >
                Masuk
              </button>

            </form>

            {/* DAFTAR */}
            <div className="mt-7 text-center">

              <p className="text-sm text-gray-500">
                Belum memiliki akun?{" "}

                <Link
                  href="/daftar"
                  className="font-semibold text-[#17634a] hover:underline"
                >
                  Daftar sekarang
                </Link>

              </p>

            </div>

            {/* INFO */}
            <div className="mt-8 rounded-lg border border-[#cfe6dc] bg-[#e9f7f1] p-4">

              <p className="text-xs leading-5 text-gray-600">
                Akun CAMPSS diperlukan untuk melakukan pemesanan
                tiket pendakian dan melihat riwayat pemesanan.
              </p>

            </div>

            {/* AKUN DEMO */}
            <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4">

              <p className="text-xs font-semibold text-[#063d2b]">
                Akun sementara untuk testing
              </p>

              <p className="mt-2 text-xs text-gray-500">
                Email:{" "}
                <span className="font-medium text-gray-700">
                  user@campss.com
                </span>
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Password:{" "}
                <span className="font-medium text-gray-700">
                  123456
                </span>
              </p>

            </div>

          </div>

        </section>

      </div>
    </main>
  );
}