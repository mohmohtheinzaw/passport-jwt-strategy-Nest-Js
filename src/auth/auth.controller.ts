import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CustomerRegister, CustomerRequest, LoginAdmin, RegisterAdmin } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { AdminAuthGuard } from './guard/admin.guard';
import { CurrentAdmin, IAuthAdmin } from 'src/decorator/admin.decorator';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}

    @Post('customer/register-request-otp')
    @ApiBody({type:CustomerRequest})
    async customerRegisterRequest(@Body() dto:CustomerRequest){
        return this.authService.registerRequestOtp(dto.phone)
    }

    @Post('customer/login-request-otp')
    @ApiBody({type:CustomerRequest})
    async customerLoginRequest(@Body() dto:CustomerRequest){
        return this.authService.loginRequestOtp(dto.phone)
    }

    @Post('customer/register')
    @ApiBody({type:CustomerRegister})
    async registerCustomer(@Body() dto:CustomerRegister){
        return this.authService.registerCustomer(dto)
    }

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
        console.log(admin.id)
        return this.authService.validateAdmin(admin.id)
    }


}
