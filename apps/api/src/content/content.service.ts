import { Injectable } from "@nestjs/common";
import {
  blogPosts,
  getPostBySlug,
  getServiceBySlug,
  getWorkshopBySlug,
  services,
  workshops,
} from "@coachme/content";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ContentService {
  constructor(private readonly prisma: PrismaService) {}

  async listServices() {
    try {
      const rows = await this.prisma.service.findMany({
        where: { isDeleted: false, status: "PUBLISHED" },
        orderBy: { displayOrder: "asc" },
      });
      if (rows.length) return rows;
    } catch {
      // fall through to static content
    }
    return services;
  }

  async getService(slug: string) {
    try {
      const row = await this.prisma.service.findFirst({
        where: { slug, isDeleted: false, status: "PUBLISHED" },
      });
      if (row) return row;
    } catch {
      // fall through
    }
    return getServiceBySlug(slug) ?? null;
  }

  async listWorkshops() {
    try {
      const rows = await this.prisma.workshop.findMany({
        where: { isDeleted: false, status: "PUBLISHED" },
        include: { sessions: true },
        orderBy: { startDate: "asc" },
      });
      if (rows.length) return rows;
    } catch {
      // fall through
    }
    return workshops;
  }

  async getWorkshop(slug: string) {
    try {
      const row = await this.prisma.workshop.findFirst({
        where: { slug, isDeleted: false, status: "PUBLISHED" },
        include: { sessions: true },
      });
      if (row) return row;
    } catch {
      // fall through
    }
    return getWorkshopBySlug(slug) ?? null;
  }

  async listBlogs() {
    try {
      const rows = await this.prisma.blogPost.findMany({
        where: { isDeleted: false, status: "PUBLISHED" },
        orderBy: { publishedAt: "desc" },
      });
      if (rows.length) return rows;
    } catch {
      // fall through
    }
    return blogPosts;
  }

  async getBlog(slug: string) {
    try {
      const row = await this.prisma.blogPost.findFirst({
        where: { slug, isDeleted: false, status: "PUBLISHED" },
      });
      if (row) return row;
    } catch {
      // fall through
    }
    return getPostBySlug(slug) ?? null;
  }

  async dashboardStats() {
    try {
      const [enquiries, bookings, workshopsCount, publishedPosts, draftPosts, servicesCount] =
        await Promise.all([
          this.prisma.enquiry.count({ where: { isDeleted: false } }),
          this.prisma.booking.count({ where: { isDeleted: false } }),
          this.prisma.workshop.count({ where: { isDeleted: false, status: "PUBLISHED" } }),
          this.prisma.blogPost.count({ where: { isDeleted: false, status: "PUBLISHED" } }),
          this.prisma.blogPost.count({ where: { isDeleted: false, status: "DRAFT" } }),
          this.prisma.service.count({ where: { isDeleted: false, status: "PUBLISHED" } }),
        ]);

      return {
        enquiries,
        bookings,
        upcomingWorkshops: workshopsCount,
        publishedPosts,
        draftPosts,
        activeServices: servicesCount,
      };
    } catch {
      return {
        enquiries: 0,
        bookings: 0,
        upcomingWorkshops: workshops.length,
        publishedPosts: blogPosts.length,
        draftPosts: 0,
        activeServices: services.length,
        source: "static-fallback",
      };
    }
  }
}
