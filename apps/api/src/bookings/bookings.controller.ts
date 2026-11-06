import { Body, Controller, Get, Param, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { BookingStatus, PaymentStatus } from "@prisma/client";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { BookingsService } from "./bookings.service";
import { CreateBookingDto } from "./dto/create-booking.dto";

@Controller()
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post("bookings")
  create(@Body() body: CreateBookingDto) {
    return this.bookingsService.create(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("SUPER_ADMIN", "BOOKING_MANAGER")
  @Get("admin/bookings")
  list(
    @Query("search") search?: string,
    @Query("status") status?: BookingStatus,
    @Query("paymentStatus") paymentStatus?: PaymentStatus,
  ) {
    return this.bookingsService.list({ search, status, paymentStatus });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("SUPER_ADMIN", "BOOKING_MANAGER")
  @Put("admin/bookings/:id")
  update(
    @Param("id") id: string,
    @Body() body: { bookingStatus: BookingStatus },
    @Req() req: { user: { userId: string } },
  ) {
    return this.bookingsService.updateStatus(id, body.bookingStatus, req.user.userId);
  }
}
