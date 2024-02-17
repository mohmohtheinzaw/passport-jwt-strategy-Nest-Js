import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { RegisterAdmin } from './dto/admin.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('Admin')
export class AuthController {
    private readonly authService:AuthService
    @Post('')
    @ApiBody({type:RegisterAdmin})
    async register(@Body() dto:RegisterAdmin){
        return this.authService.registerAdmin(dto)
    }
}
