import type { NavItem, SiteSettings, StatItem } from "./types";

export const siteSettings: SiteSettings = {
  name: "CoachME Advisory",
  legalName: "CoachME FZ-LLC",
  tagline: "Private advisory for leaders and teams. We diagnose first. Then we intervene.",
  email: "office@coachme-advisory.com",
  location: "Ras Al Khaimah, United Arab Emirates",
  social: {
    linkedin: "https://linkedin.com/company/coachme-advisory",
    instagram: "https://instagram.com/coachme.advisory",
    youtube: "https://youtube.com/@coachmebymirjana",
  },
  copyright: "© CoachME FZ-LLC. All rights reserved.",
  video: {
    title: "Introduction to CoachME Advisory",
    thumbnail: "/images/hero-founder.jpg",
    embedUrl: undefined,
  },
};

export const navigation: NavItem[] = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Meet the Founder", href: "/about" },
      { label: "Our Approach", href: "/about/our-approach" },
      { label: "INP Method", href: "/about/inp-method" },
    ],
  },
  { label: "Services", href: "/services" },
  { label: "Workshops", href: "/workshops" },
  { label: "Insights", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  explore: [
    { label: "About", href: "/about" },
    { label: "Our Approach", href: "/about/our-approach" },
    { label: "INP Method", href: "/about/inp-method" },
    { label: "Insights", href: "/blog" },
  ],
  services: [
    { label: "Strategic Introduction Call", href: "/services/strategic-introduction-call" },
    { label: "Business Operations Advisory", href: "/services/business-operations-advisory" },
    { label: "Teams Advisory & Workshops", href: "/services/teams-advisory-workshops" },
    { label: "1:1 Exclusive Advisory", href: "/services/1-1-exclusive-advisory" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
  ],
};

export const verifiedStats: StatItem[] = [
  {
    label: "Years of Experience",
    value: "20+",
    sourceNote: "Published on coachme-advisory.com",
  },
  {
    label: "Recognition",
    value: "Top 100",
    sourceNote: "Top 100 foreign nationals Abu Dhabi 2018",
  },
];

export const inpMethod = [
  {
    step: "01",
    title: "Identify",
    summary: "Understand what's happening, what's not working and why.",
    detail:
      "We examine what blocks clarity and progress — looking beyond surface symptoms to the systems, communication patterns and decisions shaping performance.",
  },
  {
    step: "02",
    title: "Navigate",
    summary: "Define practical changes to processes, communication and ways of working.",
    detail:
      "We define practical shifts in communication, processes and decision-making that fit how your organisation actually works.",
  },
  {
    step: "03",
    title: "Perform",
    summary: "Put improvements into practice and strengthen performance over time.",
    detail:
      "We put improvements into practice so people and businesses can create stronger results with less friction — and sustain them.",
  },
];

export const founder = {
  name: "Mirjana Radenović Ratković",
  role: "Founder, CoachME Advisory",
  credentials: "MSc in Communication Sciences",
  image: "/images/founder.jpg",
  shortBio:
    "With more than two decades of international experience in business operations, resource planning, project governance and leadership, combined with a Master's degree in Communication Sciences, I bring both operational insight and an understanding of the people behind business performance.",
  story: [
    "I have seen businesses with talented people, experienced managers and strong client relationships struggle despite everyone's best efforts.",
    "Not because people weren't working hard enough. And not necessarily because management wasn't doing enough.",
    "Running a business is complex. What works at one stage may become less effective as the business evolves. New demands emerge, priorities shift, and even well-established ways of working can produce unexpected challenges.",
    "When things don't work, the first instinct is often to look at the people. Who made the mistake? Who didn't communicate? Who failed to deliver?",
    "But what if the problem isn't the person? What if the way the work is organised is making it harder for capable people to succeed?",
    "Over more than two decades working across Europe and the Middle East, in business operations, resource planning, project governance and leadership, I have learned to look beyond the immediate problem.",
    "My Master's degree in Communication Sciences and research into leadership, burnout and workplace dynamics added another dimension to that experience: understanding how people think, communicate and make decisions within the systems they work in.",
    "That combination changed the way I look at business performance.",
    "A delayed project is not always a project management problem. A communication breakdown is not always a communication problem. And a struggling team is not necessarily a team that needs training. Sometimes the answer lies somewhere entirely different.",
    "This is why I founded CoachME Advisory. I wanted to create a space where business owners, executives and managers could look at their challenges without assumptions, unnecessary complexity or ready-made solutions.",
    "My approach is built around a simple principle: understand first, then act. Through the INP Method we examine what is happening, identify what needs to change and work towards practical improvements that can be sustained.",
    "I don't believe every business needs more people, more meetings or more systems. Sometimes, it needs a better way of using what it already has.",
    "I believe businesses perform better when people, processes and decisions work together — and my mission is to help make that happen.",
  ],
  advisoryProcess: [
    {
      title: "Strategic Introduction Call",
      description:
        "An initial conversation to understand your challenges, priorities and what you want to achieve.",
    },
    {
      title: "Diagnostic Deep Dive",
      description:
        "We examine what's happening, identify underlying causes and determine where change is needed.",
    },
    {
      title: "Focused Advisory Work",
      description:
        "We develop and implement practical improvements tailored to your needs, priorities and way of working.",
    },
  ],
};

export const homepage = {
  hero: {
    brand: "CoachME Advisory",
    headline: "Better leadership. Clearer decisions. Stronger performance.",
    supporting:
      "Private advisory for leaders and teams navigating complexity, pressure and change.",
    primaryCta: { label: "Explore Our Approach", href: "/about/our-approach" },
    secondaryCta: { label: "Book an Introduction Call", href: "/booking/strategic-introduction-call" },
    image: "/images/hero-founder.jpg",
  },
  brandIntro: {
    eyebrow: "What we do",
    headline: "Business advisory for leaders, teams and businesses.",
    body: "We diagnose first. Then we intervene. No generic programs, no surface-level fixes.",
    supporting:
      "For leaders who carry a lot. For teams that need to work better together.",
  },
  finalCta: {
    headline: "Start with a focused conversation.",
    body: "A complimentary Strategic Introduction Call to understand where you are and what support would help most.",
    cta: { label: "Book an Introduction Call", href: "/booking/strategic-introduction-call" },
  },
};
