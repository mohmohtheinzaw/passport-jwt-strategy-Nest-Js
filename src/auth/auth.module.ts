import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { AdminStrategy } from './strategy/admin.strategy';
import { EndUserModule } from 'src/end-user/end-user.module';
@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtService, AdminStrategy],
  exports:[AuthService,JwtService]
})
export class AuthModule {}
