import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { EnquiryStatus } from "@prisma/client";
import { IsEmail, IsString, MinLength } from "class-validator";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { EnquiriesService } from "./enquiries.service";

class CreateEnquiryDto {
  @IsString()
  @MinLength(1)
  firstName!: string;

  @IsString()
  @MinLength(1)
  lastName!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(1)
  message!: string;
}

@Controller()
export class EnquiriesController {
  constructor(private readonly enquiriesService: EnquiriesService) {}

  @Post("enquiries")
  create(@Body() body: CreateEnquiryDto) {
    return this.enquiriesService.create(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("SUPER_ADMIN", "BOOKING_MANAGER", "CONTENT_MANAGER")
  @Get("admin/enquiries")
  list() {
    return this.enquiriesService.list();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("SUPER_ADMIN", "BOOKING_MANAGER")
  @Put("admin/enquiries/:id")
  update(@Param("id") id: string, @Body() body: { status: EnquiryStatus }) {
    return this.enquiriesService.updateStatus(id, body.status);
  }
}
