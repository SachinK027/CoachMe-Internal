"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"}/enquiries`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      if (!response.ok) throw new Error("API unavailable");
    } catch {
      try {
        const existing = JSON.parse(localStorage.getItem("coachme-demo-enquiries") || "[]");
        existing.push({ ...payload, createdAt: new Date().toISOString(), demo: true });
        localStorage.setItem("coachme-demo-enquiries", JSON.stringify(existing));
      } catch {
        // ignore
      }
    }
    setSubmitting(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-[2rem] border border-line bg-white p-8">
        <h2 className="display text-3xl">Message received</h2>
        <p className="mt-3 text-muted">
          This is a local demo confirmation. Enquiries will sync to the admin CMS once the API is
          connected.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-[2rem] border border-line bg-white p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm">
          <span className="mb-2 block font-medium">First name</span>
          <input name="firstName" required className="w-full rounded-2xl border border-line bg-ivory px-4 py-3" />
        </label>
        <label className="text-sm">
          <span className="mb-2 block font-medium">Last name</span>
          <input name="lastName" required className="w-full rounded-2xl border border-line bg-ivory px-4 py-3" />
        </label>
        <label className="text-sm sm:col-span-2">
          <span className="mb-2 block font-medium">Email</span>
          <input name="email" type="email" required className="w-full rounded-2xl border border-line bg-ivory px-4 py-3" />
        </label>
        <label className="text-sm sm:col-span-2">
          <span className="mb-2 block font-medium">Message</span>
          <textarea name="message" required rows={5} className="w-full rounded-2xl border border-line bg-ivory px-4 py-3" />
        </label>
      </div>
      <Button type="submit" className="mt-6" disabled={submitting}>
        {submitting ? "Sending…" : "Send enquiry"}
      </Button>
    </form>
  );
}
