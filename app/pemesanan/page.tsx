"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { FormEvent, Suspense } from "react";
import { PRICE_PER_PERSON, quotaSchedules, readUser } from "@/lib/campss";

export default function PemesananPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#f4faf7]" />}>
      <BookingForm />
    </Suspense>
  );
}

function formatDateIndo(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function BookingForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [jumlahPendaki, setJumlahPendaki] = useState(1);
  const selectedDate = searchParams.get("tanggal") || searchParams.get("date") || new Date().toISOString().split("T")[0];

  const [tipePendakian, setTipePendakian] = useState<"tektok" | "camping">("tektok");
  const [tanggalTurun, setTanggalTurun] = useState(selectedDate);

  const getMinTanggalTurun = (dateStr: string) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-").map(Number);
    const d = new Date(year, month - 1, day);
    d.setDate(d.getDate() + 1);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const dayStr = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${dayStr}`;
  };

  const getCampingDuration = (startDateStr: string, endDateStr: string) => {
    if (!startDateStr || !endDateStr) return "";
    const [sY, sM, sD] = startDateStr.split("-").map(Number);
    const [eY, eM, eD] = endDateStr.split("-").map(Number);
    const start = new Date(sY, sM - 1, sD);
    const end = new Date(eY, eM - 1, eD);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays <= 0) return "1 Hari (Tektok)";
    return `${diffDays + 1} Hari ${diffDays} Malam`;
  };
  
  const requestedSchedule = quotaSchedules.find((item) => item.date === selectedDate);
  const selectedSchedule = requestedSchedule || {
    date: selectedDate,
    dateLabel: formatDateIndo(selectedDate),
    day: "",
    status: "CLOSED" as const,
    availableQuota: 0,
    maxQuota: 0,
  };

  const [formData, setFormData] = useState({
    nama_ketua: "",
    email: "",
    kontak_darurat_ketua: "",
    no_identitas_ketua: "",
    jenis_identitas_ketua: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [agreement, setAgreement] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const totalPembayaran = jumlahPendaki * PRICE_PER_PERSON;

  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("campss_logged_in") === "true" || sessionStorage.getItem("campss_logged_in") === "true";
    if (!loggedIn) {
      setShowAuthModal(true);
      return;
    }

    queueMicrotask(() => {
      const user = readUser();
      if (user) {
        setFormData((current) => ({
          ...current,
          nama_ketua: user.name || "",
          email: user.email || "",
          kontak_darurat_ketua: user.phone || ""
        }));
      }
    });
  }, [router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!formData.nama_ketua.trim() || !formData.email.trim() || !formData.kontak_darurat_ketua.trim() || !formData.jenis_identitas_ketua || !formData.no_identitas_ketua.trim()) {
      setError("Semua data ketua pendakian wajib diisi.");
      return;
    }
    
    if (tipePendakian === "camping" && tanggalTurun <= selectedDate) {
      setError("Tanggal turun untuk camping harus setelah tanggal naik.");
      return;
    }
    
    if (!agreement) {
      setError("Anda harus menyetujui peraturan pendakian.");
      return;
    }
    
    if (!file) {
      setError("Harap upload dokumen identitas.");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      data.append("jalur_id", "1"); // Default
      data.append("tanggal_naik", selectedDate);
      data.append("tipe_pendakian", tipePendakian);
      data.append("tanggal_turun", tanggalTurun);
      data.append("jenis_identitas_ketua", formData.jenis_identitas_ketua);
      data.append("no_identitas_ketua", formData.no_identitas_ketua);
      data.append("dokumen_identitas_ketua", file);
      data.append("kontak_darurat_ketua", formData.kontak_darurat_ketua);
      data.append("nama_ketua", formData.nama_ketua);
      data.append("email_ketua", formData.email);
      
      for (let i = 0; i < jumlahPendaki - 1; i++) {
        data.append(`anggota[${i}][nama]`, `Anggota ${i+1}`);
      }
      
      const token = localStorage.getItem("campss_access_token") || sessionStorage.getItem("campss_access_token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pemesanan`, {
        method: "POST",
        body: data,
        headers: { 
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
      });
      
      const resData = await res.json();
      
      if (!res.ok) {
        throw new Error(resData.message || "Gagal membuat pesanan");
      }
      
      router.push(`/pembayaran?id=${resData.data?.id || ''}`);
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f4faf7]">
      <section className="border-b border-[#dcece5] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <Link href="/cek-kuota" className="text-sm font-medium text-[#17634a] hover:underline">
            ← Kembali ke Cek Kuota
          </Link>
          <div className="mt-6">
            <p className="text-sm font-medium text-[#17634a]">Pemesanan Tiket Pendakian</p>
            <h1 className="mt-2 text-3xl font-bold text-[#063d2b]">Lengkapi Data Pendakian</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
              Isi data dengan benar sesuai dokumen identitas yang akan digunakan saat proses verifikasi di Basecamp Campurejo.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-[#dcece5] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-2 font-semibold text-[#063d2b]">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#063d2b] text-xs text-white">1</span>
              Data Pendaki
            </div>
            <div className="h-px w-10 bg-gray-200" />
            <div className="text-gray-400">2. Ringkasan</div>
            <div className="h-px w-10 bg-gray-200" />
            <div className="text-gray-400">3. Pembayaran</div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <form id="booking-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="rounded-xl border border-[#dcece5] bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-[#063d2b]">Detail Pendakian</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg bg-[#f4faf7] p-4">
                  <p className="text-xs text-gray-500">Jalur Pendakian</p>
                  <p className="mt-1 font-semibold text-[#063d2b]">Gunung Prau via Campurejo</p>
                </div>
                <div className="rounded-lg bg-[#f4faf7] p-4">
                  <p className="text-xs text-gray-500">Tanggal Naik</p>
                  <p className="mt-1 font-semibold text-[#063d2b]">{selectedSchedule.dateLabel}</p>
                </div>
              </div>

              {/* Kategori Pendakian Selector */}
              <div className="mt-6 border-t border-gray-100 pt-5">
                <label className="block text-sm font-semibold text-[#063d2b] mb-3">Kategori Pendakian</label>
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Opsi Tektok */}
                  <button
                    type="button"
                    onClick={() => {
                      setTipePendakian("tektok");
                      setTanggalTurun(selectedDate);
                    }}
                    className={`flex flex-col text-left p-4 rounded-xl border-2 transition duration-200 cursor-pointer ${
                      tipePendakian === "tektok"
                        ? "border-[#17634a] bg-[#f4faf7] shadow-sm"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-bold text-[#063d2b]">Tektok (One Day Hike)</span>
                      <input
                        type="radio"
                        checked={tipePendakian === "tektok"}
                        readOnly
                        className="h-4 w-4 accent-[#17634a]"
                      />
                    </div>
                    <span className="mt-2 text-xs text-gray-500 leading-relaxed">
                      Langsung naik dan turun di hari yang sama tanpa mendirikan tenda/camping.
                    </span>
                  </button>

                  {/* Opsi Camping */}
                  <button
                    type="button"
                    onClick={() => {
                      setTipePendakian("camping");
                      setTanggalTurun(getMinTanggalTurun(selectedDate));
                    }}
                    className={`flex flex-col text-left p-4 rounded-xl border-2 transition duration-200 cursor-pointer ${
                      tipePendakian === "camping"
                        ? "border-[#17634a] bg-[#f4faf7] shadow-sm"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-bold text-[#063d2b]">Camping (Menginap)</span>
                      <input
                        type="radio"
                        checked={tipePendakian === "camping"}
                        readOnly
                        className="h-4 w-4 accent-[#17634a]"
                      />
                    </div>
                    <span className="mt-2 text-xs text-gray-500 leading-relaxed">
                      Pendakian menginap di area camp. Wajib menentukan tanggal turun.
                    </span>
                  </button>
                </div>
              </div>

              {/* Tanggal Turun (Hanya muncul jika memilih Camping) */}
              {tipePendakian === "camping" && (
                <div className="mt-6 border-t border-gray-100 pt-5">
                  <label className="mb-2 block text-sm font-semibold text-[#063d2b]">Tanggal Turun</label>
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <input
                      type="date"
                      required
                      min={getMinTanggalTurun(selectedDate)}
                      value={tanggalTurun}
                      onChange={(e) => setTanggalTurun(e.target.value)}
                      className="w-full sm:w-auto rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#17634a] focus:ring-2 focus:ring-[#17634a]/10"
                    />
                    <div className="rounded-lg bg-[#e9f7f1] px-4 py-2 text-sm font-semibold text-[#17634a]">
                      Durasi: {getCampingDuration(selectedDate, tanggalTurun)}
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    Batas minimal tanggal turun untuk pendakian camping adalah H+1 dari tanggal naik.
                  </p>
                </div>
              )}
            </div>

            <div className="rounded-xl border border-[#dcece5] bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-[#063d2b]">Data Ketua Pendakian</h2>
              <p className="mt-1 text-sm text-gray-500">
                Data ketua rombongan digunakan sebagai kontak utama selama proses pendakian.
              </p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-gray-700">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    value={formData.nama_ketua}
                    onChange={(e) => setFormData({...formData, nama_ketua: e.target.value})}
                    placeholder="Sesuai kartu identitas"
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#17634a] focus:ring-2 focus:ring-[#17634a]/10"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="Email aktif"
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#17634a] focus:ring-2 focus:ring-[#17634a]/10"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Nomor WhatsApp</label>
                  <input
                    type="tel"
                    required
                    value={formData.kontak_darurat_ketua}
                    onChange={(e) => setFormData({...formData, kontak_darurat_ketua: e.target.value})}
                    placeholder="08xxxxxxxxxx"
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#17634a] focus:ring-2 focus:ring-[#17634a]/10"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Nomor Identitas</label>
                  <input
                    type="text"
                    required
                    value={formData.no_identitas_ketua}
                    onChange={(e) => setFormData({...formData, no_identitas_ketua: e.target.value})}
                    placeholder="Nomor KTP / identitas"
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#17634a] focus:ring-2 focus:ring-[#17634a]/10"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Jenis Identitas</label>
                  <select
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#17634a] focus:ring-2 focus:ring-[#17634a]/10"
                    value={formData.jenis_identitas_ketua}
                    onChange={(e) => setFormData({...formData, jenis_identitas_ketua: e.target.value})}
                    required
                  >
                    <option value="" disabled>Pilih identitas</option>
                    <option value="ktp">KTP</option>
                    <option value="sim">SIM</option>
                    <option value="lainnya">Tanda Pengenal Lainnya</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-[#dcece5] bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-[#063d2b]">Jumlah Pendaki</h2>
              <p className="mt-1 text-sm text-gray-500">Tentukan jumlah anggota yang ikut dalam rombongan.</p>
              <div className="mt-5 flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setJumlahPendaki(Math.max(1, jumlahPendaki - 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-lg hover:bg-gray-50"
                >
                  −
                </button>
                <div className="min-w-12 text-center">
                  <p className="text-xl font-bold text-[#063d2b]">{jumlahPendaki}</p>
                  <p className="text-xs text-gray-500">orang</p>
                </div>
                <button
                  type="button"
                  onClick={() => setJumlahPendaki(Math.min(10, jumlahPendaki + 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-lg hover:bg-gray-50"
                >
                  +
                </button>
              </div>
              <p className="mt-3 text-xs text-gray-500">Maksimal jumlah anggota dalam satu pemesanan sementara dibatasi 10 orang.</p>
            </div>

            <div className="rounded-xl border border-[#dcece5] bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-[#063d2b]">Dokumen Pendaki</h2>
              <p className="mt-1 text-sm text-gray-500">Siapkan dokumen identitas untuk proses verifikasi.</p>
              <div className="mt-5 rounded-lg border-2 border-dashed border-[#cfe6dc] bg-[#f8fcfa] p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#e5f4ee] text-xl">📄</div>
                <p className="mt-3 text-sm font-semibold text-[#063d2b]">{file ? file.name : "Upload dokumen identitas"}</p>
                <p className="mt-1 text-xs text-gray-500">KTP, SIM, atau tanda pengenal lainnya</p>
                <label className="mt-4 inline-block cursor-pointer rounded-lg border border-[#17634a] px-4 py-2 text-sm font-semibold text-[#17634a] hover:bg-[#e9f7f1]">
                  Pilih File
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files) setFile(e.target.files[0]);
                    }}
                  />
                </label>
              </div>
            </div>

            <div className="rounded-xl border border-[#cfe6dc] bg-[#e9f7f1] p-5">
              <div className="flex gap-3">
                <input
                  id="agreement"
                  type="checkbox"
                  checked={agreement}
                  onChange={(e) => setAgreement(e.target.checked)}
                  className="mt-1 h-4 w-4 accent-[#17634a]"
                />
                <label htmlFor="agreement" className="text-sm leading-6 text-gray-600">
                  Saya menyatakan bahwa data yang saya masukkan benar dan bersedia mengikuti seluruh peraturan pendakian yang berlaku di Basecamp Campurejo.
                </label>
              </div>
            </div>
            
            {error && <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-700">{error}</p>}
          </form>

          <aside className="h-fit rounded-xl border border-[#dcece5] bg-white p-6 shadow-sm lg:sticky lg:top-6">
            <h2 className="text-lg font-bold text-[#063d2b]">Ringkasan Pemesanan</h2>
            <div className="mt-5 space-y-4">
              <div className="flex justify-between gap-4 text-sm">
                <span className="text-gray-500">Jalur</span>
                <span className="text-right font-medium text-[#063d2b]">Campurejo</span>
              </div>
              <div className="flex justify-between gap-4 text-sm">
                <span className="text-gray-500">Jenis Pendakian</span>
                <span className="font-semibold text-[#17634a]">
                  {tipePendakian === "tektok" ? "Tektok (1 Hari)" : "Camping"}
                </span>
              </div>
              {tipePendakian === "camping" && (
                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-gray-500">Durasi Camping</span>
                  <span className="font-semibold text-[#17634a]">
                    {getCampingDuration(selectedDate, tanggalTurun)}
                  </span>
                </div>
              )}
              <div className="flex justify-between gap-4 text-sm">
                <span className="text-gray-500">Tanggal Naik</span>
                <span className="font-medium text-[#063d2b]">{selectedSchedule.dateLabel}</span>
              </div>
              {tipePendakian === "camping" && (
                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-gray-500">Tanggal Turun</span>
                  <span className="font-medium text-[#063d2b]">{formatDateIndo(tanggalTurun)}</span>
                </div>
              )}
              <div className="flex justify-between gap-4 text-sm">
                <span className="text-gray-500">Jumlah Pendaki</span>
                <span className="font-medium text-[#063d2b]">{jumlahPendaki} orang</span>
              </div>
            </div>
            <div className="my-5 h-px bg-gray-100" />
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Total</span>
              <span className="text-xl font-bold text-[#063d2b]">Rp {totalPembayaran.toLocaleString("id-ID")}</span>
            </div>
            <p className="mt-2 text-xs leading-5 text-gray-400">Tarif Pendakian Rp40.000 per orang.</p>

            <button
              type="submit"
              form="booking-form"
              disabled={loading}
              className={`mt-6 block w-full rounded-lg px-5 py-3.5 text-center text-sm font-semibold text-white transition ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#063d2b] hover:bg-[#052f22]"}`}
            >
              {loading ? "Memproses..." : "Lanjut ke Pembayaran"}
            </button>
          </aside>
        </div>
      </section>

      {/* AUTH MODAL */}
      {showAuthModal && (
        <>
          <style>{`
            @keyframes popUp {
              0% { opacity: 0; transform: scale(0.95) translateY(10px); }
              100% { opacity: 1; transform: scale(1) translateY(0); }
            }
            .animate-popup {
              animation: popUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
          `}</style>
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#063d2b]/40 px-6 backdrop-blur-sm">
            <div className="w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-2xl animate-popup">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e9f7f1] text-3xl shadow-inner">
                🏕️
              </div>
              <h3 className="mt-6 text-xl font-bold text-[#063d2b]">Akses Dibatasi</h3>
              <p className="mt-3 text-sm leading-6 text-gray-500">
                Harap masuk (login) ke akunmu atau daftar terlebih dahulu untuk melanjutkan pemesanan tiket.
              </p>
              <div className="mt-8 flex flex-col gap-3">
                <Link
                  href="/login"
                  className="w-full rounded-xl bg-[#063d2b] px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#052f22] hover:shadow"
                >
                  Masuk Sekarang
                </Link>
                <Link
                  href="/cek-kuota"
                  className="w-full rounded-xl border border-gray-200 px-5 py-3.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
                >
                  Kembali ke Cek Kuota
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}