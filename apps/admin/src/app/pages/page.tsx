"use client";

import { PageHeader } from "@/components/PageHeader";

const pages = [
  { slug: "/", title: "Homepage", sections: "Hero, Trust, Services, INP, Video, Founder, Insights, CTA" },
  { slug: "/about", title: "About", sections: "Founder story, stats, advisory process" },
  { slug: "/about/our-approach", title: "Our Approach", sections: "Principles" },
  { slug: "/about/inp-method", title: "INP Method", sections: "Identify / Navigate / Perform" },
  { slug: "/services", title: "Services", sections: "Service listing" },
  { slug: "/workshops", title: "Workshops", sections: "Workshop listing" },
  { slug: "/blog", title: "Blog", sections: "Featured + listing" },
  { slug: "/contact", title: "Contact", sections: "Form + details" },
];

export default function PagesAdminPage() {
  return (
    <div>
      <PageHeader
        title="Page management"
        description="Structured section editing will write to Page / PageSection tables once the DB is migrated. Phase 1 content currently lives in packages/content."
      />
      <div style={{ display: "grid", gap: 10 }}>
        {pages.map((page) => (
          <div
            key={page.slug}
            style={{
              background: "var(--panel)",
              border: "1px solid var(--line)",
              borderRadius: 14,
              padding: 16,
            }}
          >
            <strong>{page.title}</strong>
            <div style={{ color: "var(--muted)", marginTop: 4 }}>{page.slug}</div>
            <div style={{ marginTop: 8, fontSize: 14 }}>{page.sections}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
