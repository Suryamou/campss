const WA_NUMBER = "6281529715494";
const WA_NAME = "Wahyu";

type TitikJemput = {
  nama: string;
  sub: string;
  mapsQuery: string;
};

const titikJemput: TitikJemput[] = [
  {
    nama: "Terminal Candiroto",
    sub: "Kab. Temanggung",
    mapsQuery: "Terminal+Candiroto+Temanggung",
  },
  {
    nama: "Terminal Ngadirejo",
    sub: "Kab. Temanggung",
    mapsQuery: "Terminal+Ngadirejo+Temanggung",
  },
  {
    nama: "Pasar / Terminal Parakan",
    sub: "Kab. Temanggung",
    mapsQuery: "Pasar+Parakan+Temanggung",
  },
  {
    nama: "Terminal Mendolo",
    sub: "Kab. Wonosobo",
    mapsQuery: "Terminal+Mendolo+Wonosobo",
  },
];

function buildWaNama(titik: string): string {
  const pesan = encodeURIComponent(
    `Halo mas ${WA_NAME}, saya ingin pesan penjemputan dari ${titik} menuju Basecamp Campurejo. Mohon info jadwal dan harganya. Terima kasih.`
  );
  return `https://wa.me/${WA_NUMBER}?text=${pesan}`;
}

function buildMapsRute(query: string): string {
  return `https://www.google.com/maps/search/${query}`;
}

export default function SectionPickup() {
  return (
    <section className="campss-addon-section campss-addon-pickup">
      <div className="campss-addon-pickup__inner">

        {/* Header */}
        <div className="campss-addon-pickup__header">
          <p className="campss-addon-pickup__label">Titik Penjemputan</p>
          <h2 className="campss-addon-pickup__title">
            Shuttle & Pick-up Pendaki
          </h2>
          <p className="campss-addon-pickup__desc">
            Kami menyediakan layanan penjemputan dari beberapa titik
            terminal untuk mempermudah perjalananmu menuju basecamp.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="campss-addon-pickup__grid">
          {titikJemput.map((titik, idx) => (
            <div key={titik.nama} className="campss-addon-pickup__card">

              <div className="campss-addon-pickup__card-number">
                {idx + 1}
              </div>

              <div className="campss-addon-pickup__card-icon">
                <svg fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="1" y="3" width="15" height="13" rx="2" ry="2" />
                  <path d="M16 8h4l3 3v5a2 2 0 0 1-2 2h-1" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              </div>

              <p className="campss-addon-pickup__card-name">{titik.nama}</p>
              <p className="campss-addon-pickup__card-sub">{titik.sub}</p>

              <div className="campss-addon-pickup__card-actions">
                <a
                  href={buildMapsRute(titik.mapsQuery)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="campss-addon-btn campss-addon-btn--maps campss-addon-btn--full"
                >
                  <svg fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" style={{width: "0.875rem", height: "0.875rem"}}>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Rute Maps
                </a>

                <a
                  href={buildWaNama(titik.nama)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="campss-addon-btn campss-addon-btn--wa campss-addon-btn--full"
                >
                  <svg fill="currentColor" viewBox="0 0 24 24" style={{width: "0.875rem", height: "0.875rem"}}>
                    <path d="M12.031 2C6.486 2 2 6.488 2 12.035c0 1.767.461 3.493 1.336 5.01L2 22l5.121-1.341c1.458.799 3.109 1.22 4.909 1.22 5.545 0 10.031-4.488 10.031-10.035C22.062 6.488 17.576 2 12.031 2zm0 18.151c-1.488 0-2.946-.398-4.225-1.155l-.303-.178-3.136.822.837-3.056-.196-.312C4.161 14.869 3.69 13.473 3.69 12.035c0-4.606 3.748-8.354 8.341-8.354 4.593 0 8.341 3.748 8.341 8.354 0 4.606-3.748 8.354-8.341 8.354zm4.582-6.26c-.251-.126-1.486-.734-1.716-.818-.231-.084-.399-.126-.567.126-.168.252-.647.818-.794.985-.147.168-.294.189-.545.063-1.045-.526-1.854-1.002-2.569-1.936-.184-.241.183-.223.541-.937.084-.168.042-.315-.021-.441-.063-.126-.567-1.366-.777-1.87-.205-.494-.413-.427-.567-.435l-.483-.01c-.168 0-.441.063-.672.315-.231.252-.882.862-.882 2.1 0 1.24.903 2.438 1.029 2.606.126.168 1.777 2.711 4.306 3.803 1.543.666 2.164.717 2.923.606.634-.093 1.486-.607 1.696-1.194.21-.588.21-1.092.147-1.194-.063-.105-.231-.168-.483-.294z" />
                  </svg>
                  Pesan Jemputan
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
