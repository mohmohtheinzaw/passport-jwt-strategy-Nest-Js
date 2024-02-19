import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginAdmin, RegisterAdmin } from './dto/admin.dto';
import { AuthService } from './auth.service';
import { AdminAuthGuard } from './guard/admin.guard';
import { CurrentAdmin, IAuthAdmin } from 'src/decorator/admin.decorator';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}

    @Post('admin/register')
    @ApiBody({type:RegisterAdmin})
    async register(@Body() dto:RegisterAdmin){
        return this.authService.registerAdmin(dto)
    }

    @Post('admin/login')
    @ApiBody({type:LoginAdmin})
    async login(@Body() dto:LoginAdmin){
        return this.authService.loginAdmin(dto.email,dto.password)
    }

    @Get('admin/validate')
    @ApiBearerAuth()
    @UseGuards(AdminAuthGuard)
    async validate(@CurrentAdmin() admin:IAuthAdmin){
        return this.authService.validateAdmin(admin.id)
    }
}
