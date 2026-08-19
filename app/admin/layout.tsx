"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menus = [
  {
    title: "MENU UTAMA",
    items: [
      {
        label: "Dashboard",
        href: "/admin",
        icon: "▦",
      },
      {
        label: "Verifikasi Pembayaran",
        href: "/admin/verifikasi",
        icon: "▣",
        badge: 5,
      },
      {
        label: "Pemindai E-Tiket",
        href: "/admin/pemindai",
        icon: "⌗",
      },
      {
        label: "Pemantauan Pendaki",
        href: "/admin/pemantauan",
        icon: "◉",
      },
    ],
  },
  {
    title: "PENGELOLAAN",
    items: [
      {
        label: "Kelola Kuota",
        href: "/admin/kuota",
        icon: "▤",
      },
      {
        label: "Kelola Vegetasi",
        href: "/admin/vegetasi",
        icon: "♧",
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

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#f8fcfa_0%,_#f1f7f3_55%,_#ebf3ee_100%)]">

      <div className="flex min-h-screen">

        {/* SIDEBAR */}
        <aside className="fixed inset-y-0 left-0 z-40 hidden w-[270px] border-r border-white/10 bg-[linear-gradient(145deg,_#073d2b_0%,_#0b4b39_55%,_#0d5d46_100%)] text-white shadow-[12px_0_45px_rgba(4,35,28,0.18)] lg:flex lg:flex-col">

          {/* BRAND */}
          <div className="border-b border-white/10 px-6 py-6">

            <Link href="/admin" className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/95 text-lg font-black text-[#073d2b] shadow-lg shadow-black/10">
                C
              </div>

              <div>
                <p className="text-lg font-bold tracking-tight">
                  CAMPSS
                </p>

                <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.2em] text-emerald-100/80">
                  Panel Administrator
                </p>
              </div>

            </Link>

          </div>

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
                      (item.href !== "/admin" &&
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
                            active
                              ? "bg-[#e6f3ed]"
                              : "bg-white/10"
                          }`}
                        >
                          {item.icon}
                        </span>

                        <span className="flex-1">
                          {item.label}
                        </span>

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
                A
              </div>

              <div className="min-w-0">
                <p className="truncate text-xs font-semibold">
                  Admin Basecamp
                </p>

                <p className="truncate text-[10px] text-emerald-100/70">
                  Administrator
                </p>
              </div>

            </div>

            <Link
              href="/admin/login"
              className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm text-emerald-50/90 transition hover:bg-white/10 hover:text-white"
            >
              <span>↪</span>
              Keluar
            </Link>

          </div>

        </aside>

        {/* CONTENT */}
        <div className="min-w-0 flex-1 lg:pl-[260px]">

          {/* HEADER */}
          <header className="sticky top-0 z-30 px-3 py-3 md:px-5">

            <div className="flex min-h-[76px] items-center justify-between rounded-[24px] border border-[#dfe9e4] bg-white/90 px-5 shadow-[0_12px_35px_rgba(6,61,43,0.08)] backdrop-blur md:px-7">

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#17634a]">
                  Dashboard Utama
                </p>
                <p className="mt-1 text-sm font-semibold text-[#073d2b]">
                  Selamat datang, Admin Basecamp
                </p>
              </div>

              <div className="flex items-center gap-3">

                {/* OPERATIONAL STATUS */}
                <div className="hidden items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-2 sm:flex">

                  <span className="h-2 w-2 rounded-full bg-emerald-500" />

                  <span className="text-xs font-semibold text-emerald-700">
                    Operasional
                  </span>

                </div>

                {/* NOTIFICATION */}
                <button className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-gray-100 bg-[#f6fbf8] text-lg text-[#17634a] transition hover:-translate-y-0.5 hover:bg-[#edf7f2]">
                  ♢

                  <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-red-500" />
                </button>

                {/* PROFILE */}
                <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-[#f9fcfa] px-2 py-2">

                  <div className="hidden text-right md:block">
                    <p className="text-xs font-bold text-[#073d2b]">
                      Admin Basecamp
                    </p>

                    <p className="text-[10px] text-gray-500">
                      Campurejo
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e7f3ed] text-sm font-bold text-[#17634a]">
                    A
                  </div>

                </div>

              </div>

            </div>

          </header>

          {/* PAGE */}
          <main>{children}</main>

        </div>

      </div>

    </div>
  );
}