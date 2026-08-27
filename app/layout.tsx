import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./campss-addon.css";
// 1. Import komponen Footer (Pastikan file Footer ada di folder components)
import Footer from "@/components/Footer"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CAMPSS - Booking Online Gunung Prau via Campurejo",
  description: "Sistem Informasi Pendakian Gunung Prau via Campurejo",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Konten Halaman */}
        <main className="flex-1">{children}</main>

        {/* 2. Panggil Footer di sini agar tampil di semua halaman */}
        <Footer />
      </body>
    </html>
  );
}