"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/pages", label: "Pages" },
  { href: "/services", label: "Services" },
  { href: "/workshops", label: "Workshops" },
  { href: "/blog", label: "Blog" },
  { href: "/bookings", label: "Bookings" },
  { href: "/enquiries", label: "Enquiries" },
  { href: "/media", label: "Media" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/settings", label: "Settings" },
  { href: "/audit", label: "Audit logs" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("coachme-admin-token");
    if (!token && pathname !== "/login") {
      router.replace("/login");
      return;
    }
    setReady(true);
  }, [pathname, router]);

  if (pathname === "/login") return <>{children}</>;
  if (!ready) return <div style={{ padding: 40 }}>Loading…</div>;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", minHeight: "100vh" }}>
      <aside
        style={{
          background: "#243832",
          color: "#f4f1ea",
          padding: "24px 16px",
        }}
      >
        <div style={{ fontWeight: 700, marginBottom: 24 }}>CoachME Admin</div>
        <nav style={{ display: "grid", gap: 6 }}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: "10px 12px",
                borderRadius: 10,
                background: pathname.startsWith(link.href) ? "#35564c" : "transparent",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => {
            localStorage.removeItem("coachme-admin-token");
            localStorage.removeItem("coachme-admin-mode");
            router.push("/login");
          }}
          style={{
            marginTop: 24,
            width: "100%",
            border: "1px solid #5f7a70",
            background: "transparent",
            color: "#f4f1ea",
            borderRadius: 10,
            padding: "10px 12px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </aside>
      <div>
        <header
          style={{
            height: 64,
            borderBottom: "1px solid var(--line)",
            background: "var(--panel)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
          }}
        >
          <strong>Content & bookings CMS</strong>
          <span style={{ color: "var(--muted)", fontSize: 14 }}>
            Demo mode · API optional
          </span>
        </header>
        <main style={{ padding: 24 }}>{children}</main>
      </div>
    </div>
  );
}
