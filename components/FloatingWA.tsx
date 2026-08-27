const WA_NUMBER = "6281529715494";
const WA_NAME = "Wahyu";

const defaultPesan = encodeURIComponent(
  `Halo mas ${WA_NAME}, saya ingin bertanya seputar pendakian Gunung Prau via Campurejo. Mohon informasinya.`
);

const waLink = `https://wa.me/${WA_NUMBER}?text=${defaultPesan}`;

export default function FloatingWA() {
  return (
    <div className="campss-addon-wa-float">
      {/* Tooltip */}
      <span className="campss-addon-wa-float__tooltip">
        Chat WhatsApp — Mas {WA_NAME}
      </span>

      {/* Tombol Floating */}
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Hubungi via WhatsApp"
        className="campss-addon-wa-float__btn"
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.031 2C6.486 2 2 6.488 2 12.035c0 1.767.461 3.493 1.336 5.01L2 22l5.121-1.341c1.458.799 3.109 1.22 4.909 1.22 5.545 0 10.031-4.488 10.031-10.035C22.062 6.488 17.576 2 12.031 2zm0 18.151c-1.488 0-2.946-.398-4.225-1.155l-.303-.178-3.136.822.837-3.056-.196-.312C4.161 14.869 3.69 13.473 3.69 12.035c0-4.606 3.748-8.354 8.341-8.354 4.593 0 8.341 3.748 8.341 8.354 0 4.606-3.748 8.354-8.341 8.354zm4.582-6.26c-.251-.126-1.486-.734-1.716-.818-.231-.084-.399-.126-.567.126-.168.252-.647.818-.794.985-.147.168-.294.189-.545.063-1.045-.526-1.854-1.002-2.569-1.936-.184-.241.183-.223.541-.937.084-.168.042-.315-.021-.441-.063-.126-.567-1.366-.777-1.87-.205-.494-.413-.427-.567-.435l-.483-.01c-.168 0-.441.063-.672.315-.231.252-.882.862-.882 2.1 0 1.24.903 2.438 1.029 2.606.126.168 1.777 2.711 4.306 3.803 1.543.666 2.164.717 2.923.606.634-.093 1.486-.607 1.696-1.194.21-.588.21-1.092.147-1.194-.063-.105-.231-.168-.483-.294z" />
        </svg>
      </a>
    </div>
  );
}
