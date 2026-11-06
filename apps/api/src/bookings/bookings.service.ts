import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { BookingStatus, PaymentStatus } from "@prisma/client";
import { getBookableBySlug } from "@coachme/content";
import { MailService } from "../mail/mail.service";
import { PrismaService } from "../prisma/prisma.service";
import { CreateBookingDto } from "./dto/create-booking.dto";

@Injectable()
export class BookingsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mail: MailService,
  ) {}

  async create(dto: CreateBookingDto) {
    const offering = getBookableBySlug(dto.offeringSlug);
    if (!offering) throw new BadRequestException("Unknown offering");

    const slot = offering.slots.find((item) => item.id === dto.slotId);
    if (!slot) throw new BadRequestException("Unknown slot");

    const reference = `CM-${Date.now().toString(36).toUpperCase()}`;
    const startsAt = new Date(slot.startsAt);
    const endsAt = new Date(slot.endsAt);

    try {
      const booking = await this.prisma.$transaction(async (tx) => {
        if (dto.slotId.startsWith("ws-")) {
          const session = await tx.workshopSession.findFirst({
            where: { label: slot.label },
          });
          if (session) {
            if (session.seatsRemaining <= 0) {
              throw new BadRequestException("Workshop is fully booked");
            }
            await tx.workshopSession.update({
              where: { id: session.id },
              data: { seatsRemaining: { decrement: 1 } },
            });
          }
        }

        return tx.booking.create({
          data: {
            reference,
            firstName: dto.firstName,
            lastName: dto.lastName,
            email: dto.email.toLowerCase(),
            phone: dto.phone,
            countryCode: dto.countryCode,
            jobTitle: dto.jobTitle,
            notes: dto.notes,
            termsAccepted: dto.termsAccepted,
            marketingConsent: dto.marketingConsent ?? false,
            offeringType: offering.type,
            offeringSlug: offering.slug,
            startsAt,
            endsAt,
            timezone: offering.timezone,
            durationMinutes: offering.durationMinutes,
            bookingStatus: BookingStatus.NEW,
            paymentStatus: PaymentStatus.NONE,
            history: {
              create: {
                toStatus: BookingStatus.NEW,
                note: "Booking created",
              },
            },
          },
        });
      });

      await this.mail.sendBookingConfirmation({
        to: booking.email,
        firstName: booking.firstName,
        offeringTitle: offering.title,
        startsAt,
        endsAt,
        timezone: offering.timezone,
      });

      return booking;
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      // Fallback demo response when DB is unavailable.
      const mailPreview = await this.mail.sendBookingConfirmation({
        to: dto.email,
        firstName: dto.firstName,
        offeringTitle: offering.title,
        startsAt,
        endsAt,
        timezone: offering.timezone,
      });
      return {
        id: `demo-${reference}`,
        reference,
        ...dto,
        startsAt,
        endsAt,
        bookingStatus: "NEW",
        paymentStatus: "NONE",
        demoFallback: true,
        mailPreview,
      };
    }
  }

  async list(query: {
    search?: string;
    status?: BookingStatus;
    paymentStatus?: PaymentStatus;
  }) {
    try {
      return this.prisma.booking.findMany({
        where: {
          isDeleted: false,
          ...(query.status ? { bookingStatus: query.status } : {}),
          ...(query.paymentStatus ? { paymentStatus: query.paymentStatus } : {}),
          ...(query.search
            ? {
                OR: [
                  { firstName: { contains: query.search, mode: "insensitive" } },
                  { lastName: { contains: query.search, mode: "insensitive" } },
                  { email: { contains: query.search, mode: "insensitive" } },
                  { reference: { contains: query.search, mode: "insensitive" } },
                ],
              }
            : {}),
        },
        orderBy: { createdAt: "desc" },
      });
    } catch {
      return [];
    }
  }

  async updateStatus(id: string, bookingStatus: BookingStatus, actorId?: string) {
    try {
      const existing = await this.prisma.booking.findUnique({ where: { id } });
      if (!existing) throw new NotFoundException();

      const updated = await this.prisma.booking.update({
        where: { id },
        data: {
          bookingStatus,
          history: {
            create: {
              fromStatus: existing.bookingStatus,
              toStatus: bookingStatus,
            },
          },
        },
      });

      await this.prisma.auditLog.create({
        data: {
          actorId,
          action: "BOOKING_STATUS_UPDATE",
          entityType: "Booking",
          entityId: id,
          metadata: { bookingStatus },
        },
      });

      return updated;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException("Database unavailable for booking updates");
    }
  }
}
