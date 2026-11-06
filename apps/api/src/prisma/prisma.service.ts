import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    try {
      await this.$connect();
    } catch (error) {
      // Allow API boot without a live DB during local static demos.
      console.warn("Prisma could not connect yet. Start Postgres and run migrations when ready.", error);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
