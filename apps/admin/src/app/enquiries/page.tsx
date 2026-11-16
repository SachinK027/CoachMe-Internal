"use client";

import { Badge, PageHeader } from "@/components/ui";

const enquiries = [
  {
    id: "1",
    name: "Aisha Khan",
    email: "aisha@example.com",
    message: "Interested in team advisory for a leadership group in Dubai.",
    status: "New",
  },
  {
    id: "2",
    name: "Tom Hughes",
    email: "daniel@example.com",
    message: "Requesting details about the November English workshop.",
    status: "In Progress",
  },
];

export default function EnquiriesAdminPage() {
  return (
    <div>
      <PageHeader
        title="Enquiries"
        description="Contact form submissions from the public website."
      />
      <div className="list-card">
        {enquiries.map((item) => (
          <article key={item.id} className="card" style={{ padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <div>
                <strong>{item.name}</strong>
                <div style={{ color: "var(--muted)", fontSize: 13 }}>{item.email}</div>
              </div>
              <Badge tone={item.status === "New" ? "warning" : "info"}>{item.status}</Badge>
            </div>
            <p style={{ margin: "12px 0 0", color: "var(--muted)" }}>{item.message}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
