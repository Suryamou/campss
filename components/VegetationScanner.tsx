"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Html5Qrcode } from "html5-qrcode";
import { dataVegetasi, saveVegetationView } from "@/lib/vegetasi";

type ScannerState = "IDLE" | "REQUESTING_CAMERA" | "SCANNING" | "SUCCESS" | "REDIRECT" | "SCAN_ERROR";

type VegetationQrPayload = {
  type?: string;
  slug?: string;
};

export default function VegetationScanner() {
  const router = useRouter();
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [state, setState] = useState<ScannerState>("IDLE");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    return () => {
      void stopScanner();
    };
  }, []);

  async function startScanner() {
    setOpen(true);
    setMessage("");
    setState("REQUESTING_CAMERA");

    try {
      const { Html5Qrcode } = await import("html5-qrcode");
      const scanner = new Html5Qrcode("vegetation-qr-reader");
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 240, height: 240 } },
        (decodedText: string) => handleScan(decodedText),
        () => undefined
      );

      setState("SCANNING");
    } catch {
      scannerRef.current = null;
      setState("SCAN_ERROR");
      setMessage("Kamera tidak dapat digunakan. Pastikan izin kamera telah diberikan.");
    }
  }

  async function stopScanner() {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
      } catch {
        // Scanner may already be stopped when the component unmounts.
      }
      scannerRef.current = null;
    }
  }

  function getVegetationSlug(decodedText: string) {
    try {
      const payload = JSON.parse(decodedText) as VegetationQrPayload;
      if (payload.type !== "VEGETATION_EDUCATION" || !payload.slug) return null;
      return payload.slug;
    } catch {
      try {
        const url = new URL(decodedText, window.location.origin);
        const match = url.pathname.match(/^\/vegetasi\/([^/]+)\/?$/);
        return match?.[1] || null;
      } catch {
        return null;
      }
    }
  }

  function handleScan(decodedText: string) {
    const slug = getVegetationSlug(decodedText);
    const vegetation = slug ? dataVegetasi.find((item) => item.slug === slug) : null;

    if (!vegetation) {
      setState("SCAN_ERROR");
      setMessage("QR ini bukan QR edukasi vegetasi CAMPSS.");
      void stopScanner();
      return;
    }

    saveVegetationView(vegetation.slug);
    setState("SUCCESS");
    setMessage(`QR berhasil dibaca: ${vegetation.nama}`);
    void stopScanner().then(() => {
      setState("REDIRECT");
      router.push(`/vegetasi/${vegetation.slug}`);
    });
  }

  function closeScanner() {
    void stopScanner();
    setOpen(false);
    setState("IDLE");
    setMessage("");
  }

  return (
    <div className="mt-8 rounded-xl border border-[#cfe6dc] bg-[#e9f7f1] p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-semibold text-[#063d2b]">QR Edukasi Vegetasi</h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
            Scan QR pada papan informasi di sepanjang jalur untuk membuka detail vegetasi. QR ini tidak digunakan untuk tiket atau check-in.
          </p>
        </div>
        <button
          type="button"
          onClick={open ? closeScanner : startScanner}
          className="w-full rounded-lg bg-[#063d2b] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#052f22] md:w-auto"
        >
          {open ? "Tutup Scanner" : "Scan QR Vegetasi"}
        </button>
      </div>

      {open && (
        <div className="mt-5 overflow-hidden rounded-xl border border-[#b9dece] bg-white p-4">
          <div id="vegetation-qr-reader" className="mx-auto max-w-md" />
          <p className={`mt-3 text-center text-xs font-medium ${state === "SCAN_ERROR" ? "text-red-700" : "text-gray-600"}`}>
            {state === "REQUESTING_CAMERA" && "Meminta izin kamera..."}
            {state === "SCANNING" && "Arahkan kamera ke QR vegetasi."}
            {state === "SUCCESS" && message}
            {state === "REDIRECT" && "Membuka informasi vegetasi..."}
            {state === "SCAN_ERROR" && message}
          </p>
        </div>
      )}
    </div>
  );
}
