import { Injectable, Logger } from "@nestjs/common";
import { createEvent } from "ics";
import nodemailer from "nodemailer";

type BookingMailInput = {
  to: string;
  firstName: string;
  offeringTitle: string;
  startsAt: Date;
  endsAt: Date;
  timezone: string;
};

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  private transporter() {
    if (!process.env.SMTP_HOST) return null;
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: process.env.SMTP_USER
        ? {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          }
        : undefined,
    });
  }

  buildIcs(input: BookingMailInput) {
    const start = [
      input.startsAt.getUTCFullYear(),
      input.startsAt.getUTCMonth() + 1,
      input.startsAt.getUTCDate(),
      input.startsAt.getUTCHours(),
      input.startsAt.getUTCMinutes(),
    ] as [number, number, number, number, number];

    const durationMinutes = Math.max(
      15,
      Math.round((input.endsAt.getTime() - input.startsAt.getTime()) / 60000),
    );

    const { error, value } = createEvent({
      title: input.offeringTitle,
      description: `CoachME Advisory booking for ${input.firstName}`,
      start,
      startInputType: "utc",
      duration: { minutes: durationMinutes },
      status: "CONFIRMED",
      busyStatus: "BUSY",
    });

    if (error) {
      this.logger.warn(`ICS generation failed: ${error.message}`);
      return null;
    }
    return value || null;
  }

  async sendBookingConfirmation(input: BookingMailInput) {
    const transporter = this.transporter();
    const ics = this.buildIcs(input);
    const subject = `Booking request received — ${input.offeringTitle}`;
    const text = [
      `Hello ${input.firstName},`,
      "",
      `We received your booking request for ${input.offeringTitle}.`,
      `Session: ${input.startsAt.toISOString()} (${input.timezone})`,
      "",
      "CoachME Advisory",
    ].join("\n");

    if (!transporter) {
      this.logger.log(`SMTP not configured. Would email ${input.to}: ${subject}`);
      return { queued: false, preview: text, icsAttached: Boolean(ics) };
    }

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: input.to,
      subject,
      text,
      attachments: ics
        ? [
            {
              filename: "coachme-booking.ics",
              content: ics,
              contentType: "text/calendar",
            },
          ]
        : [],
    });

    return { queued: true, icsAttached: Boolean(ics) };
  }
}
