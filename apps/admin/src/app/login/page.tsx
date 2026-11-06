"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@coachme-advisory.com");
  const [password, setPassword] = useState("ChangeMe123!");
  const [loading, setLoading] = useState(false);

  function enterDemo() {
    localStorage.setItem("coachme-admin-token", "demo-local-token");
    localStorage.setItem("coachme-admin-mode", "demo");
    router.push("/dashboard");
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    // Temporary: skip API/auth validation so UI can be reviewed offline.
    enterDemo();
    setLoading(false);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "linear-gradient(160deg, #243832, #415f54)",
        padding: 24,
      }}
    >
      <form
        onSubmit={onSubmit}
        style={{
          width: "min(420px, 100%)",
          background: "#fff",
          borderRadius: 18,
          padding: 28,
          display: "grid",
          gap: 14,
        }}
      >
        <h1 style={{ margin: 0 }}>CoachME Admin</h1>
        <p style={{ margin: 0, color: "#66726c" }}>
          Demo login enabled — API validation is skipped for local UI review.
        </p>
        <label style={{ display: "grid", gap: 6 }}>
          Email
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            style={{ padding: 12, borderRadius: 10, border: "1px solid #d9e0dc" }}
          />
        </label>
        <label style={{ display: "grid", gap: 6 }}>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            style={{ padding: 12, borderRadius: 10, border: "1px solid #d9e0dc" }}
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: 12,
            borderRadius: 999,
            border: 0,
            background: "#2f4f45",
            color: "#fff",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          {loading ? "Signing in…" : "Enter admin (no API check)"}
        </button>
        <button
          type="button"
          onClick={enterDemo}
          style={{
            padding: 12,
            borderRadius: 999,
            border: "1px solid #d9e0dc",
            background: "#fff",
            color: "#2f4f45",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Skip login
        </button>
      </form>
    </div>
  );
}
