export type SeoMeta = {
  title: string;
  description: string;
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export type SiteSettings = {
  name: string;
  legalName: string;
  tagline: string;
  email: string;
  location: string;
  social: {
    linkedin?: string;
    instagram?: string;
    youtube?: string;
  };
  copyright: string;
  video?: {
    title: string;
    thumbnail: string;
    embedUrl?: string;
  };
};

export type StatItem = {
  label: string;
  value: string;
  sourceNote?: string;
};

export type Service = {
  slug: string;
  title: string;
  shortDescription: string;
  heroDescription: string;
  audience: string;
  challenges: string[];
  benefits: string[];
  approach: string[];
  faq: { question: string; answer: string }[];
  duration?: string;
  priceLabel?: string;
  priceNote?: string;
  isComplimentary?: boolean;
  bookable: boolean;
  image: string;
  relatedSlugs: string[];
  seo: SeoMeta;
  displayOrder: number;
};

export type Workshop = {
  slug: string;
  title: string;
  language: string;
  format: "Online" | "In-person";
  shortDescription: string;
  description: string;
  learningOutcomes: string[];
  audience: string;
  facilitator: string;
  startDate: string;
  endDate: string;
  timeLabel: string;
  timezone: string;
  duration: string;
  price: number;
  currency: string;
  priceNote?: string;
  maxParticipants: number;
  availableSeats: number;
  cancellationPolicy: string;
  image: string;
  status: "upcoming" | "past";
  seo: SeoMeta;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  author: string;
  publishedAt: string;
  readingTimeMinutes: number;
  category: string;
  tags: string[];
  coverImage: string;
  featured?: boolean;
  seo: SeoMeta;
};

export type BookableOffering = {
  slug: string;
  type: "service" | "workshop";
  title: string;
  durationMinutes: number;
  timezone: string;
  priceLabel: string;
  summary: string;
  slots: BookingSlot[];
};

export type BookingSlot = {
  id: string;
  startsAt: string;
  endsAt: string;
  label: string;
  seatsRemaining?: number;
};

export type PageSection = {
  id: string;
  type: string;
  enabled: boolean;
  order: number;
  content: Record<string, unknown>;
};
