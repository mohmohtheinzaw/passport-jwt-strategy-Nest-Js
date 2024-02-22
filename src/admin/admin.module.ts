import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { SocketGateway } from 'src/socket/socket.gateway';
@Module({
  controllers: [AdminController],
  providers: [AdminService, SocketGateway],
})
export class AdminModule {}
