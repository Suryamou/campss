"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminModal from "@/components/AdminModal";

type QuotaStatus = "buka" | "tutup";

type Quota = {
  id: number;
  tanggal: string;
  kuota_maksimal: number;
  terpakai: number;
  status: QuotaStatus;
};

export default function KelolaKuotaPage() {
  const router = useRouter();
  const [quotas, setQuotas] = useState<Quota[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [newQuota, setNewQuota] = useState("");
  const [selectedQuota, setSelectedQuota] = useState<Quota | null>(null);
  const [message, setMessage] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    fetchQuotas();
  }, []);

  async function fetchQuotas() {
    try {
      const token = localStorage.getItem("campss_admin_token");
      if (!token) {
        router.push("/portal-admin/login");
        return;
      }
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/kuota`, {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
      });
      const data = await res.json();
      if (res.ok) {
        setQuotas(data.data || []);
      }
    } catch (e) {
      console.error(e);
    }
  }

  const totalQuota = useMemo(
    () => quotas.reduce((total, item) => total + Number(item.kuota_maksimal || 0), 0),
    [quotas]
  );

  const totalUsed = useMemo(
    () => quotas.reduce((total, item) => total + Number(item.terpakai || 0), 0),
    [quotas]
  );

  const totalRemaining = Math.max(totalQuota - totalUsed, 0);

  async function handleAddQuota(event: React.FormEvent) {
    event.preventDefault();

    if (!selectedDate) {
      setMessage("Silakan pilih tanggal pendakian.");
      return;
    }

    const quotaValue = Number(newQuota);

    if (!quotaValue || quotaValue < 1) {
      setMessage("Kuota harus lebih dari 0.");
      return;
    }

    if (quotaValue > 100) {
      setMessage("Kuota maksimal adalah 100 orang per hari.");
      return;
    }

    try {
      const token = localStorage.getItem("campss_admin_token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/kuota`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          jalur_id: 1, // Default ke jalur pertama
          tanggal: selectedDate,
          kuota_maksimal: quotaValue,
          status: "buka"
        })
      });

      if (res.ok) {
        fetchQuotas();
        setSelectedDate("");
        setNewQuota("");
        setMessage("Kuota berhasil ditambahkan.");
      } else {
        const err = await res.json();
        setMessage(err.message || "Gagal menambah kuota");
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function handleUpdateQuota(id: number, quota: number) {
    if (quota < 0 || quota > 100) {
      setMessage("Kuota harus berada di antara 0 sampai 100.");
      return;
    }

    const item = quotas.find((quotaItem) => quotaItem.id === id);

    if (!item) return;

    try {
      const token = localStorage.getItem("campss_admin_token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/kuota`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          jalur_id: 1,
          tanggal: item.tanggal,
          kuota_maksimal: quota,
          status: quota === 0 ? "tutup" : "buka"
        })
      });

      if (res.ok) {
        fetchQuotas();
        setMessage("Kuota berhasil diperbarui.");
        setSelectedQuota(null);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function toggleStatus(id: number) {
    const item = quotas.find((q) => q.id === id);
    if (!item) return;

    try {
      const token = localStorage.getItem("campss_admin_token");
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/kuota`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          jalur_id: 1,
          tanggal: item.tanggal,
          kuota_maksimal: item.kuota_maksimal,
          status: item.status === "buka" ? "tutup" : "buka"
        })
      });
      fetchQuotas();
      setMessage("Status tanggal berhasil diperbarui.");
    } catch (e) {
      console.error(e);
    }
  }

  function confirmDeleteQuota(id: number) {
    setDeleteId(id);
  }

  async function handleDeleteQuota() {
    if (!deleteId) return;

    try {
      const token = localStorage.getItem("campss_admin_token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/kuota/${deleteId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json"
        }
      });

      if (res.ok) {
        fetchQuotas();
        setMessage("Kuota berhasil dihapus.");
      } else {
        const err = await res.json();
        setMessage(err.message || "Gagal menghapus kuota");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setDeleteId(null);
    }
  }

  return (
    <div className="px-5 py-7 md:px-8 md:py-9">

      {/* HEADER */}
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold text-[#17634a]">
            Pengaturan Pendakian
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#073d2b] md:text-3xl">
            Kelola Kuota Pendakian
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
            Atur jumlah kuota pendaki yang dibuka oleh basecamp untuk setiap tanggal pendakian.
          </p>
        </div>
        <div className="rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2">
          <span className="text-xs font-semibold text-emerald-700">
            Maksimal 100 orang / hari
          </span>
        </div>
      </div>

      {/* ALERT */}
      {message && (
        <div className="mt-6 flex items-center justify-between rounded-xl border border-[#d8e9e1] bg-[#f5faf7] px-4 py-3">
          <p className="text-xs font-medium text-[#17634a]">
            {message}
          </p>
          <button
            onClick={() => setMessage("")}
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>
      )}

      {/* STAT */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Stat
          title="Total Kuota"
          value={`${totalQuota}`}
          description="orang dari seluruh tanggal"
          icon="◉"
        />
        <Stat
          title="Sudah Terpakai"
          value={`${totalUsed}`}
          description="orang telah terdaftar"
          icon="⌁"
        />
        <Stat
          title="Sisa Kuota"
          value={`${totalRemaining}`}
          description="slot masih tersedia"
          icon="✓"
        />
      </div>

      {/* ADD QUOTA */}
      <section className="mt-6 rounded-2xl border border-[#dfe9e4] bg-white p-5 shadow-sm md:p-6">
        <div>
          <h2 className="font-bold text-[#073d2b]">Buka Kuota Baru</h2>
          <p className="mt-1 text-xs text-gray-400">
            Tentukan tanggal dan jumlah pendaki yang dapat melakukan pemesanan.
          </p>
        </div>
        <form
          onSubmit={handleAddQuota}
          className="mt-5 grid gap-4 md:grid-cols-[1fr_220px_auto]"
        >
          <div>
            <label className="mb-2 block text-xs font-semibold text-gray-600">
              Tanggal Pendakian
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(event) => setSelectedDate(event.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[#17634a] focus:bg-white"
            />
          </div>
          <div>
            <label className="mb-2 block text-xs font-semibold text-gray-600">
              Kuota
            </label>
            <input
              type="number"
              min={1}
              max={100}
              value={newQuota}
              onChange={(event) => setNewQuota(event.target.value)}
              placeholder="Contoh: 100"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[#17634a] focus:bg-white"
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full rounded-xl bg-[#073d2b] px-5 py-3 text-sm font-bold text-white hover:bg-[#052f22] md:w-auto"
            >
              Buka Kuota
            </button>
          </div>
        </form>
      </section>

      {/* QUOTA LIST */}
      <section className="mt-6 rounded-2xl border border-[#dfe9e4] bg-white shadow-sm">
        <div className="border-b border-gray-100 p-5 md:p-6">
          <h2 className="font-bold text-[#073d2b]">Jadwal Kuota Pendakian</h2>
          <p className="mt-1 text-xs text-gray-400">Kelola kuota dan status pembukaan pendakian.</p>
        </div>
        <div className="divide-y divide-gray-100">
          {quotas.map((item) => {
            const remaining = Math.max(item.kuota_maksimal - (item.terpakai || 0), 0);
            const percentage = item.kuota_maksimal > 0
              ? Math.min(Math.round(((item.terpakai || 0) / item.kuota_maksimal) * 100), 100)
              : 0;

            return (
              <div key={item.id} className="p-5 md:p-6">
                <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
                  
                  {/* DATE */}
                  <div className="min-w-[210px]">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f4ee] text-lg text-[#17634a]">
                        ◷
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#073d2b]">{item.tanggal}</p>
                        <p className="mt-1 text-[10px] text-gray-400">Kuota harian pendakian</p>
                      </div>
                    </div>
                  </div>

                  {/* QUOTA */}
                  <div className="min-w-[230px] flex-1">
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">Penggunaan kuota</span>
                      <span className="text-xs font-bold text-[#073d2b]">{item.terpakai || 0} / {item.kuota_maksimal}</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full bg-[#17634a] transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <p className="mt-2 text-[10px] text-gray-400">{remaining} slot tersisa</p>
                  </div>

                  {/* STATUS */}
                  <div>
                    <button
                      onClick={() => toggleStatus(item.id)}
                      className={`rounded-full px-4 py-2 text-[10px] font-bold ${
                        item.status === "buka" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      <span className="mr-1.5">●</span>
                      {item.status === "buka" ? "DIBUKA" : "DITUTUP"}
                    </button>
                  </div>

                  {/* ACTION */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedQuota(item)}
                      className="rounded-xl border border-gray-200 px-4 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-50"
                    >
                      Ubah Kuota
                    </button>
                    <button
                      onClick={() => confirmDeleteQuota(item.id)}
                      className="rounded-xl border border-red-200 px-4 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 transition"
                    >
                      Hapus
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* IMPORTANT NOTE */}
      <div className="mt-6 rounded-xl border border-amber-100 bg-amber-50 p-4">
        <div className="flex gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
            !
          </div>
          <div>
            <p className="text-xs font-bold text-amber-800">Aturan Kuota CAMPSS</p>
            <p className="mt-1 text-xs leading-5 text-amber-700">
              Kuota maksimal yang dapat dibuka adalah 100 orang per hari. Admin basecamp dapat menentukan jumlah kuota sesuai kondisi operasional pada masing-masing tanggal.
            </p>
          </div>
        </div>
      </div>

      {/* EDIT MODAL */}
      {selectedQuota && (
        <EditQuotaModal
          quota={selectedQuota}
          onClose={() => setSelectedQuota(null)}
          onSave={handleUpdateQuota}
        />
      )}

      {/* CONFIRM DELETE MODAL */}
      <AdminModal
        isOpen={deleteId !== null}
        type="confirm"
        title="Hapus Kuota"
        message="Apakah Anda yakin ingin menghapus kuota untuk tanggal ini? Tindakan ini tidak dapat dibatalkan."
        onConfirm={handleDeleteQuota}
        onClose={() => setDeleteId(null)}
      />
    </div>
  );
}

function Stat({ title, value, description, icon }: { title: string; value: string; description: string; icon: string; }) {
  return (
    <div className="rounded-2xl border border-[#dfe9e4] bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-gray-500">{title}</p>
          <p className="mt-3 text-3xl font-bold text-[#073d2b]">{value}</p>
          <p className="mt-1 text-[10px] text-gray-400">{description}</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f4ee] text-[#17634a]">
          {icon}
        </div>
      </div>
    </div>
  );
}

function EditQuotaModal({
  quota,
  onClose,
  onSave,
}: {
  quota: Quota;
  onClose: () => void;
  onSave: (id: number, quota: number) => void;
}) {
  const [value, setValue] = useState(String(quota.kuota_maksimal));

  function submit() {
    onSave(quota.id, Number(value));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#03241a]/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-100 p-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#17634a]">Pengaturan Kuota</p>
            <h2 className="mt-1 text-lg font-bold text-[#073d2b]">{quota.tanggal}</h2>
          </div>
          <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-50 text-gray-500">×</button>
        </div>
        <div className="p-6">
          <div className="rounded-xl bg-[#f7faf8] p-4">
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Sudah terpakai</span>
              <span className="font-bold text-[#073d2b]">{quota.terpakai || 0} orang</span>
            </div>
            <div className="mt-2 flex justify-between text-xs">
              <span className="text-gray-500">Batas maksimal</span>
              <span className="font-bold text-[#073d2b]">100 orang</span>
            </div>
          </div>
          <label className="mt-5 block text-xs font-semibold text-gray-600">Jumlah Kuota</label>
          <input
            type="number"
            min={quota.terpakai || 0}
            max={100}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[#17634a] focus:bg-white"
          />
          <p className="mt-2 text-[10px] text-gray-400">
            Kuota tidak boleh kurang dari jumlah pendaki yang sudah terdaftar.
          </p>
          <div className="mt-6 flex gap-3">
            <button onClick={onClose} className="flex-1 rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50">Batal</button>
            <button onClick={submit} className="flex-1 rounded-xl bg-[#073d2b] px-5 py-3 text-sm font-bold text-white hover:bg-[#052f22]">Simpan</button>
          </div>
        </div>
      </div>
    </div>
  );
}