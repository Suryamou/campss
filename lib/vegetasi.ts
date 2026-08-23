export type Vegetation = {
  slug: string;
  nama: string;
  namaLatin: string;
  kategori: string;
  foto: string;
  deskripsi: string;
  ciriCiri: string[];
  peran: string;
  lokasi: string;
  manfaat: string;
  fakta: string;
};

export const dataVegetasi: Vegetation[] = [
  { slug: "kopi-arabika", nama: "Kopi Arabika", namaLatin: "Coffea arabica", kategori: "Komoditas Unggulan", foto: "/images/vegetasi/kopi-arabika.jpg", deskripsi: "Ditemukan melimpah di sepanjang perkebunan lereng Gunung Prau via Campurejo. Kopi Arabika merupakan komoditas utama masyarakat lokal.", ciriCiri: ["Daun hijau mengilap", "Biji berbentuk oval", "Tumbuh sebagai perdu"], peran: "Menjaga stabilitas tanah lereng dari bahaya erosi serta berfungsi sebagai tanaman penyerap karbon yang sangat efektif.", lokasi: "Area perkebunan warga dari Pos 1 hingga mendekati batas hutan pendakian.", manfaat: "Menjadi penopang ekonomi utama warga Campurejo dan disajikan sebagai minuman hangat khas penyambut pendaki.", fakta: "Tanah vulkanik subur dan udara dingin Temanggung memberikan cita rasa manis alami pada biji kopinya." },
  { slug: "jambu-air", nama: "Jambu Air", namaLatin: "Syzygium aqueum", kategori: "Flora Pekarangan & Perkebunan", foto: "/images/vegetasi/jambuair.jpg", deskripsi: "Banyak dibudidayakan warga Desa Campurejo di pekarangan rumah dan batas ladang lereng gunung.", ciriCiri: ["Buah berbentuk lonceng", "Daging buah berair", "Daun berwarna hijau tua"], peran: "Membantu menjaga kelembapan tanah pemukiman serta menyerap air hujan untuk mencegah erosi permukaan.", lokasi: "Area pemukiman warga Desa Campurejo dan pekarangan batas awal pendakian.", manfaat: "Buahnya kaya air dan vitamin C, menjadi penambah kesegaran alami bagi warga maupun pendaki.", fakta: "Jambu air yang tumbuh di suhu sejuk Campurejo memiliki tekstur daging yang lebih renyah." },
  { slug: "tembakau-temanggung", nama: "Tembakau Temanggung", namaLatin: "Nicotiana tabacum", kategori: "Komoditas Pertanian", foto: "/images/vegetasi/tembakau.jpeg", deskripsi: "Tanaman ikonik Kabupaten Temanggung yang menghiasi terasering pertanian warga Desa Campurejo.", ciriCiri: ["Daun lebar", "Permukaan daun berbulu", "Aroma khas saat dikeringkan"], peran: "Memaksimalkan pemanfaatan lahan terasering warga dan menguatkan struktur tanah ladang lereng gunung.", lokasi: "Hamparan ladang terasering di sekitar Desa Campurejo sebelum gerbang hutan.", manfaat: "Warisan budaya pertanian dan sumber mata pencaharian tradisi masyarakat pegunungan Temanggung.", fakta: "Sinar matahari pagi dan angin sejuk lereng Prau menghasilkan daun tembakau berkualitas." },
  { slug: "edelweis", nama: "Bunga Edelweis", namaLatin: "Anaphalis javanica", kategori: "Flora Endemik Pegunungan", foto: "/images/vegetasi/edelweis.jpg", deskripsi: "Bunga abadi khas pegunungan Indonesia yang tumbuh alami dan dilindungi di kawasan konservasi puncak Gunung Prau.", ciriCiri: ["Bunga putih keperakan", "Batang berbulu halus", "Tahan udara dingin"], peran: "Tanaman pelopor yang mampu hidup di tanah tandus pegunungan serta mencegah erosi area puncak.", lokasi: "Area sabana dan lereng terbuka bagian atas Gunung Prau.", manfaat: "Menjaga keseimbangan ekosistem puncak dan menyediakan nektar bagi serangga endemik.", fakta: "Hormon etilen pada bunga Edelweis membantu kelopaknya tidak mudah layu." },
  { slug: "cemara-gunung", nama: "Cemara Gunung", namaLatin: "Casuarina junghuhniana", kategori: "Pohon Hutan Pegunungan", foto: "/images/vegetasi/surya.jpeg", deskripsi: "Pohon tinggi yang mendominasi kawasan hutan montana di sepanjang jalur pendakian Gunung Prau.", ciriCiri: ["Ranting hijau menyerupai jarum", "Batang tegak", "Tajuk tinggi dan rapat"], peran: "Penahan angin, pengikat air tanah alami, serta penyedia habitat fauna pegunungan.", lokasi: "Kawasan Hutan Pos 2 hingga area vegetasi pendek puncak Gunung Prau.", manfaat: "Memberikan naungan sejuk sepanjang jalur trek serta menjaga struktur tanah hutan.", fakta: "Daun cemara gunung berbentuk jarum halus untuk mengurangi penguapan air." },
];

export const VEGETATION_HISTORY_KEY = "campss_vegetation_history";

export type VegetationHistoryItem = {
  slug: string;
  viewedAt: string;
};

export function readVegetationHistory(): VegetationHistoryItem[] {
  if (typeof window === "undefined") return [];

  try {
    const value = window.localStorage.getItem(VEGETATION_HISTORY_KEY);
    return value ? (JSON.parse(value) as VegetationHistoryItem[]) : [];
  } catch {
    return [];
  }
}

export function saveVegetationView(slug: string) {
  const history = readVegetationHistory().filter((item) => item.slug !== slug);
  window.localStorage.setItem(
    VEGETATION_HISTORY_KEY,
    JSON.stringify([{ slug, viewedAt: new Date().toISOString() }, ...history])
  );
}
