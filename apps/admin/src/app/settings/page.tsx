"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { apiFetch } from "@/lib/api";

export default function SettingsAdminPage() {
  const [settings, setSettings] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    apiFetch<Record<string, unknown>>("/settings", { auth: false })
      .then(setSettings)
      .catch(() => setSettings(null));
  }, []);

  return (
    <div>
      <PageHeader
        title="Website settings"
        description="Logo, contact details, social links, SEO defaults and tracking configuration."
      />
      <pre
        style={{
          background: "#fff",
          border: "1px solid var(--line)",
          borderRadius: 14,
          padding: 16,
          overflow: "auto",
        }}
      >
        {JSON.stringify(settings, null, 2)}
      </pre>
    </div>
  );
}
