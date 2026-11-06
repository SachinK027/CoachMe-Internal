import type { BlogPost } from "./types";

export const blogPosts: BlogPost[] = [
  {
    slug: "your-team-has-ideas-you-will-never-hear",
    title:
      "Your team has ideas you will never hear. And you probably believe you have built something fearless.",
    excerpt:
      "I am not sure I have ever seen a truly fearless team. I have seen many that were convinced they were one. That is not the same thing.",
    body: [
      "I am not sure I have ever seen a truly fearless team. I have seen many that were convinced they were one. That is not the same thing.",
      "The convincing ones have a perfectly recognisable face. Meetings run smoothly. Everyone agrees. No friction, no challenge, no uncomfortable pauses. The leader leaves satisfied. The team leaves relieved there were no consequences.",
      "Nobody said what they actually think. And then one day, sometimes for a slightly better salary, sometimes for a new opportunity, the ideas that never surfaced leave with the people who held them.",
      "Fearless teams are not the ones without disagreement. They are the ones where disagreement can be voiced without career risk, relationship damage, or quiet retaliation later.",
      "If your team never challenges you, the question is not whether they are aligned. The question is what they have learned it is safer not to say.",
    ],
    author: "Mirjana Radenović Ratković",
    publishedAt: "2025-06-08",
    readingTimeMinutes: 2,
    category: "Leadership",
    tags: ["teams", "psychological-safety", "leadership"],
    coverImage: "/images/blog/fearless-team.jpg",
    featured: true,
    seo: {
      title: "Your team has ideas you will never hear | CoachME Advisory",
      description:
        "Why smooth meetings and constant agreement can hide the ideas leaders most need to hear.",
    },
  },
  {
    slug: "during-a-crisis-you-discover-the-team-you-actually-built",
    title: "During a crisis, you discover the team you actually built.",
    excerpt:
      "When organizations face a crisis, most attention goes to the obvious challenges. Much less attention is given to trust — and trust can determine whether the organisation emerges stronger or weaker.",
    body: [
      "When organizations face a crisis, most attention goes to the obvious challenges: financial impact, operational disruption, customer concerns, or business continuity.",
      "Much less attention is given to something that can determine whether the organization emerges stronger or weaker from the experience: trust.",
      "Trust is interesting because it is almost invisible when everything is going well. People attend meetings. Projects move forward. Deadlines are met.",
      "Then a crisis arrives and the quality of relationships, communication and decision-making becomes impossible to hide.",
      "Crisis does not create the team culture. It reveals it. The habits built in ordinary weeks become the operating system under pressure.",
    ],
    author: "Mirjana Radenović Ratković",
    publishedAt: "2025-06-01",
    readingTimeMinutes: 2,
    category: "Teams",
    tags: ["crisis", "trust", "teams"],
    coverImage: "/images/blog/crisis-team.jpg",
    seo: {
      title: "During a crisis, you discover the team you actually built | CoachME Advisory",
      description:
        "Crisis does not create team culture — it reveals the trust and communication habits already in place.",
    },
  },
  {
    slug: "youre-watching-your-team-for-signs-of-trouble",
    title:
      "You're watching your team for signs of trouble. You might be looking in the wrong direction.",
    excerpt:
      "A leader diagnosed a communication problem. The deeper issue was his depleted Inner Operating System — and his team was where it showed up first.",
    body: [
      "I recently observed a leader with a hardworking, loyal, and capable team. Yet, he spent a lot of time frustrated, trying to figure out why they wouldn't speak up, why deliverables arrived late without warning, and why every minor decision landed back on his desk.",
      "His diagnosis: A team communication problem.",
      "My diagnosis: His depleted Inner Operating System. And his team was where it showed up first.",
      "When a leader operates beyond their capacity, the cracks don’t always appear first in their own calendar. They appear in hesitation, silence, deferred decisions and teams that stop bringing the full truth into the room.",
      "Looking only at the team can miss the system shaping how that team behaves. Sometimes the most useful place to look is the leadership load itself.",
    ],
    author: "Mirjana Radenović Ratković",
    publishedAt: "2025-05-20",
    readingTimeMinutes: 2,
    category: "Leadership",
    tags: ["leadership", "burnout", "communication"],
    coverImage: "/images/blog/inner-operating-system.jpg",
    seo: {
      title: "You're watching your team for signs of trouble | CoachME Advisory",
      description:
        "Why team symptoms can point back to leadership capacity and the leader’s Inner Operating System.",
    },
  },
];

export function getPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getFeaturedPosts() {
  return blogPosts.filter((post) => post.featured);
}

export function getRelatedPosts(slug: string, limit = 2) {
  return blogPosts.filter((post) => post.slug !== slug).slice(0, limit);
}
