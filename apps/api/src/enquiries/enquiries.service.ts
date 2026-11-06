import { Injectable } from "@nestjs/common";
import { EnquiryStatus } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class EnquiriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
  }) {
    try {
      return await this.prisma.enquiry.create({ data: input });
    } catch {
      return { id: `demo-${Date.now()}`, ...input, status: "NEW", demoFallback: true };
    }
  }

  async list() {
    try {
      return await this.prisma.enquiry.findMany({
        where: { isDeleted: false },
        orderBy: { createdAt: "desc" },
      });
    } catch {
      return [];
    }
  }

  async updateStatus(id: string, status: EnquiryStatus) {
    return this.prisma.enquiry.update({
      where: { id },
      data: { status },
    });
  }
}
