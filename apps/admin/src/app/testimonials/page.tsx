"use client";

import { PageHeader } from "@/components/PageHeader";

export default function TestimonialsAdminPage() {
  return (
    <div>
      <PageHeader
        title="Testimonials"
        description="Do not add fabricated testimonials. Only publish client quotes with consent. Table: Testimonials."
      />
      <p style={{ color: "var(--muted)" }}>No testimonials seeded — none were published as verified quotes on the live site migration set.</p>
    </div>
  );
}
