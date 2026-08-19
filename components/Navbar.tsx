"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const menuItems = [
  {
    label: "Beranda",
    href: "/",
  },
  {
    label: "Jalur",
    href: "/jalur",
  },
  {
    label: "Kuota",
    href: "/cek-kuota",
  },
  {
    label: "Vegetasi",
    href: "/vegetasi",
  },
  {
    label: "Wisata",
    href: "/#wisata",
  },
  {
    label: "Panduan",
    href: "/panduan",
  },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    options?: { close?: boolean }
  ) => {
    if (!href.includes("#")) return;

    const id = href.split("#")[1];

    if (typeof window !== "undefined" && window.location.pathname === "/") {
      e.preventDefault();
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      if (options?.close) closeMenu();
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-100 bg-white/90 px-4 py-3 shadow-[0_8px_30px_rgba(6,61,43,0.08)] backdrop-blur-xl md:px-6">
      <nav className="mx-auto max-w-7xl rounded-full border border-emerald-100 bg-white/80 shadow-sm">

        {/* Navbar Utama */}
        <div className="flex h-16 items-center justify-between px-4 md:px-6">

          {/* Logo */}
          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center gap-3 text-xl font-bold tracking-tight text-emerald-950"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-950 text-sm font-black text-white shadow-lg shadow-emerald-900/20">
              C
            </span>

            <span>CAMPSS</span>
          </Link>

          {/* Menu Desktop */}
          <div className="hidden items-center gap-2 rounded-full bg-emerald-50/80 px-3 py-2 md:flex">

            {menuItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e as any, item.href)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition hover:bg-emerald-950 hover:text-white ${
                  index === 0
                    ? "text-emerald-950"
                    : "text-gray-700"
                }`}
              >
                {item.label}
              </Link>
            ))}

          </div>

          {/* Login Desktop */}
          <div className="hidden md:block">
            <Link
              href="/login"
              className="rounded-full bg-emerald-950 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-900/20 transition hover:-translate-y-0.5 hover:bg-emerald-800"
            >
              Masuk
            </Link>
          </div>

          {/* Mobile Button */}
          <button
            type="button"
            aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-full border border-emerald-100 bg-emerald-50 p-2 text-emerald-950 transition hover:bg-emerald-100 md:hidden"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="border-t border-emerald-100 px-4 pb-4 pt-3 md:hidden">

            <div className="space-y-1 rounded-2xl bg-emerald-50/70 p-2">

              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    handleNavClick(e as any, item.href, { close: true });
                    // if not an in-page anchor, still close menu
                    if (!item.href.includes("#")) closeMenu();
                  }}
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-emerald-950 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}

              {/* Login Mobile */}
              <Link
                href="/login"
                onClick={closeMenu}
                className="mt-2 block rounded-xl bg-emerald-950 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-emerald-800"
              >
                Masuk
              </Link>

            </div>

          </div>
        )}

      </nav>
    </header>
  );
}