import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AdminAuthGuard } from 'src/auth/guard/admin.guard';
import { AdminUpdateInput, FetchAdmin, OrderConfirm } from './dto/admin.dto';
import {
  Pagination,
  PaginationParams,
} from 'src/decorator/pagination.decorator';
import { CurrentAdmin, IAuthAdmin } from 'src/decorator/admin.decorator';
import { Search, SearchParam } from 'src/decorator/search.decorator';

@Controller('admin')
@ApiTags('Admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  @ApiQuery({ type: FetchAdmin })
  async fetchAll(
    @PaginationParams() pagination: Pagination,
    @SearchParam() searchParam?: Search,
  ) {
    console.log(searchParam.search);
    return this.adminService.fetchAll(pagination, searchParam.search);
  }

  @Get('/:id')
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  async findOne(@Param('id') id: string) {
    return this.adminService.findOne(id);
  }

  @Put('/:id')
  @ApiBearerAuth()
  @ApiBody({ type: AdminUpdateInput })
  @UseGuards(AdminAuthGuard)
  async update(@Param('id') id: string, dto: AdminUpdateInput) {
    return this.adminService.update(id, dto);
  }

  @Get('delete/:id')
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  async delete(@Param('id') id: string) {
    return this.adminService.delete(id);
  }

  @Put('order/confirm/:id')
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  @ApiBody({ type: OrderConfirm })
  async confirmOrder(
    @Param('id') id: string,
    @Body() dto: OrderConfirm,
    @CurrentAdmin() admin: IAuthAdmin,
  ) {
    console.log(id, dto);
    return this.adminService.approvedOrder(id, admin.id, dto);
  }
}
