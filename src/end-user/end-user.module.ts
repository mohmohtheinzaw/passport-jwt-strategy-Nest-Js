import { Module } from '@nestjs/common';
import { EndUserController } from './end-user.controller';
import { SocketGateway } from 'src/socket/socket.gateway';
import { EndUserService } from './end-user.service';
import { EndUserStrategy } from 'src/auth/strategy/user.strategy';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[AuthModule],
  controllers: [EndUserController],
  providers:[EndUserService,EndUserStrategy,SocketGateway]
})
export class EndUserModule {}
