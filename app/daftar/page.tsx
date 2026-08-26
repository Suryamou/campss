"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function DaftarPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [agreement, setAgreement] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.password || !form.confirmPassword) {
      setError("Semua data wajib diisi.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Format email tidak valid.");
      return;
    }
    if (!/^\+?[0-9\s-]{8,18}$/.test(form.phone)) {
      setError("Nomor WhatsApp tidak valid.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Konfirmasi kata sandi tidak sama.");
      return;
    }
    if (!agreement) {
      setError("Persetujuan ketentuan wajib dicentang.");
      return;
    }

    setLoading(true);
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          password: form.password,
          password_confirmation: form.confirmPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Gagal mendaftar. Silakan periksa kembali data Anda.");
      }

      setSuccess("Pendaftaran berhasil! Silakan masuk untuk melanjutkan.");
      setTimeout(() => router.push("/login"), 1000);
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
            <form onSubmit={handleSubmit} className="space-y-5">

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
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  placeholder="Masukkan nama lengkap"
                  required
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
                  value={form.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                  placeholder="Masukkan email"
                  required
                  className="w-full rounded-lg border border-gray-200 bg-[#f8fbf9] px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-[#17634a] focus:bg-white focus:ring-2 focus:ring-[#17634a]/10"
                />
              </div>

              {/* NOMOR WHATSAPP */}
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Nomor WhatsApp
                </label>

                <input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(event) => setForm({ ...form, phone: event.target.value })}
                  placeholder="Contoh: 081234567890"
                  required
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
                    value={form.password}
                    onChange={(event) => setForm({ ...form, password: event.target.value })}
                    placeholder="Masukkan kata sandi"
                    required
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
                    value={form.confirmPassword}
                    onChange={(event) => setForm({ ...form, confirmPassword: event.target.value })}
                    placeholder="Ulangi kata sandi"
                    required
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
                  checked={agreement}
                  onChange={(event) => setAgreement(event.target.checked)}
                  required
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

              {(error || success) && (
                <div className={`rounded-lg border px-4 py-3 ${error ? "border-red-200 bg-red-50" : "border-emerald-200 bg-emerald-50"}`}>
                  <p className={`text-xs font-medium ${error ? "text-red-700" : "text-emerald-700"}`}>{error || success}</p>
                </div>
              )}

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full rounded-lg px-5 py-3.5 text-sm font-semibold text-white transition ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#063d2b] hover:bg-[#052f22]"}`}
              >
                {loading ? "Mendaftar..." : "Daftar"}
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