"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { USER_STORAGE_KEY } from "@/lib/campss";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!email.trim() || !password) {
      setError("Email dan kata sandi wajib diisi.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Format email tidak valid.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Email atau kata sandi salah.");
      }

      // Simpan token dan status login
      if (remember) {
        localStorage.setItem("campss_logged_in", "true");
        localStorage.setItem("campss_access_token", data.access_token);
        localStorage.setItem("campss_user", JSON.stringify(data.user));
      } else {
        sessionStorage.setItem("campss_logged_in", "true");
        sessionStorage.setItem("campss_access_token", data.access_token);
        sessionStorage.setItem("campss_user", JSON.stringify(data.user));
      }

      setSuccess("Login berhasil. Mengarahkan ke beranda...");
      setTimeout(() => router.push("/"), 500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
                disabled={loading}
                className="w-full rounded-lg bg-[#063d2b] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#052f22] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Memproses..." : "Masuk"}
              </button>

              {(error || success) && (
                <div className={`rounded-lg border px-4 py-3 ${error ? "border-red-200 bg-red-50" : "border-emerald-200 bg-emerald-50"}`}>
                  <p className={`text-xs font-medium ${error ? "text-red-700" : "text-emerald-700"}`}>{error || success}</p>
                </div>
              )}

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

          </div>

        </section>

      </div>
    </main>
  );
}