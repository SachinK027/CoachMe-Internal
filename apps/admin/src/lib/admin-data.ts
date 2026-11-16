export type WorkshopRow = {
  id: string;
  slug: string;
  title: string;
  language: string;
  format: string;
  date: string;
  price: number;
  currency: string;
  seats: number;
  capacity: number;
  status: "Published" | "Draft" | "Past";
};

export type BookingRow = {
  id: string;
  reference: string;
  customer: string;
  email: string;
  phone: string;
  offering: string;
  session: string;
  amount: string;
  bookingStatus: "New" | "Confirmed" | "Cancelled" | "Completed";
  paymentStatus: "None" | "Pending" | "Paid";
  createdAt: string;
};

export type BlogRow = {
  id: string;
  slug: string;
  title: string;
  author: string;
  category: string;
  status: "Published" | "Draft";
  publishedAt: string;
  readingMinutes: number;
};

export const initialWorkshops: WorkshopRow[] = [
  {
    id: "ws-1",
    slug: "do-we-really-understand-each-other",
    title: "Do We Really Understand Each Other?",
    language: "English",
    format: "Online",
    date: "2026-11-28",
    price: 395,
    currency: "AED",
    seats: 10,
    capacity: 10,
    status: "Published",
  },
  {
    id: "ws-2",
    slug: "da-li-se-zaista-razumemo",
    title: "Da Li Se Zaista Razumemo?",
    language: "Serbian",
    format: "Online",
    date: "2026-11-21",
    price: 245,
    currency: "AED",
    seats: 10,
    capacity: 10,
    status: "Published",
  },
];

export const initialBookings: BookingRow[] = [
  {
    id: "bk-1",
    reference: "CM-8F2K1A",
    customer: "Sara Al Mazrouei",
    email: "sara@example.com",
    phone: "+971 50 000 0001",
    offering: "Strategic Introduction Call",
    session: "10 Nov 2026 · 10:00 GST",
    amount: "Complimentary",
    bookingStatus: "Confirmed",
    paymentStatus: "None",
    createdAt: "2026-11-08",
  },
  {
    id: "bk-2",
    reference: "CM-9LQ34B",
    customer: "Marko Petrović",
    email: "marko@example.com",
    phone: "+381 60 000 0002",
    offering: "Da Li Se Zaista Razumemo?",
    session: "21 Nov 2026 · 10:00 CET",
    amount: "245 AED",
    bookingStatus: "New",
    paymentStatus: "Pending",
    createdAt: "2026-11-10",
  },
  {
    id: "bk-3",
    reference: "CM-2HT78C",
    customer: "Elena Rossi",
    email: "elena@example.com",
    phone: "+971 55 000 0003",
    offering: "Do We Really Understand Each Other?",
    session: "28 Nov 2026 · 11:00 GST",
    amount: "395 AED",
    bookingStatus: "Confirmed",
    paymentStatus: "Paid",
    createdAt: "2026-11-12",
  },
];

export const initialPosts: BlogRow[] = [
  {
    id: "post-1",
    slug: "your-team-has-ideas-you-will-never-hear",
    title:
      "Your team has ideas you will never hear. And you probably believe you have built something fearless.",
    author: "Mirjana Radenović Ratković",
    category: "Leadership",
    status: "Published",
    publishedAt: "2025-06-08",
    readingMinutes: 2,
  },
  {
    id: "post-2",
    slug: "during-a-crisis-you-discover-the-team-you-actually-built",
    title: "During a crisis, you discover the team you actually built.",
    author: "Mirjana Radenović Ratković",
    category: "Teams",
    status: "Published",
    publishedAt: "2025-06-01",
    readingMinutes: 2,
  },
  {
    id: "post-3",
    slug: "youre-watching-your-team-for-signs-of-trouble",
    title:
      "You're watching your team for signs of trouble. You might be looking in the wrong direction.",
    author: "Mirjana Radenović Ratković",
    category: "Leadership",
    status: "Published",
    publishedAt: "2025-05-20",
    readingMinutes: 2,
  },
];
