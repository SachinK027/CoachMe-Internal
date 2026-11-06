"use client";

import { PageHeader } from "@/components/PageHeader";

export default function AuditAdminPage() {
  return (
    <div>
      <PageHeader
        title="Audit logs"
        description="Login, publishing, deletions, booking updates and settings changes are written to AuditLogs by the API."
      />
      <p style={{ color: "var(--muted)" }}>
        Connect the database and use the admin actions to populate audit history. Super Admin access
        only.
      </p>
    </div>
  );
}
