"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@coachme-advisory.com");
  const [password, setPassword] = useState("ChangeMe123!");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    if (!email.trim() || password.length < 6) {
      setError("Enter a valid email and password.");
      setLoading(false);
      return;
    }

    // Local session for CMS UI access.
    localStorage.setItem("coachme-admin-token", "local-session");
    localStorage.setItem("coachme-admin-name", email.split("@")[0] || "Administrator");
    router.push("/dashboard");
    setLoading(false);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 24,
        background:
          "radial-gradient(circle at top left, rgba(201,217,108,0.18), transparent 28%), linear-gradient(160deg, #1c2a25, #35564c)",
      }}
    >
      <form
        onSubmit={onSubmit}
        className="card"
        style={{ width: "min(420px, 100%)", padding: 28, display: "grid", gap: 14 }}
      >
        <div>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 12,
              background: "var(--lime)",
              display: "grid",
              placeItems: "center",
              fontWeight: 800,
              color: "var(--forest)",
              marginBottom: 14,
            }}
          >
            CM
          </div>
          <h1 style={{ margin: 0, fontSize: 28 }}>Welcome back</h1>
          <p style={{ margin: "8px 0 0", color: "var(--muted)" }}>
            Sign in to the CoachME administration panel.
          </p>
        </div>

        <label className="field">
          <span>Email</span>
          <input
            className="input"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="username"
          />
        </label>

        <label className="field">
          <span>Password</span>
          <input
            className="input"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
          />
        </label>

        {error ? <p style={{ color: "var(--danger)", margin: 0 }}>{error}</p> : null}

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
