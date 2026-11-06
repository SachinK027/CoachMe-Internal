"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { apiFetch } from "@/lib/api";
import { demoServices } from "@/lib/demo-data";

type ServiceRow = {
  slug: string;
  title: string;
  shortDescription?: string;
  priceLabel?: string;
};

export default function ServicesAdminPage() {
  const [rows, setRows] = useState<ServiceRow[]>(demoServices);

  useEffect(() => {
    apiFetch<ServiceRow[]>("/services", { auth: false })
      .then(setRows)
      .catch(() => setRows(demoServices));
  }, []);

  return (
    <div>
      <PageHeader
        title="Services"
        description="Demo data shown when API is offline."
      />
      <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff" }}>
        <thead>
          <tr>
            {["Title", "Slug", "Price"].map((heading) => (
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
              <td style={{ padding: 12, borderBottom: "1px solid var(--line)" }}>{row.slug}</td>
              <td style={{ padding: 12, borderBottom: "1px solid var(--line)" }}>
                {row.priceLabel || "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
