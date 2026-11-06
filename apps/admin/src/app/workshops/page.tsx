"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { apiFetch } from "@/lib/api";
import { demoWorkshops } from "@/lib/demo-data";

type WorkshopRow = {
  slug: string;
  title: string;
  language?: string;
  price?: number;
  currency?: string;
  maxParticipants?: number;
};

export default function WorkshopsAdminPage() {
  const [rows, setRows] = useState<WorkshopRow[]>(demoWorkshops);

  useEffect(() => {
    apiFetch<WorkshopRow[]>("/workshops", { auth: false })
      .then(setRows)
      .catch(() => setRows(demoWorkshops));
  }, []);

  return (
    <div>
      <PageHeader title="Workshops" description="Demo data shown when API is offline." />
      <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff" }}>
        <thead>
          <tr>
            {["Title", "Language", "Price", "Capacity"].map((heading) => (
              <th
                key={heading}
                style={{ textAlign: "left", padding: 12, borderBottom: "1px solid var(--line)" }}
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.slug}>
              <td style={{ padding: 12, borderBottom: "1px solid var(--line)" }}>{row.title}</td>
              <td style={{ padding: 12, borderBottom: "1px solid var(--line)" }}>
                {row.language || "—"}
              </td>
              <td style={{ padding: 12, borderBottom: "1px solid var(--line)" }}>
                {row.price != null ? `${row.price} ${row.currency || ""}` : "—"}
              </td>
              <td style={{ padding: 12, borderBottom: "1px solid var(--line)" }}>
                {row.maxParticipants ?? "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
