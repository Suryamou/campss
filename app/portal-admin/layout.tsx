"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const menus = [
  {
    title: "MENU UTAMA",
    items: [
      {
        label: "Dashboard",
        href: "/portal-admin",
        icon: "◉",
      },
      {
        label: "Verifikasi Pembayaran",
        href: "/portal-admin/verifikasi",
        icon: "◇",
        badge: 5,
      },
      {
        label: "Pemindai E-Tiket",
        href: "/portal-admin/pemindai",
        icon: "⌗",
      },
      {
        label: "Pemantauan Pendaki",
        href: "/portal-admin/pemantauan",
        icon: "◈",
      },
    ],
  },
  {
    title: "PENGELOLAAN",
    items: [
      {
        label: "Kelola Kuota",
        href: "/portal-admin/kuota",
        icon: "▤",
      },
      {
        label: "Kelola Vegetasi",
        href: "/portal-admin/vegetasi",
        icon: "🌿",
      },
    ],
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [adminName, setAdminName] = useState("Admin Basecamp");
  const [adminInitial, setAdminInitial] = useState("A");

  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // Jika halaman saat ini adalah halaman login, tidak perlu cek token
    if (pathname === "/portal-admin/login") return;

    const token = localStorage.getItem("campss_admin_token");
    if (!token) {
      router.push("/portal-admin/login");
      return;
    }

    const userStr = localStorage.getItem("campss_admin_user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.name) {
          setAdminName(user.name);
          setAdminInitial(user.name.charAt(0).toUpperCase());
        }
      } catch (e) {}
    }
  }, [pathname, router]);

  // Tutup drawer saat berpindah halaman
  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname]);

  // Kunci scroll body saat drawer mobile terbuka
  useEffect(() => {
    if (mobileNavOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileNavOpen]);

  function handleLogout() {
    localStorage.removeItem("campss_admin_token");
    localStorage.removeItem("campss_admin_user");
    router.push("/portal-admin/login");
  }

  if (pathname === "/portal-admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#f8fcfa_0%,_#f1f7f3_55%,_#ebf3ee_100%)]">

      <div className="flex min-h-screen">

        {/* SIDEBAR (DESKTOP) */}
        <aside className="fixed inset-y-0 left-0 z-40 hidden w-[270px] border-r border-white/10 bg-[linear-gradient(145deg,_#073d2b_0%,_#0b4b39_55%,_#0d5d46_100%)] text-white shadow-[12px_0_45px_rgba(4,35,28,0.18)] lg:flex lg:flex-col">
          <SidebarContent
            adminName={adminName}
            adminInitial={adminInitial}
            onLogout={handleLogout}
          />
        </aside>

        {/* MOBILE DRAWER */}
        {mobileNavOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* OVERLAY */}
            <div
              className="absolute inset-0 bg-[#03241a]/60 backdrop-blur-sm"
              onClick={() => setMobileNavOpen(false)}
            />
            {/* DRAWER */}
            <aside className="absolute inset-y-0 left-0 flex w-[280px] flex-col overflow-y-auto bg-[linear-gradient(145deg,_#073d2b_0%,_#0b4b39_55%,_#0d5d46_100%)] text-white shadow-[12px_0_45px_rgba(4,35,28,0.4)]">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <Link href="/portal-admin" className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/95 text-base font-black text-[#073d2b]">
                    C
                  </div>
                  <div>
                    <p className="text-base font-bold tracking-tight">CAMPSS</p>
                    <p className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.2em] text-emerald-100/80">
                      Panel Administrator
                    </p>
                  </div>
                </Link>
                <button
                  onClick={() => setMobileNavOpen(false)}
                  aria-label="Tutup menu"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-lg text-white"
                >
                  ×
                </button>
              </div>
              <SidebarContent
                adminName={adminName}
                adminInitial={adminInitial}
                onLogout={handleLogout}
              />
            </aside>
          </div>
        )}

        {/* CONTENT */}
        <div className="min-w-0 flex-1 lg:pl-[260px]">

          {/* HEADER */}
          <header className="sticky top-0 z-30 px-2 py-3 md:px-5">

            <div className="flex min-h-[64px] items-center justify-between gap-3 rounded-[24px] border border-[#dfe9e4] bg-white/90 px-4 shadow-[0_12px_35px_rgba(6,61,43,0.08)] backdrop-blur md:min-h-[76px] md:px-7">

              {/* HAMBURGER (MOBILE) */}
              <button
                onClick={() => setMobileNavOpen(true)}
                aria-label="Buka menu"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-gray-100 bg-[#f6fbf8] text-lg text-[#17634a] lg:hidden"
              >
                ☰
              </button>

              <div className="min-w-0">
                <p className="truncate text-[11px] font-semibold uppercase tracking-[0.2em] text-[#17634a] md:tracking-[0.24em]">
                  Dashboard Utama
                </p>
                <p className="mt-0.5 truncate text-sm font-semibold text-[#073d2b]">
                  Selamat datang, {adminName}
                </p>
              </div>

              <div className="flex items-center gap-2 md:gap-3">

                {/* OPERATIONAL STATUS */}
                <div className="hidden items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-2 sm:flex">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-xs font-semibold text-emerald-700">
                    Operasional
                  </span>
                </div>

                {/* NOTIFICATION */}
                <button className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-gray-100 bg-[#f6fbf8] text-lg text-[#17634a] transition hover:-translate-y-0.5 hover:bg-[#edf7f2]">
                  🔔
                  <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-red-500" />
                </button>

                {/* PROFILE */}
                <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-[#f9fcfa] px-2 py-2">
                  <div className="hidden text-right md:block">
                    <p className="text-xs font-bold text-[#073d2b]">
                      {adminName}
                    </p>
                    <p className="text-[10px] text-gray-500">
                      Campurejo
                    </p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e7f3ed] text-sm font-bold text-[#17634a]">
                    {adminInitial}
                  </div>
                </div>

              </div>

            </div>

          </header>

          {/* PAGE */}
          <main className="pb-24 lg:pb-8">{children}</main>

          {/* BOTTOM NAV (MOBILE) */}
          <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-[#dfe9e4] bg-white/95 backdrop-blur lg:hidden">
            <div className="grid grid-cols-4">
              {[
                { label: "Dashboard", href: "/portal-admin", icon: "◉" },
                { label: "Verifikasi", href: "/portal-admin/verifikasi", icon: "◇" },
                { label: "Pemindai", href: "/portal-admin/pemindai", icon: "⌗" },
                { label: "Pemantauan", href: "/portal-admin/pemantauan", icon: "◈" },
              ].map((item) => {
                const active =
                  pathname === item.href ||
                  (item.href !== "/portal-admin" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex flex-col items-center gap-1 py-3 text-[10px] font-semibold transition ${
                      active
                        ? "text-[#073d2b]"
                        : "text-gray-400 hover:text-[#17634a]"
                    }`}
                  >
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-xl text-base ${
                        active ? "bg-[#e7f3ed] text-[#073d2b]" : "text-gray-400"
                      }`}
                    >
                      {item.icon}
                    </span>
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>

        </div>

      </div>

    </div>
  );
}

function SidebarContent({
  adminName,
  adminInitial,
  onLogout,
}: {
  adminName: string;
  adminInitial: string;
  onLogout: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {/* NAVIGATION */}
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        {menus.map((section) => (
          <div key={section.title} className="mb-8">
            <p className="px-3 text-[10px] font-bold tracking-[0.2em] text-emerald-100/70">
              {section.title}
            </p>
            <div className="mt-3 space-y-1">
              {section.items.map((item) => {
                const active =
                  pathname === item.href ||
                  (item.href !== "/portal-admin" &&
                    pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group flex items-center gap-3 rounded-2xl px-3.5 py-3 text-sm transition-all duration-200 ${
                      active
                        ? "bg-white font-semibold text-[#073d2b] shadow-[0_10px_25px_rgba(255,255,255,0.18)]"
                        : "text-emerald-50/90 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-xl text-base ${
                        active ? "bg-[#e6f3ed]" : "bg-white/10"
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          active
                            ? "bg-[#073d2b] text-white"
                            : "bg-amber-400 text-[#073d2b]"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* ADMIN PROFILE */}
      <div className="border-t border-white/10 p-4">
        <div className="mb-3 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-3 shadow-inner shadow-black/10">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-bold text-[#073d2b]">
            {adminInitial}
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold">{adminName}</p>
            <p className="truncate text-[10px] text-emerald-100/70">
              Administrator
            </p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm text-emerald-50/90 transition hover:bg-white/10 hover:text-white"
        >
          <span>↵</span>
          Keluar
        </button>
      </div>
    </>
  );
}
