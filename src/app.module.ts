import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { AdminService } from './admin/admin.service';
import { AdminModule } from './admin/admin.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';
import { EndUserService } from './end-user/end-user.service';
import { SocketGateway } from './socket/socket.gateway';
import { EndUserModule } from './end-user/end-user.module';
import { EndUserStrategy } from './auth/strategy/user.strategy';
import { PaginationService } from './pagination/pagination.service';
import { PaginationModule } from './pagination/pagination.module';
import { NotificationService } from './notification/notification.service';

@Module({
  imports: [AuthModule, AdminModule,PrismaModule,EndUserModule, PaginationModule],
  controllers: [AppController],
  providers: [AppService, AuthService, AdminService,PrismaService,JwtService, EndUserService,SocketGateway, PaginationService, NotificationService],
})
export class AppModule {}
