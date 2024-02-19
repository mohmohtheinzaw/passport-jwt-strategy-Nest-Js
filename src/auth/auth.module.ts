import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { AdminStrategy } from './strategy/admin.strategy';
@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtService, AdminStrategy],
})
export class AuthModule {}
