"use client";

import { PageHeader } from "@/components/ui";

export default function SettingsAdminPage() {
  return (
    <div>
      <PageHeader
        title="Website settings"
        description="Manage brand, contact details and default SEO configuration."
        actions={
          <button type="button" className="btn btn-primary">
            Save settings
          </button>
        }
      />
      <section className="card" style={{ padding: 20, display: "grid", gap: 14 }}>
        <div className="field-row">
          <label className="field">
            <span>Website name</span>
            <input className="input" defaultValue="CoachME Advisory" />
          </label>
          <label className="field">
            <span>Contact email</span>
            <input className="input" defaultValue="office@coachme-advisory.com" />
          </label>
        </div>
        <label className="field">
          <span>Location</span>
          <input className="input" defaultValue="Ras Al Khaimah, United Arab Emirates" />
        </label>
      </section>
    </div>
  );
}
