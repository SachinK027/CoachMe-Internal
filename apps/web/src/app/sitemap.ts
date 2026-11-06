import type { MetadataRoute } from "next";
import { blogPosts, services, workshops } from "@coachme/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "http://localhost:3000";
  const staticRoutes = [
    "",
    "/about",
    "/about/our-approach",
    "/about/inp-method",
    "/services",
    "/workshops",
    "/blog",
    "/contact",
    "/privacy-policy",
    "/terms-and-conditions",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${base}${route}`,
      lastModified: new Date(),
    })),
    ...services.map((service) => ({
      url: `${base}/services/${service.slug}`,
      lastModified: new Date(),
    })),
    ...workshops.map((workshop) => ({
      url: `${base}/workshops/${workshop.slug}`,
      lastModified: new Date(),
    })),
    ...blogPosts.map((post) => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
    })),
  ];
}
