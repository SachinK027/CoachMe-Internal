import type { BookableOffering } from "./types";

/** Static demo slots for Phase 1 — no payment, no persistence. */
export const bookableOfferings: BookableOffering[] = [
  {
    slug: "strategic-introduction-call",
    type: "service",
    title: "Strategic Introduction Call",
    durationMinutes: 30,
    timezone: "Asia/Dubai",
    priceLabel: "Complimentary",
    summary:
      "A focused 30-minute conversation to understand your challenges and explore the right approach.",
    slots: [
      {
        id: "sic-2026-11-10-1000",
        startsAt: "2026-11-10T10:00:00+04:00",
        endsAt: "2026-11-10T10:30:00+04:00",
        label: "10:00 – 10:30 GST",
      },
      {
        id: "sic-2026-11-10-1400",
        startsAt: "2026-11-10T14:00:00+04:00",
        endsAt: "2026-11-10T14:30:00+04:00",
        label: "14:00 – 14:30 GST",
      },
      {
        id: "sic-2026-11-12-1100",
        startsAt: "2026-11-12T11:00:00+04:00",
        endsAt: "2026-11-12T11:30:00+04:00",
        label: "11:00 – 11:30 GST",
      },
      {
        id: "sic-2026-11-13-1600",
        startsAt: "2026-11-13T16:00:00+04:00",
        endsAt: "2026-11-13T16:30:00+04:00",
        label: "16:00 – 16:30 GST",
      },
      {
        id: "sic-2026-11-17-0930",
        startsAt: "2026-11-17T09:30:00+04:00",
        endsAt: "2026-11-17T10:00:00+04:00",
        label: "09:30 – 10:00 GST",
      },
      {
        id: "sic-2026-11-19-1500",
        startsAt: "2026-11-19T15:00:00+04:00",
        endsAt: "2026-11-19T15:30:00+04:00",
        label: "15:00 – 15:30 GST",
      },
    ],
  },
  {
    slug: "1-1-exclusive-advisory",
    type: "service",
    title: "1:1 Exclusive Advisory",
    durationMinutes: 60,
    timezone: "Asia/Dubai",
    priceLabel: "8,000 AED (display only — no online payment)",
    summary:
      "Schedule an initial conversation about the 8-week private advisory experience. Payment is not collected online in this demo.",
    slots: [
      {
        id: "oto-2026-11-11-1000",
        startsAt: "2026-11-11T10:00:00+04:00",
        endsAt: "2026-11-11T11:00:00+04:00",
        label: "10:00 – 11:00 GST",
      },
      {
        id: "oto-2026-11-14-1300",
        startsAt: "2026-11-14T13:00:00+04:00",
        endsAt: "2026-11-14T14:00:00+04:00",
        label: "13:00 – 14:00 GST",
      },
      {
        id: "oto-2026-11-18-1700",
        startsAt: "2026-11-18T17:00:00+04:00",
        endsAt: "2026-11-18T18:00:00+04:00",
        label: "17:00 – 18:00 GST",
      },
    ],
  },
  {
    slug: "do-we-really-understand-each-other",
    type: "workshop",
    title: "Do We Really Understand Each Other?",
    durationMinutes: 180,
    timezone: "Asia/Dubai",
    priceLabel: "395 AED (display only — no online payment)",
    summary:
      "Register interest for the English live online workshop. Capacity is limited to 10 participants.",
    slots: [
      {
        id: "ws-en-2026-11-28",
        startsAt: "2026-11-28T11:00:00+04:00",
        endsAt: "2026-11-28T14:00:00+04:00",
        label: "28 Nov 2026 · 11:00 GST · 3 hours",
        seatsRemaining: 10,
      },
    ],
  },
  {
    slug: "da-li-se-zaista-razumemo",
    type: "workshop",
    title: "Da Li Se Zaista Razumemo?",
    durationMinutes: 180,
    timezone: "Europe/Belgrade",
    priceLabel: "245 AED (display only — no online payment)",
    summary:
      "Prijavi interesovanje za online radionicu na srpskom. Maksimalno 10 učesnika.",
    slots: [
      {
        id: "ws-sr-2026-11-21",
        startsAt: "2026-11-21T10:00:00+01:00",
        endsAt: "2026-11-21T13:00:00+01:00",
        label: "21. nov 2026 · 10:00 CET · 3 sata",
        seatsRemaining: 10,
      },
    ],
  },
];

export function getBookableBySlug(slug: string) {
  return bookableOfferings.find((offering) => offering.slug === slug);
}
