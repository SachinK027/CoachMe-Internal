"use client";

import { FormEvent, useMemo, useState } from "react";
import { Badge, Modal, PageHeader } from "@/components/ui";
import { initialWorkshops, WorkshopRow } from "@/lib/admin-data";

export default function WorkshopsAdminPage() {
  const [rows, setRows] = useState<WorkshopRow[]>(initialWorkshops);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<WorkshopRow | null>(null);

  const filtered = useMemo(() => {
    return rows.filter((row) => {
      const matchesQuery = `${row.title} ${row.language}`.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = status === "All" || row.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [rows, query, status]);

  function openCreate() {
    setEditing(null);
    setOpen(true);
  }

  function openEdit(row: WorkshopRow) {
    setEditing(row);
    setOpen(true);
  }

  function onSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const next: WorkshopRow = {
      id: editing?.id || `ws-${Date.now()}`,
      slug:
        editing?.slug ||
        String(form.get("title") || "")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, ""),
      title: String(form.get("title") || ""),
      language: String(form.get("language") || "English"),
      format: String(form.get("format") || "Online"),
      date: String(form.get("date") || ""),
      price: Number(form.get("price") || 0),
      currency: String(form.get("currency") || "AED"),
      seats: Number(form.get("seats") || 0),
      capacity: Number(form.get("capacity") || 0),
      status: (String(form.get("status") || "Draft") as WorkshopRow["status"]),
    };

    setRows((prev) =>
      editing ? prev.map((row) => (row.id === editing.id ? next : row)) : [next, ...prev],
    );
    setOpen(false);
  }

  function removeRow(id: string) {
    if (!confirm("Delete this workshop?")) return;
    setRows((prev) => prev.filter((row) => row.id !== id));
  }

  return (
    <div>
      <PageHeader
        title="Workshops"
        description="Create and manage workshop catalogue, schedules and capacity."
        actions={
          <button type="button" className="btn btn-primary" onClick={openCreate}>
            + Add workshop
          </button>
        }
      />

      <div className="toolbar">
        <div className="toolbar-left">
          <input
            className="input"
            placeholder="Search workshops…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <select className="select" value={status} onChange={(event) => setStatus(event.target.value)}>
            <option>All</option>
            <option>Published</option>
            <option>Draft</option>
            <option>Past</option>
          </select>
        </div>
        <div className="toolbar-right" />
      </div>

      <section className="card table-wrap">
        <table className="data">
          <thead>
            <tr>
              <th>Workshop</th>
              <th>Date</th>
              <th>Language</th>
              <th>Price</th>
              <th>Seats</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="empty">
                  No workshops found.
                </td>
              </tr>
            ) : (
              filtered.map((row) => (
                <tr key={row.id}>
                  <td>
                    <strong>{row.title}</strong>
                    <div style={{ color: "var(--muted)", fontSize: 13 }}>{row.format}</div>
                  </td>
                  <td>{row.date}</td>
                  <td>{row.language}</td>
                  <td>
                    {row.price} {row.currency}
                  </td>
                  <td>
                    {row.seats}/{row.capacity}
                  </td>
                  <td>
                    <Badge
                      tone={
                        row.status === "Published"
                          ? "success"
                          : row.status === "Draft"
                            ? "warning"
                            : "neutral"
                      }
                    >
                      {row.status}
                    </Badge>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button type="button" className="btn btn-secondary" onClick={() => openEdit(row)}>
                        Edit
                      </button>
                      <button type="button" className="btn btn-danger" onClick={() => removeRow(row.id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>

      <Modal
        open={open}
        title={editing ? "Edit workshop" : "Add workshop"}
        onClose={() => setOpen(false)}
        footer={
          <>
            <button type="button" className="btn btn-secondary" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button type="submit" form="workshop-form" className="btn btn-primary">
              {editing ? "Save changes" : "Create workshop"}
            </button>
          </>
        }
      >
        <form id="workshop-form" onSubmit={onSave}>
          <div className="field">
            <label>Title</label>
            <input className="input" name="title" required defaultValue={editing?.title || ""} />
          </div>
          <div className="field-row">
            <div className="field">
              <label>Language</label>
              <select className="select" name="language" defaultValue={editing?.language || "English"}>
                <option>English</option>
                <option>Serbian</option>
              </select>
            </div>
            <div className="field">
              <label>Format</label>
              <select className="select" name="format" defaultValue={editing?.format || "Online"}>
                <option>Online</option>
                <option>In-person</option>
              </select>
            </div>
          </div>
          <div className="field-row">
            <div className="field">
              <label>Date</label>
              <input className="input" type="date" name="date" required defaultValue={editing?.date || ""} />
            </div>
            <div className="field">
              <label>Status</label>
              <select className="select" name="status" defaultValue={editing?.status || "Draft"}>
                <option>Published</option>
                <option>Draft</option>
                <option>Past</option>
              </select>
            </div>
          </div>
          <div className="field-row">
            <div className="field">
              <label>Price</label>
              <input
                className="input"
                type="number"
                name="price"
                required
                defaultValue={editing?.price ?? 0}
              />
            </div>
            <div className="field">
              <label>Currency</label>
              <input className="input" name="currency" defaultValue={editing?.currency || "AED"} />
            </div>
          </div>
          <div className="field-row">
            <div className="field">
              <label>Available seats</label>
              <input
                className="input"
                type="number"
                name="seats"
                required
                defaultValue={editing?.seats ?? 10}
              />
            </div>
            <div className="field">
              <label>Capacity</label>
              <input
                className="input"
                type="number"
                name="capacity"
                required
                defaultValue={editing?.capacity ?? 10}
              />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
