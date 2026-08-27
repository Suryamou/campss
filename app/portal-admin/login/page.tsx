"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Email atau password salah.");
      }

      if (data.user.role !== "admin" && data.user.role !== "petugas") {
        throw new Error("Akses ditolak. Anda bukan admin.");
      }

      localStorage.setItem("campss_admin_token", data.access_token);
      localStorage.setItem("campss_admin_user", JSON.stringify(data.user));
      
      router.push("/portal-admin/verifikasi");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4faf7] p-6">

      <div className="w-full max-w-[1000px] overflow-hidden rounded-2xl bg-white shadow-xl">

        <div className="grid lg:grid-cols-2">

          {/* Form */}
          <div className="p-8 md:p-12">

            <div className="mx-auto max-w-sm">

              <div>
                <p className="text-sm font-bold text-[#17634a]">CAMPSS ADMIN</p>
                <h1 className="mt-2 text-2xl font-bold text-[#063d2b] md:text-3xl">
                  Dashboard Login
                </h1>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Masuk sebagai pengelola Basecamp Campurejo untuk
                  memverifikasi tiket dan memantau status pendaki.
                </p>
              </div>

              <form onSubmit={handleLogin}>
                <div className="mt-7">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Email Admin
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="admin@campss.com"
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#17634a] focus:ring-2 focus:ring-[#17634a]/10"
                  />
                </div>

                <div className="mt-5">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Masukkan password"
                      className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 pr-20 text-sm outline-none transition focus:border-[#17634a] focus:ring-2 focus:ring-[#17634a]/10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-[#17634a]"
                    >
                      {showPassword ? "Sembunyikan" : "Lihat"}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-500">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className={`mt-7 w-full rounded-lg px-5 py-3.5 text-sm font-semibold text-white transition ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#063d2b] hover:bg-[#052f22]"}`}
                >
                  {loading ? "Memproses..." : "Masuk ke Dashboard"}
                </button>
              </form>

              <div className="mt-6 rounded-lg bg-[#f4faf7] p-4">
                <p className="text-xs leading-5 text-[#17634a]">
                  <span className="font-semibold">Info Keamanan:</span> Halaman
                  ini dikhususkan untuk pengurus basecamp. Setiap
                  aktivitas akan dicatat dalam sistem.
                </p>
              </div>

            </div>

          </div>

          <div className="hidden bg-[#063d2b] p-12 lg:flex lg:flex-col lg:justify-between">
            <div>
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-2xl">
                ⛰️
              </div>
              <h2 className="mt-8 text-3xl font-bold leading-tight text-white">
                Sistem Manajemen<br />Pendakian Prau
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-emerald-100/80">
                Aplikasi terintegrasi untuk memudahkan pengelolaan tiket,
                pemantauan kuota harian, hingga pelacakan status
                seluruh pendaki di jalur Campurejo.
              </p>
            </div>
            <div className="border-t border-white/10 pt-8">
              <p className="text-sm font-medium text-emerald-100">
                Pusat Bantuan Admin
              </p>
              <p className="mt-1 text-xs text-emerald-100/60">
                Hubungi tim IT Support jika mengalami kendala login
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}