"use client";

import { FormEvent, useMemo, useState } from "react";
import { Badge, Modal, PageHeader } from "@/components/ui";
import { BookingRow, initialBookings } from "@/lib/admin-data";

export default function BookingsAdminPage() {
  const [rows, setRows] = useState<BookingRow[]>(initialBookings);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<BookingRow | null>(null);

  const filtered = useMemo(() => {
    return rows.filter((row) => {
      const haystack = `${row.customer} ${row.email} ${row.offering} ${row.reference}`.toLowerCase();
      const matchesQuery = haystack.includes(query.toLowerCase());
      const matchesStatus = status === "All" || row.bookingStatus === status;
      return matchesQuery && matchesStatus;
    });
  }, [rows, query, status]);

  function openCreate() {
    setEditing(null);
    setOpen(true);
  }

  function openEdit(row: BookingRow) {
    setEditing(row);
    setOpen(true);
  }

  function onSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const next: BookingRow = {
      id: editing?.id || `bk-${Date.now()}`,
      reference: editing?.reference || `CM-${Date.now().toString(36).toUpperCase()}`,
      customer: String(form.get("customer") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      offering: String(form.get("offering") || ""),
      session: String(form.get("session") || ""),
      amount: String(form.get("amount") || "Complimentary"),
      bookingStatus: String(form.get("bookingStatus") || "New") as BookingRow["bookingStatus"],
      paymentStatus: String(form.get("paymentStatus") || "None") as BookingRow["paymentStatus"],
      createdAt: editing?.createdAt || new Date().toISOString().slice(0, 10),
    };

    setRows((prev) =>
      editing ? prev.map((row) => (row.id === editing.id ? next : row)) : [next, ...prev],
    );
    setOpen(false);
  }

  function updateStatus(id: string, bookingStatus: BookingRow["bookingStatus"]) {
    setRows((prev) => prev.map((row) => (row.id === id ? { ...row, bookingStatus } : row)));
  }

  return (
    <div>
      <PageHeader
        title="Bookings"
        description="Track registrations, confirmation status and payment state separately."
        actions={
          <button type="button" className="btn btn-primary" onClick={openCreate}>
            + Add booking
          </button>
        }
      />

      <div className="toolbar">
        <div className="toolbar-left">
          <input
            className="input"
            placeholder="Search customer, email, reference…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <select className="select" value={status} onChange={(event) => setStatus(event.target.value)}>
            <option>All</option>
            <option>New</option>
            <option>Confirmed</option>
            <option>Cancelled</option>
            <option>Completed</option>
          </select>
        </div>
        <div className="toolbar-right">
          <button type="button" className="btn btn-secondary">
            Export CSV
          </button>
        </div>
      </div>

      <section className="card table-wrap">
        <table className="data">
          <thead>
            <tr>
              <th>Reference</th>
              <th>Customer</th>
              <th>Offering</th>
              <th>Session</th>
              <th>Amount</th>
              <th>Booking</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="empty">
                  No bookings found.
                </td>
              </tr>
            ) : (
              filtered.map((row) => (
                <tr key={row.id}>
                  <td>
                    <strong>{row.reference}</strong>
                    <div style={{ color: "var(--muted)", fontSize: 12 }}>{row.createdAt}</div>
                  </td>
                  <td>
                    <div>{row.customer}</div>
                    <div style={{ color: "var(--muted)", fontSize: 13 }}>{row.email}</div>
                  </td>
                  <td>{row.offering}</td>
                  <td>{row.session}</td>
                  <td>{row.amount}</td>
                  <td>
                    <Badge
                      tone={
                        row.bookingStatus === "Confirmed" || row.bookingStatus === "Completed"
                          ? "success"
                          : row.bookingStatus === "New"
                            ? "warning"
                            : "danger"
                      }
                    >
                      {row.bookingStatus}
                    </Badge>
                  </td>
                  <td>
                    <Badge
                      tone={
                        row.paymentStatus === "Paid"
                          ? "success"
                          : row.paymentStatus === "Pending"
                            ? "warning"
                            : "neutral"
                      }
                    >
                      {row.paymentStatus}
                    </Badge>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <button type="button" className="btn btn-secondary" onClick={() => openEdit(row)}>
                        Edit
                      </button>
                      {row.bookingStatus !== "Confirmed" ? (
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => updateStatus(row.id, "Confirmed")}
                        >
                          Confirm
                        </button>
                      ) : null}
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
        title={editing ? "Edit booking" : "Add booking"}
        onClose={() => setOpen(false)}
        footer={
          <>
            <button type="button" className="btn btn-secondary" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button type="submit" form="booking-form" className="btn btn-primary">
              {editing ? "Save changes" : "Create booking"}
            </button>
          </>
        }
      >
        <form id="booking-form" onSubmit={onSave}>
          <div className="field-row">
            <div className="field">
              <label>Customer name</label>
              <input className="input" name="customer" required defaultValue={editing?.customer || ""} />
            </div>
            <div className="field">
              <label>Email</label>
              <input
                className="input"
                type="email"
                name="email"
                required
                defaultValue={editing?.email || ""}
              />
            </div>
          </div>
          <div className="field-row">
            <div className="field">
              <label>Phone</label>
              <input className="input" name="phone" defaultValue={editing?.phone || ""} />
            </div>
            <div className="field">
              <label>Amount</label>
              <input className="input" name="amount" defaultValue={editing?.amount || "Complimentary"} />
            </div>
          </div>
          <div className="field">
            <label>Offering</label>
            <input className="input" name="offering" required defaultValue={editing?.offering || ""} />
          </div>
          <div className="field">
            <label>Session</label>
            <input className="input" name="session" required defaultValue={editing?.session || ""} />
          </div>
          <div className="field-row">
            <div className="field">
              <label>Booking status</label>
              <select
                className="select"
                name="bookingStatus"
                defaultValue={editing?.bookingStatus || "New"}
              >
                <option>New</option>
                <option>Confirmed</option>
                <option>Cancelled</option>
                <option>Completed</option>
              </select>
            </div>
            <div className="field">
              <label>Payment status</label>
              <select
                className="select"
                name="paymentStatus"
                defaultValue={editing?.paymentStatus || "None"}
              >
                <option>None</option>
                <option>Pending</option>
                <option>Paid</option>
              </select>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
