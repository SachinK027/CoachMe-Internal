import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";

export class CreateBookingDto {
  @IsString()
  offeringSlug!: string;

  @IsString()
  slotId!: string;

  @IsString()
  @MinLength(1)
  firstName!: string;

  @IsString()
  @MinLength(1)
  lastName!: string;

  @IsEmail()
  email!: string;

  @IsString()
  phone!: string;

  @IsString()
  countryCode!: string;

  @IsOptional()
  @IsString()
  jobTitle?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsBoolean()
  termsAccepted!: boolean;

  @IsOptional()
  @IsBoolean()
  marketingConsent?: boolean;
}
