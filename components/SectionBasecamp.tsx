export default function SectionBasecamp() {
  return (
    <section className="campss-addon-section campss-addon-location">
      <div className="campss-addon-location__inner">

        {/* Header */}
        <div className="campss-addon-location__header">
          <p className="campss-addon-location__label">Lokasi Basecamp</p>
          <h2 className="campss-addon-location__title">
            Basecamp Pendakian via Campurejo
          </h2>
          <p className="campss-addon-location__desc">
            Titik awal pendakian Gunung Prau melalui jalur Campurejo.
            Pastikan kamu tiba tepat waktu sesuai jadwal keberangkatan.
          </p>
        </div>

        {/* Grid: Map + Info */}
        <div className="campss-addon-location__grid">

          {/* Google Maps Embed */}
          <div className="campss-addon-location__map-card">
            <iframe
              title="Lokasi Basecamp Campurejo"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.123456789!2d110.0!3d-7.35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMjEnMDAuMCJTIDExMMKwMDAnMDAuMCJF!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Info Card */}
          <div className="campss-addon-location__info-card">

            <div className="campss-addon-location__info-row">
              <div className="campss-addon-location__info-icon">
                <svg fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="campss-addon-location__info-text">
                <h4>Alamat</h4>
                <p>Campurejo, Kec. Tretep, Kab. Temanggung, Jawa Tengah</p>
              </div>
            </div>

            <div className="campss-addon-location__info-row">
              <div className="campss-addon-location__info-icon">
                <svg fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div className="campss-addon-location__info-text">
                <h4>Jam Operasional</h4>
                <p>Setiap hari, 06.00 — 21.00 WIB</p>
              </div>
            </div>

            <div className="campss-addon-location__info-row">
              <div className="campss-addon-location__info-icon">
                <svg fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div className="campss-addon-location__info-text">
                <h4>Kontak</h4>
                <p>+62 856 4265 0858</p>
              </div>
            </div>

            {/* Badge Alamat */}
            <div className="campss-addon-location__badge">
              <svg fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
              <span>Campurejo, Tretep, Temanggung — Jawa Tengah</span>
            </div>

            {/* Tombol Buka di Google Maps */}
            <a
              href="https://www.google.com/maps/search/Basecamp+Pendakian+via+Campurejo+Temanggung"
              target="_blank"
              rel="noopener noreferrer"
              className="campss-addon-btn campss-addon-btn--primary campss-addon-btn--full"
            >
              <svg fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Buka di Google Maps
            </a>

          </div>
        </div>
      </div>
    </section>
  );
}
