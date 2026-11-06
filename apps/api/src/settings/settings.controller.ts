import { Body, Controller, Get, Put, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { SettingsService } from "./settings.service";

@Controller()
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get("settings")
  getPublic() {
    return this.settingsService.getPublic();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("SUPER_ADMIN")
  @Put("admin/settings")
  upsert(
    @Body() body: { key: string; value: unknown },
    @Req() req: { user: { userId: string } },
  ) {
    return this.settingsService.upsert(body.key, body.value, req.user.userId);
  }
}
