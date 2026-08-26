"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { formatCurrency } from "@/lib/campss";

function PembayaranContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [metode, setMetode] = useState("QRIS");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [fileError, setFileError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (id) {
      fetchPemesanan();
    } else {
      setLoading(false);
    }
  }, [id]);

  async function fetchPemesanan() {
    try {
      const token = localStorage.getItem("campss_access_token") || sessionStorage.getItem("campss_access_token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pemesanan/${id}`, {
        headers: { 
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
      });
      const resData = await res.json();
      if (res.ok) {
        setData(resData.data);
      } else {
        setError(resData.message || "Gagal memuat detail pesanan");
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit() {
    if (!file || fileError) {
      setError("Harap unggah bukti pembayaran yang valid.");
      return;
    }
    
    setSubmitting(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("bukti_pembayaran", file);
      formData.append("metode_pembayaran", metode);

      const token = localStorage.getItem("campss_access_token") || sessionStorage.getItem("campss_access_token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pembayaran/${id}`, {
        method: "POST",
        body: formData,
        headers: { 
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
      });

      const resData = await res.json();

      if (!res.ok) {
        throw new Error(resData.message || "Gagal mengunggah bukti pembayaran");
      }

      router.push("/riwayat-pemesanan");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Memuat data pesanan...</div>;
  }

  return (
    <main className="min-h-screen bg-[#f4faf7]">
      <section className="border-b border-[#dcece5] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <Link href="/pemesanan" className="text-sm font-medium text-[#17634a] hover:underline">
            ← Kembali ke Pemesanan
          </Link>
          <div className="mt-6">
            <p className="text-sm font-medium text-[#17634a]">Pembayaran Tiket Pendakian</p>
            <h1 className="mt-2 text-3xl font-bold text-[#063d2b]">Selesaikan Pembayaran</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
              Lakukan pembayaran sesuai nominal yang tertera, kemudian unggah bukti pembayaran untuk diverifikasi oleh pihak Basecamp Campurejo.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-[#dcece5] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <div className="flex items-center gap-2 text-gray-400">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-xs">✓</span>
              Data Pendaki
            </div>
            <div className="h-px w-8 bg-gray-200" />
            <div className="flex items-center gap-2 font-semibold text-[#063d2b]">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#063d2b] text-xs text-white">2</span>
              Pembayaran
            </div>
            <div className="h-px w-8 bg-gray-200" />
            <div className="text-gray-400">3. E-Tiket</div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            {data?.status_pembayaran !== "menunggu" && data !== null ? (
              <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-8 text-center shadow-sm">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl text-emerald-600">✓</div>
                <h2 className="mt-4 text-xl font-bold text-emerald-800">Status: {data?.status_pembayaran === "diverifikasi" ? "Telah Diverifikasi" : "Selesai"}</h2>
                <p className="mt-2 text-sm text-emerald-600">Pesanan ini sudah tidak memerlukan pembayaran lagi.</p>
              </div>
            ) : (
              <>
                <div className="rounded-xl border border-[#dcece5] bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-bold text-[#063d2b]">Metode Pembayaran</h2>
                  <p className="mt-1 text-sm text-gray-500">Gunakan salah satu rekening pembayaran resmi Basecamp Campurejo.</p>
                  
                  {/* QRIS */}
                  <div 
                    className={`mt-6 cursor-pointer rounded-xl border-2 ${metode === 'QRIS' ? 'border-[#17634a] bg-[#f2f8f5]' : 'border-transparent bg-[#f8fcfa]'} p-5 text-center transition`}
                    onClick={() => setMetode('QRIS')}
                  >
                    <div className="flex items-center justify-between border-b border-[#dcece5] pb-3">
                      <div className="text-lg font-black tracking-tight text-[#063d2b]">
                        QRIS <span className="text-xs font-normal text-gray-500">National QR</span>
                      </div>
                    </div>
                    <div className="my-4 flex justify-center">
                      <div className="relative rounded-xl border border-[#dcece5] bg-white p-3 shadow-sm">
                        <img src="/images/qris.jpeg" alt="QRIS Basecamp Campurejo" className="h-90 w-90 object-contain" />
                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#063d2b] text-xs font-bold text-white shadow-md">C</div>
                        </div>
                      </div>
                    </div>
                    <a href="/images/qris.jpeg" download="qris-basecamp-campurejo.jpeg" className=" inline-flex items-center rounded-lg bg-[#17634a] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0f503b]" onClick={(e) => e.stopPropagation()}>
                      Download QRIS
                    </a>
                    <p className="mt-3 text-xs font-bold uppercase text-[#063d2b]">Nama QRIS: Basecamp Prau via Campurejo</p>
                    <p className="mt-1 text-[11px] text-gray-500">Scan dengan GoPay, OVO, DANA, ShopeePay, BCA, Mandiri, BRI, dll.</p>
                  </div>

                  {/* DANA */}
                  <div 
                    className={`mt-4 cursor-pointer rounded-xl border ${metode === 'DANA' ? 'border-[#17634a] bg-[#e9f7f1]' : 'border-[#dcece5] bg-[#f8fcfa]'} p-5 transition`}
                    onClick={() => setMetode('DANA')}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs text-gray-500">DANA</p>
                        <p className="mt-1 text-lg font-bold text-[#063d2b]">085842303879</p>
                        <p className="mt-1 text-sm text-gray-500">Sabar Alim</p>
                      </div>
                      <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-[10px] font-bold text-red-600">GPN</span>
                    </div>
                  </div>

                  {/* BRI */}
                  <div 
                    className={`mt-4 cursor-pointer rounded-xl border ${metode === 'BRI' ? 'border-[#17634a] bg-[#e9f7f1]' : 'border-[#dcece5] bg-[#f8fcfa]'} p-5 transition`}
                    onClick={() => setMetode('BRI')}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Bank BRI</p>
                        <p className="mt-1 text-lg font-bold text-[#063d2b]">680701005107506</p>
                        <p className="mt-1 text-sm text-gray-500">Wahyu Ristianto</p>
                      </div>
                    </div>
                  </div>

                </div>

                <div className="rounded-xl border border-[#dcece5] bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-bold text-[#063d2b]">Bukti Pembayaran</h2>
                  <p className="mt-1 text-sm text-gray-500">Upload bukti transfer yang jelas dan dapat dibaca.</p>
                  <label className="mt-5 block cursor-pointer">
                    <div className="rounded-xl border-2 border-dashed border-[#cfe6dc] bg-[#f8fcfa] p-8 text-center transition hover:bg-[#f0f9f5]">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e5f4ee] text-xl">📷</div>
                      <p className="mt-4 text-sm font-semibold text-[#063d2b]">{fileName ? fileName : "Upload bukti pembayaran"}</p>
                      <p className="mt-1 text-xs text-gray-500">JPG, JPEG, PNG atau PDF</p>
                      <span className="mt-4 inline-block rounded-lg border border-[#17634a] px-4 py-2 text-sm font-semibold text-[#17634a]">Pilih File</span>
                    </div>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,application/pdf"
                      className="hidden"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (file) {
                          const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
                          const maxSize = 5 * 1024 * 1024;
                          if (!allowedTypes.includes(file.type) || file.size === 0 || file.size > maxSize) {
                            setFileName("");
                            setFile(null);
                            setFileError("File harus JPG, PNG, atau PDF dengan ukuran maksimal 5 MB.");
                            return;
                          }
                          setFileError("");
                          setFileName(file.name);
                          setFile(file);
                        }
                      }}
                    />
                  </label>
                </div>
                {fileError && <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-700">{fileError}</p>}

                <div className="rounded-xl border border-[#cfe6dc] bg-[#e9f7f1] p-5">
                  <h3 className="font-semibold text-[#063d2b]">Perhatian</h3>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-gray-600">
                    <li>• Pastikan nominal transfer sesuai total pembayaran.</li>
                    <li>• Pastikan bukti pembayaran terlihat jelas.</li>
                    <li>• Pembayaran akan diperiksa oleh admin Basecamp.</li>
                    <li>• E-Tiket diterbitkan setelah pembayaran disetujui.</li>
                  </ul>
                </div>
              </>
            )}
          </div>

          <aside className="h-fit rounded-xl border border-[#dcece5] bg-white p-6 shadow-sm lg:sticky lg:top-6">
            <h2 className="text-lg font-bold text-[#063d2b]">Ringkasan Pesanan</h2>
            <div className="mt-5 space-y-4">
              <div>
                <p className="text-xs text-gray-500">Nomor Pemesanan</p>
                <p className="mt-1 font-semibold text-[#063d2b]">{data?.id || id || "-"}</p>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Jalur</span>
                <span className="font-medium text-[#063d2b]">{data?.jalur?.nama_jalur || "Campurejo"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Tanggal</span>
                <span className="font-medium text-[#063d2b]">{data?.tanggal_naik || "-"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Jumlah Pendaki</span>
                <span className="font-medium text-[#063d2b]">{data?.jumlah_anggota || 1} orang</span>
              </div>
            </div>
            <div className="my-5 h-px bg-gray-100" />
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Total Pembayaran</span>
              <span className="text-xl font-bold text-[#063d2b]">Rp {Number(data?.total_harga || 0).toLocaleString("id-ID")}</span>
            </div>
            
            {(error || message) && (
              <p className={`mt-4 rounded-lg border px-4 py-3 text-xs font-medium ${error ? "border-red-200 bg-red-50 text-red-700" : "border-emerald-200 bg-emerald-50 text-emerald-700"}`}>
                {error || message}
              </p>
            )}

            {data?.status_pembayaran === "menunggu" && (
              <>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className={`mt-6 w-full rounded-lg px-5 py-3.5 text-sm font-semibold text-white transition ${submitting ? "bg-gray-400 cursor-not-allowed" : "bg-[#063d2b] hover:bg-[#052f22]"}`}
                >
                  {submitting ? "Mengunggah..." : "Kirim Bukti Pembayaran"}
                </button>
                <p className="mt-3 text-center text-xs leading-5 text-gray-400">
                  Dengan mengirim bukti pembayaran, data akan masuk ke proses verifikasi admin.
                </p>
              </>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}

export default function PembayaranPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Memuat...</div>}>
      <PembayaranContent />
    </Suspense>
  );
}