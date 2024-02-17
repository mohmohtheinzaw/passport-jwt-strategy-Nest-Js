import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { AdminService } from './admin/admin.service';
import { AdminModule } from './admin/admin.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [AuthModule, AdminModule],
  controllers: [AppController],
  providers: [AppService, AuthService, AdminService,PrismaService],
})
export class AppModule {}
