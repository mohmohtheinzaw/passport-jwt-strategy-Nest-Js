import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { EndUserService } from './end-user.service';
import { CreateOrder } from './dto/end-user.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { UserAuthGuard } from 'src/auth/guard/user.guard';
import { CurrentUser, IAuthUser } from 'src/decorator/user.decorator';
@ApiTags('End User')
@Controller('end-user')
export class EndUserController {
  constructor(private readonly endUserService: EndUserService) {}

  @Post('order')
  @ApiBearerAuth()
  @UseGuards(UserAuthGuard)
  @ApiBody({ type: CreateOrder })
  async createOrder(@Body() dto: CreateOrder, @CurrentUser() user: IAuthUser) {
    return this.endUserService.createOrder(user.id, dto);
  }

  @Get('order')
  @ApiBearerAuth()
  @UseGuards(UserAuthGuard)
  async fetchOrder(@CurrentUser() user: IAuthUser) {
    return this.endUserService.fetchOrder(user.id);
  }

  @Put('order/cancel/:id')
  @ApiBearerAuth()
  @UseGuards(UserAuthGuard)
  async cancelOrder(@Param('id') id: string) {
    return this.endUserService.cancelOrder(id);
  }
}
