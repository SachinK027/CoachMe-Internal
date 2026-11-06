"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { apiFetch } from "@/lib/api";

type EnquiryRow = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  status: string;
};

export default function EnquiriesAdminPage() {
  const [rows, setRows] = useState<EnquiryRow[]>([]);

  useEffect(() => {
    apiFetch<EnquiryRow[]>("/admin/enquiries").then(setRows).catch(() => setRows([]));
  }, []);

  return (
    <div>
      <PageHeader title="Enquiries" description="Contact form submissions and status tracking." />
      <div style={{ display: "grid", gap: 10 }}>
        {rows.length === 0 ? (
          <p style={{ color: "var(--muted)" }}>No enquiries yet.</p>
        ) : (
          rows.map((row) => (
            <article
              key={row.id}
              style={{
                background: "#fff",
                border: "1px solid var(--line)",
                borderRadius: 14,
                padding: 16,
              }}
            >
              <strong>
                {row.firstName} {row.lastName}
              </strong>
              <div style={{ color: "var(--muted)" }}>{row.email}</div>
              <p style={{ marginTop: 8 }}>{row.message}</p>
              <span
                style={{
                  display: "inline-block",
                  marginTop: 8,
                  padding: "4px 10px",
                  borderRadius: 999,
                  background: "var(--accent-soft)",
                  fontSize: 12,
                }}
              >
                {row.status}
              </span>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
