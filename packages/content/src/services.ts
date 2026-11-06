import type { Service } from "./types";

export const services: Service[] = [
  {
    slug: "strategic-introduction-call",
    title: "Strategic Introduction Call",
    shortDescription:
      "A focused first conversation to understand what support would help most.",
    heroDescription:
      "This complimentary 30-minute conversation is designed to understand where you are now, what feels heavy, unclear, or stuck, and what kind of support would be most valuable.",
    audience:
      "Business owners, executives, managers and professionals exploring whether private advisory support is the right next step.",
    challenges: [
      "Pressure and leadership challenges",
      "Career decisions and communication issues",
      "Burnout warning signs",
      "The feeling that something needs to change",
    ],
    benefits: [
      "More clarity on your situation",
      "Honest assessment of whether advisory support is the right next step",
      "No pressure and no hard sell",
    ],
    approach: [
      "Online via Zoom",
      "Focused 30-minute conversation",
      "Explore challenges, priorities and the right approach",
    ],
    faq: [
      {
        question: "Is this call free?",
        answer:
          "Yes. The Strategic Introduction Call is a complimentary 30-minute conversation.",
      },
      {
        question: "How is it delivered?",
        answer: "Online via Zoom.",
      },
    ],
    duration: "30 min",
    priceLabel: "Complimentary",
    isComplimentary: true,
    bookable: true,
    image: "/images/services/intro-call.jpg",
    relatedSlugs: ["1-1-exclusive-advisory", "teams-advisory-workshops"],
    seo: {
      title: "Strategic Introduction Call | CoachME Advisory",
      description:
        "A complimentary 30-minute conversation to understand your challenges and explore the right advisory approach.",
    },
    displayOrder: 1,
  },
  {
    slug: "business-operations-advisory",
    title: "Business Operations Advisory",
    shortDescription:
      "Clearer processes. Better project control. Stronger business performance.",
    heroDescription:
      "At CoachME Advisory, we help businesses bring greater structure, clarity and visibility to their operations, without adding unnecessary complexity.",
    audience:
      "Businesses looking to improve processes, project visibility and operational efficiency — especially smaller organisations facing operational complexity without dedicated specialist teams.",
    challenges: [
      "Unclear processes and workflow bottlenecks",
      "Limited project visibility and reporting",
      "Resource planning and utilisation pressure",
      "Unclear roles, responsibilities and decision ownership",
      "Systems that no longer support how the business works",
    ],
    benefits: [
      "Clearer processes and workflows",
      "Stronger project tracking and management oversight",
      "Improved resource planning and utilisation",
      "Clearer accountability and decision-making",
      "Better information flow and management reporting",
    ],
    approach: [
      "Business Processes & Workflows – reviewing existing processes, identifying bottlenecks and improving how work moves across teams.",
      "Project Management & Visibility – strengthening project tracking, progress monitoring, reporting and management oversight.",
      "Resource Planning & Utilisation – improving how resources are planned, allocated and monitored.",
      "Roles & Responsibilities – clarifying accountability, decision-making and ownership.",
      "Operational Systems & Reporting – reviewing how tools support daily operations and management reporting.",
      "Every engagement is tailored to the business, its priorities and its stage of development.",
    ],
    faq: [
      {
        question: "How do we start?",
        answer:
          "Book a Strategic Introduction Call to discuss your business challenges and explore how we can work together.",
      },
    ],
    bookable: false,
    image: "/images/services/operations.jpg",
    relatedSlugs: ["strategic-introduction-call", "teams-advisory-workshops"],
    seo: {
      title: "Business Operations Advisory | CoachME Advisory",
      description:
        "Advisory for clearer processes, better project control and stronger business performance.",
    },
    displayOrder: 2,
  },
  {
    slug: "teams-advisory-workshops",
    title: "Teams Advisory & Workshops",
    shortDescription:
      "Stronger teams. Clearer communication. Better results.",
    heroDescription:
      "Designed for organizations, leadership teams, and departments where performance matters, but communication gaps, tension, unclear ownership, or pressure are slowing results.",
    audience:
      "Organisations seeking stronger leadership, communication and team performance.",
    challenges: [
      "Communication gaps and unspoken friction",
      "Accountability and ownership issues",
      "Psychological safety and trust",
      "Conflict under pressure",
      "Change and transition strain",
    ],
    benefits: [
      "Stronger leadership communication",
      "Healthier feedback culture",
      "Clearer accountability and ownership",
      "Better cross-functional collaboration",
      "More professional conflict handling",
      "Stronger performance under pressure",
    ],
    approach: [
      "Every engagement begins with a Team System Scan to understand current dynamics, bottlenecks, communication patterns, leadership pressure points, and hidden friction.",
      "Support may include leadership communication training, feedback culture development, psychological safety and trust, accountability and ownership, cross-functional collaboration, managing conflict professionally, high-pressure team performance, change and transition support, and workshops for managers and future leaders.",
      "Programs are tailored to your business reality and can be delivered online or in person in the UAE or internationally.",
    ],
    faq: [
      {
        question: "Where are workshops delivered?",
        answer:
          "Programs can be delivered online or in person in the UAE or internationally.",
      },
    ],
    bookable: false,
    image: "/images/services/teams.jpg",
    relatedSlugs: ["strategic-introduction-call", "1-1-exclusive-advisory"],
    seo: {
      title: "Teams Advisory & Workshops | CoachME Advisory",
      description:
        "Team advisory and workshops focused on communication, accountability and performance.",
    },
    displayOrder: 3,
  },
  {
    slug: "1-1-exclusive-advisory",
    title: "1:1 Exclusive Advisory",
    shortDescription:
      "For experienced professionals carrying pressure, responsibility, and high expectations.",
    heroDescription:
      "An 8-week private advisory experience for high-performing professionals, leaders, founders, and responsible people who carry a lot but rarely have space to think clearly for themselves.",
    audience:
      "Experienced professionals navigating complex decisions, communication and leadership challenges.",
    challenges: [
      "Leadership pressure",
      "Career transition or next-level growth",
      "Burnout warning signs",
      "Team or relationship tension",
      "Identity fatigue from always being “the strong one”",
      "Success that no longer feels good",
    ],
    benefits: [
      "Clearer thinking and better decisions",
      "Reduced internal pressure",
      "Stronger communication and boundaries without guilt",
      "More confidence in leadership situations",
      "Emotional steadiness during demanding periods",
      "Renewed energy and direction",
      "Success that feels more sustainable",
    ],
    approach: [
      "Using the INP Framework (Identify, Navigate, Perform), we combine strategic reflection, practical tools, and deep mindset work.",
      "Format: 8 weeks | Private 1:1 sessions | Online | Confidential | Tailored to your situation.",
      "This is not therapy and not generic coaching. It is a private, high-level advisory space for capable people who want results without losing themselves in the process.",
    ],
    faq: [
      {
        question: "What is the investment?",
        answer: "8,000 AED, payable in two instalments.",
      },
      {
        question: "How long is the engagement?",
        answer: "8 weeks of private 1:1 sessions, delivered online.",
      },
    ],
    duration: "8 weeks",
    priceLabel: "8,000 AED",
    priceNote: "Payable in two instalments",
    bookable: true,
    image: "/images/services/one-to-one.jpg",
    relatedSlugs: ["strategic-introduction-call", "teams-advisory-workshops"],
    seo: {
      title: "1:1 Exclusive Advisory | CoachME Advisory",
      description:
        "An 8-week private advisory experience for professionals carrying pressure, responsibility and high expectations.",
    },
    displayOrder: 4,
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getRelatedServices(slugs: string[]) {
  return services.filter((service) => slugs.includes(service.slug));
}
