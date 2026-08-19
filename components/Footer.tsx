import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-white font-sans mt-16">
      
      {/* 1. BANNER PANDUAN BOOKING */}
      <div className="border-y border-[#dcece5] bg-[#f2f8f5]">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5 text-center md:text-left">
            <div className="hidden sm:flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#063d2b] text-white text-2xl shadow-md">
              📋
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-[#063d2b]">
                Panduan Booking Pendakian
              </h3>
              <p className="text-sm text-emerald-800/80 mt-1">
                Lihat tata cara dan alur pendaftaran pendakian Gunung Prau via Campurejo selengkapnya.
              </p>
            </div>
          </div>

          <Link
            href="/panduan"
            className="shrink-0 px-6 py-3 rounded-xl bg-[#063d2b] hover:bg-[#17634a] text-white text-sm font-semibold transition-all shadow-md shadow-emerald-900/10 hover:shadow-lg"
          >
            Lihat Panduan
          </Link>
        </div>
      </div>

      {/* 2. FOOTER UTAMA */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          
          {/* BRAND */}
          <div className="lg:pr-6">
            <Link href="/" className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#063d2b] text-lg font-black text-white shadow-md">
                C
              </span>
              <span className="text-2xl font-black text-[#063d2b] tracking-wide">
                CAMPSS
              </span>
            </Link>
            <p className="mt-6 text-sm leading-relaxed text-gray-600">
              Sistem informasi resmi pendakian Gunung Prau via Campurejo.
            </p>
          </div>

          {/* INFORMASI */}
          <div className="lg:ml-12">
            <h4 className="text-base font-bold text-[#063d2b] uppercase tracking-wider mb-6">
              Informasi
            </h4>
            <ul className="flex flex-col gap-4 text-sm text-gray-600">
              <li><Link href="/jalur" className="hover:text-[#17634a] transition-colors">Jalur Pendakian</Link></li>
              <li><Link href="/cek-kuota" className="hover:text-[#17634a] transition-colors">Cek Kuota Pendakian</Link></li>
              <li><Link href="/vegetasi" className="hover:text-[#17634a] transition-colors">Info Vegetasi & Flora</Link></li>
              <li><Link href="/panduan" className="hover:text-[#17634a] transition-colors">Panduan & SOP</Link></li>
            </ul>
          </div>

          {/* LINK TERKAIT */}
          <div className="lg:ml-6">
            <h4 className="text-base font-bold text-[#063d2b] uppercase tracking-wider mb-6">
              Link Terkait
            </h4>
            <ul className="flex flex-col gap-4 text-sm text-gray-600">
              <li><Link href="/pemesanan" className="hover:text-[#17634a] transition-colors">Pemesanan Tiket</Link></li>
              <li><Link href="/e-tiket" className="hover:text-[#17634a] transition-colors">Cek E-Tiket</Link></li>
            </ul>
          </div>

          {/* KONTAK & SOSMED */}
          <div>
            <h4 className="text-base font-bold text-[#063d2b] uppercase tracking-wider mb-6">
              Kontak Kami
            </h4>
            <ul className="flex flex-col gap-4 text-sm text-gray-600 mb-6">
              
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-0.5 text-[#063d2b] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="leading-relaxed">Basecamp Pendakian Gunung Prau via Campurejo</span>
              </li>
              
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-0.5 text-[#063d2b] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.031 2C6.486 2 2 6.488 2 12.035c0 1.767.461 3.493 1.336 5.01L2 22l5.121-1.341c1.458.799 3.109 1.22 4.909 1.22 5.545 0 10.031-4.488 10.031-10.035C22.062 6.488 17.576 2 12.031 2zm0 18.151c-1.488 0-2.946-.398-4.225-1.155l-.303-.178-3.136.822.837-3.056-.196-.312C4.161 14.869 3.69 13.473 3.69 12.035c0-4.606 3.748-8.354 8.341-8.354 4.593 0 8.341 3.748 8.341 8.354 0 4.606-3.748 8.354-8.341 8.354zm4.582-6.26c-.251-.126-1.486-.734-1.716-.818-.231-.084-.399-.126-.567.126-.168.252-.647.818-.794.985-.147.168-.294.189-.545.063-1.045-.526-1.854-1.002-2.569-1.936-.184-.241.183-.223.541-.937.084-.168.042-.315-.021-.441-.063-.126-.567-1.366-.777-1.87-.205-.494-.413-.427-.567-.435l-.483-.01c-.168 0-.441.063-.672.315-.231.252-.882.862-.882 2.1 0 1.24.903 2.438 1.029 2.606.126.168 1.777 2.711 4.306 3.803 1.543.666 2.164.717 2.923.606.634-.093 1.486-.607 1.696-1.194.21-.588.21-1.092.147-1.194-.063-.105-.231-.168-.483-.294z" />
                </svg>
                <span>+62 811-0000-0000</span>
              </li>

        
            </ul>

            {/* Instagram */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Instagram CAMPSS"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#dcece5] bg-[#f8fcfa] text-[#063d2b] transition-all hover:bg-[#063d2b] hover:text-white"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* 3. BAR COPYRIGHT */}
      <div className="bg-[#063d2b] px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-xs text-emerald-100/80 gap-2">
          <p>© 2026 CAMPSS • Basecamp Gunung Prau via Campurejo</p>
        </div>
      </div>

    </footer>
  );
}