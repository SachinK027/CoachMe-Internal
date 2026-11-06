import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { BookingsModule } from "./bookings/bookings.module";
import { ContentModule } from "./content/content.module";
import { EnquiriesModule } from "./enquiries/enquiries.module";
import { MailModule } from "./mail/mail.module";
import { MediaModule } from "./media/media.module";
import { PrismaModule } from "./prisma/prisma.module";
import { SettingsModule } from "./settings/settings.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    MailModule,
    AuthModule,
    ContentModule,
    BookingsModule,
    EnquiriesModule,
    MediaModule,
    SettingsModule,
  ],
})
export class AppModule {}
