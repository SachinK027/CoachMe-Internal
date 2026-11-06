import { Controller, Get, NotFoundException, Param, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { ContentService } from "./content.service";

@Controller()
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get("services")
  listServices() {
    return this.contentService.listServices();
  }

  @Get("services/:slug")
  async getService(@Param("slug") slug: string) {
    const service = await this.contentService.getService(slug);
    if (!service) throw new NotFoundException();
    return service;
  }

  @Get("workshops")
  listWorkshops() {
    return this.contentService.listWorkshops();
  }

  @Get("workshops/:slug")
  async getWorkshop(@Param("slug") slug: string) {
    const workshop = await this.contentService.getWorkshop(slug);
    if (!workshop) throw new NotFoundException();
    return workshop;
  }

  @Get("blogs")
  listBlogs() {
    return this.contentService.listBlogs();
  }

  @Get("blogs/:slug")
  async getBlog(@Param("slug") slug: string) {
    const post = await this.contentService.getBlog(slug);
    if (!post) throw new NotFoundException();
    return post;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("SUPER_ADMIN", "CONTENT_MANAGER", "BOOKING_MANAGER")
  @Get("admin/dashboard")
  dashboard() {
    return this.contentService.dashboardStats();
  }
}
