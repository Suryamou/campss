import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import MarkVegetationLearned from "@/components/MarkVegetationLearned";
import { dataVegetasi } from "@/lib/vegetasi";
import Info from "@/components/Info";

export default async function VegetasiDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  let vegetasi = null;
  
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://157.10.252.30/api';
    const storageUrl = apiUrl.replace('/api', '');
    const res = await fetch(`${apiUrl}/vegetasi`, { cache: 'no-store' });
    
    if (res.ok) {
      const json = await res.json();
      const items = json.data || [];
      const dbItem = items.find((i: any) => {
        const itemSlug = i.slug || i.nama.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        return itemSlug === slug;
      });
      
      if (dbItem) {
        vegetasi = {
          slug: dbItem.slug || dbItem.nama.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
          nama: dbItem.nama,
          namaLatin: dbItem.nama_latin || dbItem.namaLatin || "-",
          kategori: dbItem.kategori || dbItem.lokasi || "Flora Gunung Prau",
          foto: dbItem.foto ? (dbItem.foto.startsWith('http') ? dbItem.foto : `${storageUrl}/storage/${dbItem.foto}`) : "/images/placeholder.jpg",
          deskripsi: dbItem.deskripsi || "Tidak ada deskripsi tersedia.",
          peran: dbItem.peran_ekologis || dbItem.peran || "Menjaga keseimbangan ekosistem pegunungan.",
          lokasi: dbItem.lokasi || dbItem.kategori || "Jalur pendakian Gunung Prau",
          manfaat: dbItem.manfaat || "Sebagai bagian dari keanekaragaman hayati.",
          fakta: dbItem.fakta_menarik || dbItem.fakta || "Flora pegunungan memiliki adaptasi khusus.",
          ciriCiri: dbItem.ciri_ciri ? JSON.parse(dbItem.ciri_ciri) : ["Bentuk adaptasi unik flora pegunungan"]
        };
      }
    }
  } catch (error) {
    console.error("Gagal mengambil data vegetasi dari API", error);
  }

  // Fallback ke data statis jika tidak ada di database
  if (!vegetasi) {
    vegetasi = dataVegetasi.find((item) => item.slug === slug);
  }

  if (!vegetasi) notFound();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#e9f9f2] text-[#063d2b]">
        <section className="border-b border-[#cfe8dc] bg-white">
          <div className="mx-auto max-w-7xl px-6 py-10">
            <Link href="/vegetasi" className="text-sm font-medium text-[#17634a] hover:underline">
              ← Kembali ke Vegetasi
            </Link>
            <div className="mt-7">
              <p className="text-sm font-semibold text-[#17634a]">{vegetasi.kategori}</p>
              <h1 className="mt-2 text-3xl font-bold md:text-4xl">{vegetasi.nama}</h1>
              <p className="mt-2 text-sm italic text-gray-500">{vegetasi.namaLatin}</p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-10">
          <div className="grid overflow-hidden rounded-2xl bg-white shadow-sm lg:grid-cols-[1.05fr_1fr]">
            <div className="relative min-h-[300px] bg-gray-100 md:min-h-[390px]">
              <Image src={vegetasi.foto} alt={vegetasi.nama} fill priority className="object-cover" />
            </div>
            <div className="p-7 md:p-10">
              <h2 className="text-xl font-bold text-[#063d2b]">Tentang Vegetasi</h2>
              <p className="mt-4 text-sm leading-7 text-gray-600">{vegetasi.deskripsi}</p>
              <MarkVegetationLearned slug={vegetasi.slug} />
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <Info label="Ciri-ciri" value={vegetasi.ciriCiri.join(" • ")} />
                <Info label="Peran Ekologis" value={vegetasi.peran} />
                <Info label="Habitat / Lokasi" value={vegetasi.lokasi} />
                <Info label="Manfaat" value={vegetasi.manfaat} />
                <Info label="Fakta Menarik" value={vegetasi.fakta} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-[#f4faf7] p-4">
      <p className="text-xs font-semibold text-[#17634a]">{label}</p>
      <p className="mt-2 text-xs leading-5 text-gray-600">{value}</p>
    </div>
  );
}
