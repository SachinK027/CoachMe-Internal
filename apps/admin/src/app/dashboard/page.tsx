"use client";

import Link from "next/link";
import { PageHeader, Badge } from "@/components/ui";
import { initialBookings, initialPosts, initialWorkshops } from "@/lib/admin-data";

const monthBars = [42, 58, 35, 70, 48, 82, 64, 90, 55, 76, 68, 88];

export default function DashboardPage() {
  const confirmed = initialBookings.filter((b) => b.bookingStatus === "Confirmed").length;
  const publishedPosts = initialPosts.filter((p) => p.status === "Published").length;

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Overview of workshops, bookings and published content."
        actions={
          <>
            <Link href="/workshops" className="btn btn-secondary">
              Manage workshops
            </Link>
            <Link href="/bookings" className="btn btn-primary">
              + New booking
            </Link>
          </>
        }
      />

      <div className="stat-grid">
        <div className="stat-card">
          <div className="label">Total bookings</div>
          <div className="value">{initialBookings.length}</div>
          <div className="delta">{confirmed} confirmed</div>
        </div>
        <div className="stat-card">
          <div className="label">Upcoming workshops</div>
          <div className="value">{initialWorkshops.length}</div>
          <div className="delta">Published catalogue</div>
        </div>
        <div className="stat-card">
          <div className="label">Published articles</div>
          <div className="value">{publishedPosts}</div>
          <div className="delta">Blog insights</div>
        </div>
        <div className="stat-card">
          <div className="label">Open enquiries</div>
          <div className="value">5</div>
          <div className="delta">Awaiting follow-up</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 14, marginTop: 14 }}>
        <section className="card chart-panel">
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
            <div>
              <strong>Monthly bookings</strong>
              <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 4 }}>
                Registration volume across the year
              </div>
            </div>
            <Badge tone="info">2026</Badge>
          </div>
          <div className="chart-bars">
            {monthBars.map((height, index) => (
              <span key={index} style={{ height: `${height}%` }} title={`Month ${index + 1}`} />
            ))}
          </div>
        </section>

        <section className="card" style={{ padding: 18 }}>
          <strong>Recent bookings</strong>
          <div className="recent-list" style={{ marginTop: 8 }}>
            {initialBookings.map((booking) => (
              <div key={booking.id} className="recent-item">
                <div>
                  <div style={{ fontWeight: 650 }}>{booking.customer}</div>
                  <div style={{ color: "var(--muted)", fontSize: 13 }}>{booking.offering}</div>
                </div>
                <Badge
                  tone={
                    booking.bookingStatus === "Confirmed"
                      ? "success"
                      : booking.bookingStatus === "New"
                        ? "warning"
                        : "neutral"
                  }
                >
                  {booking.bookingStatus}
                </Badge>
              </div>
            ))}
          </div>
          <Link href="/bookings" className="btn btn-secondary" style={{ marginTop: 12, width: "100%" }}>
            View all bookings
          </Link>
        </section>
      </div>

      <section className="card" style={{ marginTop: 14, padding: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 8 }}>
          <strong>Workshop availability</strong>
          <Link href="/workshops" className="btn btn-ghost">
            Open workshops
          </Link>
        </div>
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Workshop</th>
                <th>Date</th>
                <th>Seats</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {initialWorkshops.map((workshop) => (
                <tr key={workshop.id}>
                  <td>
                    <strong>{workshop.title}</strong>
                    <div style={{ color: "var(--muted)", fontSize: 13 }}>
                      {workshop.language} · {workshop.format}
                    </div>
                  </td>
                  <td>{workshop.date}</td>
                  <td>
                    {workshop.seats}/{workshop.capacity}
                  </td>
                  <td>
                    <Badge tone="success">{workshop.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
