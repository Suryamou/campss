"use client";

import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";

type Vegetation = {
  id: number;
  name: string;
  scientificName: string;
  habitat: string;
  description: string;
  role: string;
  image: string;
  qrCode: string;
  status: "AKTIF" | "DRAFT";
};



export default function KelolaVegetasiPage() {
  const [vegetations, setVegetations] = useState<Vegetation[]>([]);

  useEffect(() => {
    fetchVegetasi();
  }, []);

  async function fetchVegetasi() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/vegetasi`);
      if (res.ok) {
        const json = await res.json();
        const formatted = json.data.map((item: any) => ({
          id: item.id,
          name: item.nama,
          scientificName: item.nama_latin,
          habitat: item.kategori || item.lokasi || "-",
          description: item.deskripsi,
          role: item.peran_ekologis,
          image: item.foto?.startsWith("http") ? item.foto : `/storage_proxy/${item.foto}`,
          qrCode: `VEG-CAMPSS-${String(item.id).padStart(3, "0")}`,
          status: "AKTIF",
        }));
        setVegetations(formatted);
      }
    } catch (err) {
      console.error("Gagal mengambil data vegetasi", err);
    }
  }

  const [showForm, setShowForm] = useState(false);

  const [selected, setSelected] =
    useState<Vegetation | null>(null);

  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    scientificName: "",
    habitat: "",
    description: "",
    role: "",
    image: null as File | null,
  });
  const [formError, setFormError] = useState("");

  const filteredVegetation = vegetations.filter((item) => {
    const keyword = search.toLowerCase();

    return (
      item.name.toLowerCase().includes(keyword) ||
      item.scientificName.toLowerCase().includes(keyword)
    );
  });

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setFormError("");

    if (!form.name || !form.scientificName || !form.habitat || !form.description) {
      setFormError("Nama, nama ilmiah, habitat, dan deskripsi wajib diisi.");
      return;
    }

    try {
      const token = localStorage.getItem("campss_admin_token") || sessionStorage.getItem("campss_admin_token");
      
      const formData = new FormData();
      formData.append("nama", form.name);
      formData.append("nama_latin", form.scientificName);
      formData.append("kategori", form.habitat);
      formData.append("deskripsi", form.description);
      formData.append("peran_ekologis", form.role);
      if (form.image) {
        formData.append("foto", form.image);
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/vegetasi`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData
      });

      if (res.ok) {
        setForm({
          name: "",
          scientificName: "",
          habitat: "",
          description: "",
          role: "",
          image: null,
        });
        setShowForm(false);
        fetchVegetasi(); // Reload data
      } else {
        alert("Gagal menyimpan data vegetasi");
      }
    } catch (err) {
      alert("Gagal terhubung ke server");
    }
  }

  async function deleteVegetation(id: number) {
    const confirmed = window.confirm("Yakin ingin menghapus data vegetasi ini?");
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("campss_admin_token") || sessionStorage.getItem("campss_admin_token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/vegetasi/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (res.ok) {
        setVegetations((current) => current.filter((item) => item.id !== id));
        setSelected(null);
      } else {
        alert("Gagal menghapus data");
      }
    } catch (err) {
      alert("Gagal terhubung ke server");
    }
  }

  return (
    <div className="px-5 py-7 md:px-8 md:py-9">

      {/* HEADER */}
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

        <div>

          <p className="text-sm font-semibold text-[#17634a]">
            Edukasi Jalur Pendakian
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#073d2b] md:text-3xl">
            Kelola Vegetasi
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
            Kelola informasi vegetasi yang akan ditampilkan
            kepada pendaki melalui QR edukasi di jalur
            pendakian Gunung Prau via Campurejo.
          </p>

        </div>

        <button
          onClick={() => setShowForm(true)}
          className="rounded-xl bg-[#073d2b] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#052f22]"
        >
          + Tambah Vegetasi
        </button>

      </div>

      {/* INFO */}
      <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50 p-5">

        <div className="flex gap-4">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-lg text-emerald-700">
            QR
          </div>

          <div>

            <p className="text-sm font-bold text-emerald-800">
              QR Edukasi Vegetasi
            </p>

            <p className="mt-1 max-w-3xl text-xs leading-5 text-emerald-700">
              Setiap data vegetasi memiliki identitas QR
              yang nantinya dapat digunakan sebagai tautan
              menuju halaman edukasi publik.
            </p>

          </div>

        </div>

      </div>

      {/* SEARCH */}
      <div className="mt-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">

        <div>

          <h2 className="font-bold text-[#073d2b]">
            Data Vegetasi
          </h2>

          <p className="mt-1 text-xs text-gray-400">
            {vegetations.length} data vegetasi tersimpan
          </p>

        </div>

        <div className="relative w-full md:w-[300px]">

          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            ⌕
          </span>

          <input
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Cari vegetasi..."
            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-9 pr-4 text-xs outline-none focus:border-[#17634a]"
          />

        </div>

      </div>

      {/* CARDS */}
      <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

        {filteredVegetation.map((item) => (

          <div
            key={item.id}
            className="overflow-hidden rounded-2xl border border-[#dfe9e4] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >

            {/* IMAGE */}
            <div className="relative h-44 overflow-hidden bg-gray-100">

              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover"
              />

              <div className="absolute left-3 top-3">

                <span className="rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold text-emerald-700 shadow-sm">
                  ● {item.status}
                </span>

              </div>

            </div>

            {/* CONTENT */}
            <div className="p-5">

              <h3 className="text-base font-bold text-[#073d2b]">
                {item.name}
              </h3>

              <p className="mt-1 text-xs italic text-gray-400">
                {item.scientificName}
              </p>

              <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">

                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#e8f4ee] text-[#17634a]">
                  ◉
                </span>

                {item.habitat}

              </div>

              <p className="mt-4 line-clamp-2 text-xs leading-5 text-gray-500">
                {item.description}
              </p>

              {/* QR */}
              <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">

                <div>

                  <p className="text-[9px] uppercase tracking-wider text-gray-400">
                    ID QR
                  </p>

                  <p className="mt-1 font-mono text-[10px] font-bold text-[#073d2b]">
                    {item.qrCode}
                  </p>

                </div>

                <button
                  onClick={() => setSelected(item)}
                  className="rounded-xl border border-gray-200 px-3 py-2 text-[10px] font-bold text-gray-600 hover:bg-gray-50"
                >
                  Kelola
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* EMPTY */}
      {filteredVegetation.length === 0 && (

        <div className="mt-5 rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 text-gray-400">
            🌿
          </div>

          <p className="mt-4 text-sm font-bold text-[#073d2b]">
            Vegetasi tidak ditemukan
          </p>

          <p className="mt-1 text-xs text-gray-400">
            Coba gunakan kata kunci lain.
          </p>

        </div>

      )}

      {/* ADD MODAL */}
      {showForm && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#03241a]/50 p-4 backdrop-blur-sm">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

            <div className="flex items-center justify-between border-b border-gray-100 p-6">

              <div>

                <p className="text-[10px] font-bold uppercase tracking-wider text-[#17634a]">
                  Data Vegetasi
                </p>

                <h2 className="mt-1 text-lg font-bold text-[#073d2b]">
                  Tambah Vegetasi
                </h2>

              </div>

              <button
                onClick={() => setShowForm(false)}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-50 text-gray-500"
              >
                ×
              </button>

            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6"
            >

              <div className="grid gap-5 md:grid-cols-2">

                <Input
                  label="Nama Lokal"
                  placeholder="Contoh: Edelweiss Jawa"
                  value={form.name}
                  onChange={(value) =>
                    setForm({
                      ...form,
                      name: value,
                    })
                  }
                />

                <Input
                  label="Nama Ilmiah"
                  placeholder="Contoh: Anaphalis javanica"
                  value={form.scientificName}
                  onChange={(value) =>
                    setForm({
                      ...form,
                      scientificName: value,
                    })
                  }
                />

              </div>

              <Input
                label="Habitat"
                placeholder="Contoh: Zona pegunungan tinggi"
                value={form.habitat}
                onChange={(value) =>
                  setForm({
                    ...form,
                    habitat: value,
                  })
                }
              />

              <Textarea
                label="Deskripsi"
                placeholder="Tuliskan informasi mengenai vegetasi..."
                value={form.description}
                onChange={(value) =>
                  setForm({
                    ...form,
                    description: value,
                  })
                }
              />

              <Textarea
                label="Peran Ekologis"
                placeholder="Tuliskan peran vegetasi terhadap ekosistem..."
                value={form.role}
                onChange={(value) =>
                  setForm({
                    ...form,
                    role: value,
                  })
                }
              />

              {formError && (
                <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-700">
                  {formError}
                </p>
              )}

              <div>
                <label className="mb-2 block text-xs font-semibold text-gray-600">
                  Upload Foto
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setForm({ ...form, image: e.target.files?.[0] || null })}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-[#073d2b] focus:outline-none focus:ring-1 focus:ring-[#073d2b]"
                />
              </div>

              <div className="flex gap-3 pt-2">

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-[#073d2b] px-5 py-3 text-sm font-bold text-white hover:bg-[#052f22]"
                >
                  Simpan Vegetasi
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {/* DETAIL MODAL */}
      {selected && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#03241a]/50 p-4 backdrop-blur-sm">

          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl">

            <div className="relative h-52 overflow-hidden">

              <img
                src={selected.image}
                alt={selected.name}
                className="h-full w-full object-cover"
              />

              <button
                onClick={() => setSelected(null)}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-xl bg-white/95 text-gray-600 shadow"
              >
                ×
              </button>

            </div>

            <div className="p-6">

              <p className="text-[10px] font-bold uppercase tracking-wider text-[#17634a]">
                Detail Vegetasi
              </p>

              <h2 className="mt-1 text-xl font-bold text-[#073d2b]">
                {selected.name}
              </h2>

              <p className="mt-1 text-xs italic text-gray-400">
                {selected.scientificName}
              </p>

              <div className="mt-5 space-y-4">

                <Info
                  label="Habitat"
                  value={selected.habitat}
                />

                <Info
                  label="Deskripsi"
                  value={selected.description}
                />

                <Info
                  label="Peran Ekologis"
                  value={selected.role}
                />

              </div>

              {/* QR PREVIEW */}
              <div className="mt-6 rounded-2xl border border-gray-100 bg-[#f8faf9] p-5">

                <div className="flex items-center gap-4">

                  <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl border-4 border-white bg-white text-center shadow-sm">
                    <QRCodeSVG
                      value={`${typeof window !== "undefined" ? window.location.origin : ""}/vegetasi/${getVegetationSlug(selected.name)}`}
                      size={82}
                      includeMargin
                    />
                  </div>

                  <div>

                    <p className="text-xs font-bold text-[#073d2b]">
                      QR Edukasi
                    </p>

                    <p className="mt-1 text-[10px] leading-4 text-gray-400">
                      QR ini nantinya mengarah ke halaman
                      edukasi publik vegetasi.
                    </p>

                    <p className="mt-2 font-mono text-[9px] font-bold text-[#17634a]">
                      /vegetasi/{getVegetationSlug(selected.name)}
                    </p>

                  </div>

                </div>

              </div>

              {/* ACTIONS */}
              <div className="mt-5 flex gap-3">

                <button
                  onClick={() => window.print()}
                  className="flex-1 rounded-xl bg-[#073d2b] px-4 py-3 text-xs font-bold text-white hover:bg-[#052f22]"
                >
                  Cetak QR
                </button>

                <button
                  onClick={() =>
                    deleteVegetation(selected.id)
                  }
                  className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-xs font-bold text-red-600 hover:bg-red-100"
                >
                  Hapus
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

/* =========================
   INPUT
========================= */

function Input({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>

      <label className="mb-2 block text-xs font-semibold text-gray-600">
        {label}
      </label>

      <input
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-xs outline-none focus:border-[#17634a] focus:bg-white"
      />

    </div>
  );
}

/* =========================
   TEXTAREA
========================= */

function Textarea({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>

      <label className="mb-2 block text-xs font-semibold text-gray-600">
        {label}
      </label>

      <textarea
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        rows={4}
        className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-xs leading-5 outline-none focus:border-[#17634a] focus:bg-white"
      />

    </div>
  );
}

/* =========================
   INFO
========================= */

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>

      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
        {label}
      </p>

      <p className="mt-1 text-xs leading-5 text-gray-600">
        {value}
      </p>

    </div>
  );
}

function getVegetationSlug(name: string) {
  const normalized = name.toLowerCase();
  if (normalized.includes("kopi")) return "kopi-arabika";
  if (normalized.includes("jambu")) return "jambu-air";
  if (normalized.includes("tembakau")) return "tembakau-temanggung";
  if (normalized.includes("edelweis")) return "edelweis";
  if (normalized.includes("cantigi")) return "cemara-gunung";
  return normalized.trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "vegetasi";
}