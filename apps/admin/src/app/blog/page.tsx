"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { apiFetch } from "@/lib/api";
import { demoPosts } from "@/lib/demo-data";

type PostRow = {
  slug: string;
  title: string;
  author?: string;
  authorName?: string;
};

export default function BlogAdminPage() {
  const [rows, setRows] = useState<PostRow[]>(demoPosts);

  useEffect(() => {
    apiFetch<PostRow[]>("/blogs", { auth: false })
      .then(setRows)
      .catch(() => setRows(demoPosts));
  }, []);

  return (
    <div>
      <PageHeader title="Blog" description="Demo data shown when API is offline." />
      <div style={{ display: "grid", gap: 10 }}>
        {rows.map((row) => (
          <div
            key={row.slug}
            style={{
              background: "#fff",
              border: "1px solid var(--line)",
              borderRadius: 14,
              padding: 16,
            }}
          >
            <strong>{row.title}</strong>
            <div style={{ color: "var(--muted)", marginTop: 4 }}>
              {row.author || row.authorName || "Mirjana Radenović Ratković"} · {row.slug}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
