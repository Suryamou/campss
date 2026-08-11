"use client";

import { useMemo, useState } from "react";

type QuotaStatus = "BUKA" | "TERTUTUP";

type Quota = {
  id: number;
  date: string;
  quota: number;
  used: number;
  status: QuotaStatus;
};

const initialQuota: Quota[] = [
  {
    id: 1,
    date: "12 Agustus 2026",
    quota: 100,
    used: 64,
    status: "BUKA",
  },
  {
    id: 2,
    date: "13 Agustus 2026",
    quota: 75,
    used: 42,
    status: "BUKA",
  },
  {
    id: 3,
    date: "14 Agustus 2026",
    quota: 50,
    used: 50,
    status: "BUKA",
  },
  {
    id: 4,
    date: "15 Agustus 2026",
    quota: 0,
    used: 0,
    status: "TERTUTUP",
  },
  {
    id: 5,
    date: "16 Agustus 2026",
    quota: 100,
    used: 18,
    status: "BUKA",
  },
];

export default function KelolaKuotaPage() {
  const [quotas, setQuotas] = useState(initialQuota);
  const [selectedDate, setSelectedDate] = useState("");
  const [newQuota, setNewQuota] = useState("");
  const [selectedQuota, setSelectedQuota] = useState<Quota | null>(null);
  const [message, setMessage] = useState("");

  const totalQuota = useMemo(
    () => quotas.reduce((total, item) => total + item.quota, 0),
    [quotas]
  );

  const totalUsed = useMemo(
    () => quotas.reduce((total, item) => total + item.used, 0),
    [quotas]
  );

  const totalRemaining = Math.max(totalQuota - totalUsed, 0);

  function handleAddQuota(event: React.FormEvent) {
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

    const existing = quotas.find(
      (item) => item.date === selectedDate
    );

    if (existing) {
      setMessage("Tanggal tersebut sudah memiliki pengaturan kuota.");
      return;
    }

    setQuotas((current) => [
      ...current,
      {
        id: Date.now(),
        date: selectedDate,
        quota: quotaValue,
        used: 0,
        status: "BUKA",
      },
    ]);

    setSelectedDate("");
    setNewQuota("");
    setMessage("Kuota berhasil ditambahkan.");
  }

  function handleUpdateQuota(id: number, quota: number) {
    if (quota < 0 || quota > 100) {
      setMessage("Kuota harus berada di antara 0 sampai 100.");
      return;
    }

    const item = quotas.find((quotaItem) => quotaItem.id === id);

    if (!item) return;

    if (quota < item.used) {
      setMessage(
        `Kuota tidak dapat kurang dari jumlah terpakai (${item.used} orang).`
      );
      return;
    }

    setQuotas((current) =>
      current.map((quotaItem) =>
        quotaItem.id === id
          ? {
              ...quotaItem,
              quota,
              status: quota === 0 ? "TERTUTUP" : "BUKA",
            }
          : quotaItem
      )
    );

    setMessage("Kuota berhasil diperbarui.");
    setSelectedQuota(null);
  }

  function toggleStatus(id: number) {
    setQuotas((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              status:
                item.status === "BUKA"
                  ? "TERTUTUP"
                  : "BUKA",
            }
          : item
      )
    );

    setMessage("Status tanggal berhasil diperbarui.");
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
            Atur jumlah kuota pendaki yang dibuka oleh
            basecamp untuk setiap tanggal pendakian.
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
          <h2 className="font-bold text-[#073d2b]">
            Buka Kuota Baru
          </h2>

          <p className="mt-1 text-xs text-gray-400">
            Tentukan tanggal dan jumlah pendaki yang dapat
            melakukan pemesanan.
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
              onChange={(event) =>
                setSelectedDate(event.target.value)
              }
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
              onChange={(event) =>
                setNewQuota(event.target.value)
              }
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

          <h2 className="font-bold text-[#073d2b]">
            Jadwal Kuota Pendakian
          </h2>

          <p className="mt-1 text-xs text-gray-400">
            Kelola kuota dan status pembukaan pendakian.
          </p>

        </div>

        <div className="divide-y divide-gray-100">

          {quotas.map((item) => {

            const remaining = Math.max(
              item.quota - item.used,
              0
            );

            const percentage =
              item.quota > 0
                ? Math.min(
                    Math.round(
                      (item.used / item.quota) * 100
                    ),
                    100
                  )
                : 0;

            return (
              <div
                key={item.id}
                className="p-5 md:p-6"
              >

                <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">

                  {/* DATE */}
                  <div className="min-w-[210px]">

                    <div className="flex items-center gap-3">

                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f4ee] text-lg text-[#17634a]">
                        ◷
                      </div>

                      <div>

                        <p className="text-sm font-bold text-[#073d2b]">
                          {item.date}
                        </p>

                        <p className="mt-1 text-[10px] text-gray-400">
                          Kuota harian pendakian
                        </p>

                      </div>

                    </div>

                  </div>

                  {/* QUOTA */}
                  <div className="min-w-[230px] flex-1">

                    <div className="flex justify-between">

                      <span className="text-xs text-gray-500">
                        Penggunaan kuota
                      </span>

                      <span className="text-xs font-bold text-[#073d2b]">
                        {item.used} / {item.quota}
                      </span>

                    </div>

                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">

                      <div
                        className="h-full rounded-full bg-[#17634a] transition-all"
                        style={{
                          width: `${percentage}%`,
                        }}
                      />

                    </div>

                    <p className="mt-2 text-[10px] text-gray-400">
                      {remaining} slot tersisa
                    </p>

                  </div>

                  {/* STATUS */}
                  <div>

                    <button
                      onClick={() => toggleStatus(item.id)}
                      className={`rounded-full px-4 py-2 text-[10px] font-bold ${
                        item.status === "BUKA"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      <span className="mr-1.5">
                        ●
                      </span>

                      {item.status === "BUKA"
                        ? "DIBUKA"
                        : "DITUTUP"}
                    </button>

                  </div>

                  {/* ACTION */}
                  <div className="flex gap-2">

                    <button
                      onClick={() =>
                        setSelectedQuota(item)
                      }
                      className="rounded-xl border border-gray-200 px-4 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-50"
                    >
                      Ubah Kuota
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

            <p className="text-xs font-bold text-amber-800">
              Aturan Kuota CAMPSS
            </p>

            <p className="mt-1 text-xs leading-5 text-amber-700">
              Kuota maksimal yang dapat dibuka adalah
              100 orang per hari. Admin basecamp dapat
              menentukan jumlah kuota sesuai kondisi
              operasional pada masing-masing tanggal.
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

    </div>
  );
}

/* =========================
   STAT
========================= */

function Stat({
  title,
  value,
  description,
  icon,
}: {
  title: string;
  value: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="rounded-2xl border border-[#dfe9e4] bg-white p-5 shadow-sm">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-xs text-gray-500">
            {title}
          </p>

          <p className="mt-3 text-3xl font-bold text-[#073d2b]">
            {value}
          </p>

          <p className="mt-1 text-[10px] text-gray-400">
            {description}
          </p>

        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f4ee] text-[#17634a]">
          {icon}
        </div>

      </div>

    </div>
  );
}

/* =========================
   EDIT MODAL
========================= */

function EditQuotaModal({
  quota,
  onClose,
  onSave,
}: {
  quota: Quota;
  onClose: () => void;
  onSave: (id: number, quota: number) => void;
}) {
  const [value, setValue] = useState(String(quota.quota));

  function submit() {
    onSave(quota.id, Number(value));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#03241a]/50 p-4 backdrop-blur-sm">

      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">

        <div className="flex items-center justify-between border-b border-gray-100 p-6">

          <div>

            <p className="text-[10px] font-bold uppercase tracking-wider text-[#17634a]">
              Pengaturan Kuota
            </p>

            <h2 className="mt-1 text-lg font-bold text-[#073d2b]">
              {quota.date}
            </h2>

          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-50 text-gray-500"
          >
            ×
          </button>

        </div>

        <div className="p-6">

          <div className="rounded-xl bg-[#f7faf8] p-4">

            <div className="flex justify-between text-xs">

              <span className="text-gray-500">
                Sudah terpakai
              </span>

              <span className="font-bold text-[#073d2b]">
                {quota.used} orang
              </span>

            </div>

            <div className="mt-2 flex justify-between text-xs">

              <span className="text-gray-500">
                Batas maksimal
              </span>

              <span className="font-bold text-[#073d2b]">
                100 orang
              </span>

            </div>

          </div>

          <label className="mt-5 block text-xs font-semibold text-gray-600">
            Jumlah Kuota
          </label>

          <input
            type="number"
            min={quota.used}
            max={100}
            value={value}
            onChange={(event) =>
              setValue(event.target.value)
            }
            className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[#17634a] focus:bg-white"
          />

          <p className="mt-2 text-[10px] text-gray-400">
            Kuota tidak boleh kurang dari jumlah pendaki
            yang sudah terdaftar.
          </p>

          <div className="mt-6 flex gap-3">

            <button
              onClick={onClose}
              className="flex-1 rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50"
            >
              Batal
            </button>

            <button
              onClick={submit}
              className="flex-1 rounded-xl bg-[#073d2b] px-5 py-3 text-sm font-bold text-white hover:bg-[#052f22]"
            >
              Simpan
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}