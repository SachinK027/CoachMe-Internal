import { Injectable } from "@nestjs/common";
import { promises as fs } from "fs";
import path from "path";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class MediaService {
  constructor(private readonly prisma: PrismaService) {}

  private uploadRoot() {
    return path.resolve(process.env.UPLOAD_DIR || "./uploads");
  }

  async list() {
    try {
      return await this.prisma.mediaAsset.findMany({
        where: { isDeleted: false },
        orderBy: { createdAt: "desc" },
      });
    } catch {
      return [];
    }
  }

  async saveUpload(file: Express.Multer.File, folder = "general") {
    const root = this.uploadRoot();
    await fs.mkdir(path.join(root, folder), { recursive: true });
    const filename = `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`;
    const fullPath = path.join(root, folder, filename);
    await fs.writeFile(fullPath, file.buffer);
    const url = `/uploads/${folder}/${filename}`;

    try {
      return await this.prisma.mediaAsset.create({
        data: {
          filename,
          originalName: file.originalname,
          mimeType: file.mimetype,
          sizeBytes: file.size,
          url,
          folder,
        },
      });
    } catch {
      return {
        id: `demo-${Date.now()}`,
        filename,
        originalName: file.originalname,
        mimeType: file.mimetype,
        sizeBytes: file.size,
        url,
        folder,
        demoFallback: true,
      };
    }
  }
}
