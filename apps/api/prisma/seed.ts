import {
  blogPosts,
  bookableOfferings,
  services,
  siteSettings,
  workshops,
} from "@coachme/content";
import { PrismaClient, RoleName, WorkshopFormat } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const permissions = [
    { key: "manage_admins", label: "Manage administrators" },
    { key: "manage_content", label: "Manage website content" },
    { key: "manage_bookings", label: "Manage bookings" },
    { key: "manage_settings", label: "Manage settings" },
    { key: "view_audit", label: "View audit logs" },
  ];

  for (const permission of permissions) {
    await prisma.permission.upsert({
      where: { key: permission.key },
      create: permission,
      update: permission,
    });
  }

  const allPermissions = await prisma.permission.findMany();

  const roles: { name: RoleName; keys: string[] }[] = [
    {
      name: "SUPER_ADMIN",
      keys: permissions.map((item) => item.key),
    },
    {
      name: "CONTENT_MANAGER",
      keys: ["manage_content"],
    },
    {
      name: "BOOKING_MANAGER",
      keys: ["manage_bookings"],
    },
  ];

  for (const role of roles) {
    const row = await prisma.role.upsert({
      where: { name: role.name },
      create: { name: role.name, description: role.name },
      update: {},
    });

    for (const key of role.keys) {
      const permission = allPermissions.find((item) => item.key === key);
      if (!permission) continue;
      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId: {
            roleId: row.id,
            permissionId: permission.id,
          },
        },
        create: { roleId: row.id, permissionId: permission.id },
        update: {},
      });
    }
  }

  const superAdminRole = await prisma.role.findUniqueOrThrow({
    where: { name: "SUPER_ADMIN" },
  });

  const email = (process.env.SEED_ADMIN_EMAIL || "admin@coachme-advisory.com").toLowerCase();
  const password = process.env.SEED_ADMIN_PASSWORD || "ChangeMe123!";
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.adminUser.upsert({
    where: { email },
    create: {
      email,
      name: "CoachME Super Admin",
      passwordHash,
      roleId: superAdminRole.id,
    },
    update: {
      passwordHash,
      roleId: superAdminRole.id,
      isActive: true,
    },
  });

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      create: {
        slug: service.slug,
        title: service.title,
        shortDescription: service.shortDescription,
        heroDescription: service.heroDescription,
        audience: service.audience,
        challenges: service.challenges,
        benefits: service.benefits,
        approach: service.approach,
        faq: service.faq,
        duration: service.duration,
        priceLabel: service.priceLabel,
        priceNote: service.priceNote,
        isComplimentary: Boolean(service.isComplimentary),
        bookable: service.bookable,
        imageUrl: service.image,
        relatedSlugs: service.relatedSlugs,
        seoTitle: service.seo.title,
        seoDescription: service.seo.description,
        displayOrder: service.displayOrder,
        status: "PUBLISHED",
        publishedAt: new Date(),
      },
      update: {
        title: service.title,
        shortDescription: service.shortDescription,
        heroDescription: service.heroDescription,
      },
    });
  }

  for (const workshop of workshops) {
    const row = await prisma.workshop.upsert({
      where: { slug: workshop.slug },
      create: {
        slug: workshop.slug,
        title: workshop.title,
        language: workshop.language,
        format: workshop.format === "Online" ? WorkshopFormat.ONLINE : WorkshopFormat.IN_PERSON,
        shortDescription: workshop.shortDescription,
        description: workshop.description,
        learningOutcomes: workshop.learningOutcomes,
        audience: workshop.audience,
        facilitator: workshop.facilitator,
        startDate: new Date(workshop.startDate),
        endDate: new Date(workshop.endDate),
        timeLabel: workshop.timeLabel,
        timezone: workshop.timezone,
        duration: workshop.duration,
        price: workshop.price,
        currency: workshop.currency,
        priceNote: workshop.priceNote,
        maxParticipants: workshop.maxParticipants,
        cancellationPolicy: workshop.cancellationPolicy,
        imageUrl: workshop.image,
        seoTitle: workshop.seo.title,
        seoDescription: workshop.seo.description,
        status: "PUBLISHED",
        publishedAt: new Date(),
      },
      update: {
        title: workshop.title,
        description: workshop.description,
      },
    });

    const offering = bookableOfferings.find((item) => item.slug === workshop.slug);
    if (offering) {
      for (const slot of offering.slots) {
        const existing = await prisma.workshopSession.findFirst({
          where: { workshopId: row.id, label: slot.label },
        });
        if (!existing) {
          await prisma.workshopSession.create({
            data: {
              workshopId: row.id,
              startsAt: new Date(slot.startsAt),
              endsAt: new Date(slot.endsAt),
              label: slot.label,
              capacity: workshop.maxParticipants,
              seatsRemaining: slot.seatsRemaining ?? workshop.maxParticipants,
            },
          });
        }
      }
    }
  }

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      create: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        body: post.body.join("\n\n"),
        authorName: post.author,
        coverImageUrl: post.coverImage,
        readingMinutes: post.readingTimeMinutes,
        featured: Boolean(post.featured),
        status: "PUBLISHED",
        seoTitle: post.seo.title,
        seoDescription: post.seo.description,
        publishedAt: new Date(post.publishedAt),
      },
      update: {
        title: post.title,
        excerpt: post.excerpt,
        body: post.body.join("\n\n"),
      },
    });
  }

  await prisma.websiteSetting.upsert({
    where: { key: "site" },
    create: { key: "site", value: siteSettings },
    update: { value: siteSettings },
  });

  // Example weekly availability rule for intro calls (model C).
  const existingRule = await prisma.availabilityRule.findFirst({
    where: { offeringSlug: "strategic-introduction-call", weekday: 1 },
  });
  if (!existingRule) {
    await prisma.availabilityRule.create({
      data: {
        offeringSlug: "strategic-introduction-call",
        weekday: 1,
        startTime: "10:00",
        endTime: "16:00",
        timezone: "Asia/Dubai",
        slotMinutes: 30,
      },
    });
  }

  console.log("Seed complete.");
  console.log(`Admin login: ${email} / ${password}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
