"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { StatGrid } from "@/components/StatGrid";
import { apiFetch } from "@/lib/api";

type Stats = {
  enquiries: number;
  bookings: number;
  upcomingWorkshops: number;
  publishedPosts: number;
  draftPosts: number;
  activeServices: number;
  source?: string;
};

const demoStats: Stats = {
  enquiries: 0,
  bookings: 0,
  upcomingWorkshops: 2,
  publishedPosts: 3,
  draftPosts: 0,
  activeServices: 4,
  source: "static-fallback",
};

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>(demoStats);

  useEffect(() => {
    apiFetch<Stats>("/admin/dashboard")
      .then(setStats)
      .catch(() => setStats(demoStats));
  }, []);

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Overview of enquiries, bookings, workshops and published content."
      />
      <StatGrid
        items={[
          { label: "Enquiries", value: stats.enquiries },
          { label: "Bookings", value: stats.bookings },
          { label: "Workshops", value: stats.upcomingWorkshops },
          { label: "Published posts", value: stats.publishedPosts },
          { label: "Draft posts", value: stats.draftPosts },
          { label: "Active services", value: stats.activeServices },
        ]}
      />
      <p style={{ marginTop: 16, color: "var(--muted)" }}>
        Showing local demo stats while API/database auth is bypassed.
      </p>
    </div>
  );
}
