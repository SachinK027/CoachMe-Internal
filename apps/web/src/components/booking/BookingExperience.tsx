"use client";

import { useMemo, useState } from "react";
import type { BookableOffering, BookingSlot } from "@coachme/content";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: string;
  jobTitle: string;
  notes: string;
  termsAccepted: boolean;
  marketingConsent: boolean;
};

const initialForm: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  countryCode: "+971",
  jobTitle: "",
  notes: "",
  termsAccepted: false,
  marketingConsent: false,
};

export function BookingExperience({ offering }: { offering: BookableOffering }) {
  const [viewMode, setViewMode] = useState<"month" | "week">("month");
  const [selectedSlot, setSelectedSlot] = useState<BookingSlot | null>(null);
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({ });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [cursor, setCursor] = useState(() => {
    const first = offering.slots[0] ? new Date(offering.slots[0].startsAt) : new Date();
    return new Date(first.getFullYear(), first.getMonth(), 1);
  });

  const slotsByDay = useMemo(() => {
    const map = new Map<string, BookingSlot[]>();
    for (const slot of offering.slots) {
      const key = slot.startsAt.slice(0, 10);
      const list = map.get(key) ?? [];
      list.push(slot);
      map.set(key, list);
    }
    return map;
  }, [offering.slots]);

  const days = useMemo(() => buildCalendarDays(cursor, viewMode), [cursor, viewMode]);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validate() {
    const next: Record<string, string> = {};
    if (!selectedSlot) next.slot = "Select a session.";
    if (!form.firstName.trim()) next.firstName = "First name is required.";
    if (!form.lastName.trim()) next.lastName = "Last name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email.";
    if (!form.phone.trim()) next.phone = "Phone number is required.";
    if (!form.termsAccepted) next.termsAccepted = "Please accept the terms and privacy policy.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!validate() || !selectedSlot) return;
    setSubmitting(true);

    const payload = {
      offeringSlug: offering.slug,
      slotId: selectedSlot.id,
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      countryCode: form.countryCode,
      jobTitle: form.jobTitle,
      notes: form.notes,
      termsAccepted: form.termsAccepted,
      marketingConsent: form.marketingConsent,
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"}/bookings`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      if (!response.ok) throw new Error("API unavailable");
    } catch {
      try {
        const existing = JSON.parse(localStorage.getItem("coachme-demo-bookings") || "[]");
        existing.push({ ...payload, demo: true });
        localStorage.setItem("coachme-demo-bookings", JSON.stringify(existing));
      } catch {
        // ignore storage errors in demo
      }
    }

    setSubmitting(false);
    setSubmitted(true);
  }

  if (submitted && selectedSlot) {
    return (
      <div className="rounded-[2rem] border border-line bg-white p-8 md:p-10">
        <p className="eyebrow">Request received</p>
        <h2 className="display mt-4 text-4xl">Thank you, {form.firstName}.</h2>
        <p className="mt-4 max-w-2xl text-muted">
          This is a local demo confirmation. Your booking was not saved to a database and no email
          or calendar invite was sent. Those will be enabled after the API and schema phase.
        </p>
        <div className="mt-8 rounded-2xl bg-ivory p-6 text-sm">
          <p>
            <strong>Offering:</strong> {offering.title}
          </p>
          <p className="mt-2">
            <strong>Session:</strong> {selectedSlot.label}
          </p>
          <p className="mt-2">
            <strong>Duration:</strong> {offering.durationMinutes} minutes
          </p>
          <p className="mt-2">
            <strong>Timezone:</strong> {offering.timezone}
          </p>
          <p className="mt-2">
            <strong>Price:</strong> {offering.priceLabel}
          </p>
        </div>
        <Button
          className="mt-8"
          variant="secondary"
          onClick={() => {
            setSubmitted(false);
            setSelectedSlot(null);
            setForm(initialForm);
          }}
        >
          Book another session
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-[2rem] border border-line bg-white p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="eyebrow">Enhanced calendar</p>
            <h2 className="display mt-2 text-3xl">Select a session</h2>
          </div>
          <div className="flex rounded-full border border-line p-1">
            {(["month", "week"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setViewMode(mode)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm capitalize",
                  viewMode === mode ? "bg-forest text-ivory" : "text-muted",
                )}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            className="rounded-full border border-line px-4 py-2 text-sm"
            onClick={() =>
              setCursor(
                new Date(
                  cursor.getFullYear(),
                  cursor.getMonth() - (viewMode === "month" ? 1 : 0),
                  viewMode === "month" ? 1 : cursor.getDate() - 7,
                ),
              )
            }
          >
            Previous
          </button>
          <p className="font-semibold text-forest">
            {cursor.toLocaleDateString("en-GB", {
              month: "long",
              year: "numeric",
              ...(viewMode === "week" ? { day: "numeric" } : {}),
            })}
          </p>
          <button
            type="button"
            className="rounded-full border border-line px-4 py-2 text-sm"
            onClick={() =>
              setCursor(
                new Date(
                  cursor.getFullYear(),
                  cursor.getMonth() + (viewMode === "month" ? 1 : 0),
                  viewMode === "month" ? 1 : cursor.getDate() + 7,
                ),
              )
            }
          >
            Next
          </button>
        </div>

        <div className="mt-6 grid grid-cols-7 gap-2 text-center text-xs uppercase tracking-[0.14em] text-muted">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-7 gap-2">
          {days.map((day, index) => {
            if (!day) return <div key={`empty-${index}`} />;
            const key = toKey(day);
            const daySlots = slotsByDay.get(key) ?? [];
            const hasSlots = daySlots.length > 0;
            const selected =
              selectedSlot && selectedSlot.startsAt.slice(0, 10) === key;

            return (
              <button
                key={key}
                type="button"
                disabled={!hasSlots}
                onClick={() => setSelectedSlot(daySlots[0])}
                className={cn(
                  "min-h-[4.5rem] rounded-2xl border p-2 text-left transition",
                  hasSlots
                    ? "border-forest/20 bg-ivory hover:border-forest"
                    : "border-transparent bg-transparent text-muted/40",
                  selected && "border-forest bg-forest text-ivory",
                )}
              >
                <span className="text-sm font-semibold">{day.getDate()}</span>
                {hasSlots ? (
                  <span className="mt-2 block text-[10px] leading-tight">
                    {daySlots.length} slot{daySlots.length > 1 ? "s" : ""}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        {selectedSlot ? (
          <div className="mt-6">
            <p className="text-sm font-semibold text-forest">Available times</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {(slotsByDay.get(selectedSlot.startsAt.slice(0, 10)) ?? []).map((slot) => (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm",
                    selectedSlot.id === slot.id
                      ? "border-forest bg-forest text-ivory"
                      : "border-line hover:border-forest",
                  )}
                >
                  {slot.label}
                  {typeof slot.seatsRemaining === "number"
                    ? ` · ${slot.seatsRemaining} seats`
                    : ""}
                </button>
              ))}
            </div>
          </div>
        ) : null}
        {errors.slot ? <p className="mt-3 text-sm text-red-700">{errors.slot}</p> : null}
      </div>

      <form onSubmit={onSubmit} className="rounded-[2rem] border border-line bg-white p-6 md:p-8">
        <h2 className="display text-3xl">Booking details</h2>
        <p className="mt-2 text-sm text-muted">
          No payment is collected. Demo submissions stay in your browser only.
        </p>

        <div className="mt-6 rounded-2xl bg-ivory p-4 text-sm">
          <p>
            <strong>{offering.title}</strong>
          </p>
          <p className="mt-1 text-muted">
            {selectedSlot ? selectedSlot.label : "No session selected"}
          </p>
          <p className="mt-1 text-muted">
            {offering.durationMinutes} min · {offering.timezone}
          </p>
          <p className="mt-1 text-muted">{offering.priceLabel}</p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Field
            label="First name"
            value={form.firstName}
            error={errors.firstName}
            onChange={(value) => updateField("firstName", value)}
          />
          <Field
            label="Last name"
            value={form.lastName}
            error={errors.lastName}
            onChange={(value) => updateField("lastName", value)}
          />
          <Field
            label="Email"
            type="email"
            value={form.email}
            error={errors.email}
            onChange={(value) => updateField("email", value)}
            className="sm:col-span-2"
          />
          <Field
            label="Country code"
            value={form.countryCode}
            onChange={(value) => updateField("countryCode", value)}
          />
          <Field
            label="Phone"
            value={form.phone}
            error={errors.phone}
            onChange={(value) => updateField("phone", value)}
          />
          <Field
            label="Job title"
            value={form.jobTitle}
            onChange={(value) => updateField("jobTitle", value)}
            className="sm:col-span-2"
          />
          <label className="sm:col-span-2 block text-sm">
            <span className="mb-2 block font-medium">Additional information</span>
            <textarea
              value={form.notes}
              onChange={(event) => updateField("notes", event.target.value)}
              rows={4}
              className="w-full rounded-2xl border border-line bg-ivory px-4 py-3 outline-none focus:border-forest"
            />
          </label>
        </div>

        <label className="mt-4 flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            checked={form.termsAccepted}
            onChange={(event) => updateField("termsAccepted", event.target.checked)}
            className="mt-1"
          />
          <span>
            I agree to the{" "}
            <a href="/terms-and-conditions" className="underline">
              Terms
            </a>{" "}
            and{" "}
            <a href="/privacy-policy" className="underline">
              Privacy Policy
            </a>
            .
          </span>
        </label>
        {errors.termsAccepted ? (
          <p className="mt-2 text-sm text-red-700">{errors.termsAccepted}</p>
        ) : null}

        <label className="mt-3 flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            checked={form.marketingConsent}
            onChange={(event) => updateField("marketingConsent", event.target.checked)}
            className="mt-1"
          />
          <span>Optional: I would like to receive occasional CoachME updates.</span>
        </label>

        <Button type="submit" className="mt-8 w-full" disabled={submitting}>
          {submitting ? "Submitting…" : "Confirm booking request"}
        </Button>
      </form>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  type = "text",
  className,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  className?: string;
}) {
  return (
    <label className={cn("block text-sm", className)}>
      <span className="mb-2 block font-medium">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-line bg-ivory px-4 py-3 outline-none focus:border-forest"
      />
      {error ? <span className="mt-1 block text-red-700">{error}</span> : null}
    </label>
  );
}

function toKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function buildCalendarDays(cursor: Date, mode: "month" | "week") {
  if (mode === "week") {
    const start = startOfWeek(cursor);
    return Array.from({ length: 7 }, (_, index) => {
      const day = new Date(start);
      day.setDate(start.getDate() + index);
      return day;
    });
  }

  const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
  const start = startOfWeek(first);
  const days: (Date | null)[] = [];
  for (let i = 0; i < 42; i += 1) {
    const day = new Date(start);
    day.setDate(start.getDate() + i);
    days.push(day.getMonth() === cursor.getMonth() ? day : null);
  }
  return days;
}

function startOfWeek(date: Date) {
  const day = new Date(date);
  const weekday = (day.getDay() + 6) % 7;
  day.setDate(day.getDate() - weekday);
  day.setHours(12, 0, 0, 0);
  return day;
}
