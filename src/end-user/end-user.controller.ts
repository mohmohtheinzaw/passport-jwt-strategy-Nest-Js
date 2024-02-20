import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { EndUserService } from './end-user.service';
import { CreateOrder } from './dto/end-user.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { UserAuthGuard } from 'src/auth/guard/user.guard';
import { CurrentUser, IAuthUser } from 'src/decorator/user.decorator';
@ApiTags('End User')
@Controller('end-user')
export class EndUserController {
    constructor(private readonly endUserService:EndUserService){}

    @Post('order')
    @ApiBearerAuth()
    @UseGuards(UserAuthGuard)
    @ApiBody({type:CreateOrder})
    async createOrder(@Body() dto:CreateOrder,@CurrentUser() user:IAuthUser){
        return this.endUserService.createOrder(user.id,dto)
    }


}
