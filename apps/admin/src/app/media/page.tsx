"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { apiFetch } from "@/lib/api";

type MediaRow = {
  id: string;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  url: string;
};

export default function MediaAdminPage() {
  const [rows, setRows] = useState<MediaRow[]>([]);
  const [message, setMessage] = useState("");

  async function refresh() {
    try {
      const data = await apiFetch<MediaRow[]>("/admin/media");
      setRows(data);
    } catch {
      setRows([]);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function onUpload(file: File | null) {
    if (!file) return;
    const token = localStorage.getItem("coachme-admin-token");
    const body = new FormData();
    body.append("file", file);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"}/admin/media/upload`,
      {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body,
      },
    );
    setMessage(response.ok ? "Upload complete." : "Upload failed — check API auth and disk path.");
    await refresh();
  }

  return (
    <div>
      <PageHeader
        title="Media library"
        description="Upload images and documents to local disk storage (not DB BLOBs). Object storage can replace this later."
      />
      <input
        type="file"
        onChange={(event) => onUpload(event.target.files?.[0] || null)}
        style={{ marginBottom: 16 }}
      />
      {message ? <p>{message}</p> : null}
      <div style={{ display: "grid", gap: 8 }}>
        {rows.map((row) => (
          <div
            key={row.id}
            style={{
              background: "#fff",
              border: "1px solid var(--line)",
              borderRadius: 12,
              padding: 12,
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <div>
              <strong>{row.originalName}</strong>
              <div style={{ color: "var(--muted)", fontSize: 13 }}>
                {row.mimeType} · {(row.sizeBytes / 1024).toFixed(1)} KB
              </div>
            </div>
            <code style={{ fontSize: 12 }}>{row.url}</code>
          </div>
        ))}
      </div>
    </div>
  );
}
