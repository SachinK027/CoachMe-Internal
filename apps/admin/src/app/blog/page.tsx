"use client";

import { FormEvent, useMemo, useState } from "react";
import { Badge, Modal, PageHeader } from "@/components/ui";
import { BlogRow, initialPosts } from "@/lib/admin-data";

export default function BlogAdminPage() {
  const [rows, setRows] = useState<BlogRow[]>(initialPosts);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<BlogRow | null>(null);

  const filtered = useMemo(() => {
    return rows.filter((row) => {
      const matchesQuery = `${row.title} ${row.category}`.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = status === "All" || row.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [rows, query, status]);

  function openCreate() {
    setEditing(null);
    setOpen(true);
  }

  function openEdit(row: BlogRow) {
    setEditing(row);
    setOpen(true);
  }

  function onSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const title = String(form.get("title") || "");
    const next: BlogRow = {
      id: editing?.id || `post-${Date.now()}`,
      slug:
        editing?.slug ||
        title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, ""),
      title,
      author: String(form.get("author") || "Mirjana Radenović Ratković"),
      category: String(form.get("category") || "Leadership"),
      status: String(form.get("status") || "Draft") as BlogRow["status"],
      publishedAt: String(form.get("publishedAt") || new Date().toISOString().slice(0, 10)),
      readingMinutes: Number(form.get("readingMinutes") || 2),
    };

    setRows((prev) =>
      editing ? prev.map((row) => (row.id === editing.id ? next : row)) : [next, ...prev],
    );
    setOpen(false);
  }

  function togglePublish(id: string) {
    setRows((prev) =>
      prev.map((row) =>
        row.id === id
          ? {
              ...row,
              status: row.status === "Published" ? "Draft" : "Published",
            }
          : row,
      ),
    );
  }

  function removeRow(id: string) {
    if (!confirm("Delete this article?")) return;
    setRows((prev) => prev.filter((row) => row.id !== id));
  }

  return (
    <div>
      <PageHeader
        title="Blog"
        description="Create, edit, publish and unpublish insight articles."
        actions={
          <button type="button" className="btn btn-primary" onClick={openCreate}>
            + Add article
          </button>
        }
      />

      <div className="toolbar">
        <div className="toolbar-left">
          <input
            className="input"
            placeholder="Search articles…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <select className="select" value={status} onChange={(event) => setStatus(event.target.value)}>
            <option>All</option>
            <option>Published</option>
            <option>Draft</option>
          </select>
        </div>
        <div className="toolbar-right" />
      </div>

      <div className="blog-grid">
        {filtered.map((row) => (
          <article key={row.id} className="blog-card">
            <div
              style={{
                height: 120,
                background:
                  "linear-gradient(135deg, #243832, #55756a), radial-gradient(circle at top right, rgba(201,217,108,0.35), transparent 40%)",
              }}
            />
            <div className="blog-card-body">
              <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                <Badge tone={row.status === "Published" ? "success" : "warning"}>{row.status}</Badge>
                <span style={{ color: "var(--muted)", fontSize: 12 }}>{row.category}</span>
              </div>
              <h3>{row.title}</h3>
              <div style={{ color: "var(--muted)", fontSize: 13 }}>
                {row.author} · {row.publishedAt} · {row.readingMinutes} min
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
                <button type="button" className="btn btn-secondary" onClick={() => openEdit(row)}>
                  Edit
                </button>
                <button type="button" className="btn btn-primary" onClick={() => togglePublish(row.id)}>
                  {row.status === "Published" ? "Unpublish" : "Publish"}
                </button>
                <button type="button" className="btn btn-danger" onClick={() => removeRow(row.id)}>
                  Delete
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 ? <div className="card empty">No articles found.</div> : null}

      <Modal
        open={open}
        title={editing ? "Edit article" : "Add article"}
        onClose={() => setOpen(false)}
        footer={
          <>
            <button type="button" className="btn btn-secondary" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button type="submit" form="blog-form" className="btn btn-primary">
              {editing ? "Save changes" : "Create article"}
            </button>
          </>
        }
      >
        <form id="blog-form" onSubmit={onSave}>
          <div className="field">
            <label>Title</label>
            <input className="input" name="title" required defaultValue={editing?.title || ""} />
          </div>
          <div className="field-row">
            <div className="field">
              <label>Author</label>
              <input
                className="input"
                name="author"
                defaultValue={editing?.author || "Mirjana Radenović Ratković"}
              />
            </div>
            <div className="field">
              <label>Category</label>
              <select className="select" name="category" defaultValue={editing?.category || "Leadership"}>
                <option>Leadership</option>
                <option>Teams</option>
                <option>Communication</option>
              </select>
            </div>
          </div>
          <div className="field-row">
            <div className="field">
              <label>Status</label>
              <select className="select" name="status" defaultValue={editing?.status || "Draft"}>
                <option>Published</option>
                <option>Draft</option>
              </select>
            </div>
            <div className="field">
              <label>Publish date</label>
              <input
                className="input"
                type="date"
                name="publishedAt"
                defaultValue={editing?.publishedAt || new Date().toISOString().slice(0, 10)}
              />
            </div>
          </div>
          <div className="field">
            <label>Reading time (minutes)</label>
            <input
              className="input"
              type="number"
              name="readingMinutes"
              defaultValue={editing?.readingMinutes ?? 2}
            />
          </div>
          <div className="field">
            <label>Body</label>
            <textarea
              className="textarea"
              name="body"
              rows={6}
              placeholder="Write the article content…"
              defaultValue=""
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
