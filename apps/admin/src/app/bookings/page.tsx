"use client";

import { PageHeader } from "@/components/PageHeader";

export default function BookingsAdminPage() {
  return (
    <div>
      <PageHeader
        title="Bookings"
        description="API auth bypassed for local review. Bookings will appear here once Postgres + API login are connected."
      />
      <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff" }}>
        <thead>
          <tr>
            {["Reference", "Customer", "Offering", "Session", "Booking", "Payment"].map(
              (heading) => (
                <th
                  key={heading}
                  style={{ textAlign: "left", padding: 12, borderBottom: "1px solid var(--line)" }}
                >
                  {heading}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={6} style={{ padding: 16, color: "var(--muted)" }}>
              No bookings yet (demo mode).
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
