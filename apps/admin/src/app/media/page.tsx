"use client";

import { PageHeader } from "@/components/ui";

export default function MediaAdminPage() {
  return (
    <div>
      <PageHeader
        title="Media library"
        description="Upload and organise website images and documents."
        actions={
          <button type="button" className="btn btn-primary">
            + Upload file
          </button>
        }
      />
      <section className="card empty">No media files uploaded yet.</section>
    </div>
  );
}
