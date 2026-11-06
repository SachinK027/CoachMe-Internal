import { Injectable } from "@nestjs/common";
import { siteSettings } from "@coachme/content";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaService) {}

  async getPublic() {
    try {
      const rows = await this.prisma.websiteSetting.findMany();
      if (!rows.length) return siteSettings;
      return Object.fromEntries(rows.map((row) => [row.key, row.value]));
    } catch {
      return siteSettings;
    }
  }

  async upsert(key: string, value: unknown, actorId?: string) {
    const row = await this.prisma.websiteSetting.upsert({
      where: { key },
      create: { key, value: value as object },
      update: { value: value as object },
    });
    await this.prisma.auditLog.create({
      data: {
        actorId,
        action: "SETTINGS_UPDATE",
        entityType: "WebsiteSetting",
        entityId: row.id,
        metadata: { key },
      },
    });
    return row;
  }
}
