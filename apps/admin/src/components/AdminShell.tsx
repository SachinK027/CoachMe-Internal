"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: "▣" },
  { href: "/workshops", label: "Workshops", icon: "▤" },
  { href: "/bookings", label: "Bookings", icon: "☑" },
  { href: "/blog", label: "Blog", icon: "✎" },
  { href: "/services", label: "Services", icon: "◇" },
  { href: "/enquiries", label: "Enquiries", icon: "✉" },
  { href: "/media", label: "Media", icon: "▣" },
  { href: "/settings", label: "Settings", icon: "⚙" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [userName, setUserName] = useState("Administrator");

  useEffect(() => {
    const token = localStorage.getItem("coachme-admin-token");
    if (!token && pathname !== "/login") {
      router.replace("/login");
      return;
    }
    setUserName(localStorage.getItem("coachme-admin-name") || "Administrator");
    setReady(true);
  }, [pathname, router]);

  if (pathname === "/login") return <>{children}</>;
  if (!ready) {
    return (
      <div style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
        Loading workspace…
      </div>
    );
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <div className="admin-brand-mark">CM</div>
          <div>
            <strong>CoachME</strong>
            <span>Administration</span>
          </div>
        </div>

        <nav className="admin-nav" aria-label="Admin">
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link key={link.href} href={link.href} className={active ? "active" : undefined}>
                <span className="icon">{link.icon}</span>
                <span className="label">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="btn btn-secondary"
          style={{
            marginTop: "auto",
            width: "100%",
            background: "transparent",
            color: "#f4f1ea",
            borderColor: "#5f7a70",
          }}
          onClick={() => {
            localStorage.removeItem("coachme-admin-token");
            localStorage.removeItem("coachme-admin-name");
            localStorage.removeItem("coachme-admin-mode");
            router.push("/login");
          }}
        >
          <span className="logout-label">Sign out</span>
        </button>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <div>
            <strong style={{ display: "block" }}>CoachME Advisory CMS</strong>
            <span style={{ color: "var(--muted)", fontSize: 13 }}>
              Manage workshops, bookings and content
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span className="badge badge-neutral">{userName}</span>
          </div>
        </header>
        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}
