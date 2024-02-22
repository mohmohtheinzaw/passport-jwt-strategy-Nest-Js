import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
@WebSocketGateway(parseInt(process.env.SOCKET_PORT), {
  transport: ['websocket'],
  cors: {
    origin: '*',
  },
  namespace: 'socket',
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private readonly server: Server;
  handleConnection(@ConnectedSocket() client: Socket) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  handleReceivingOrder(orderId: string) {
    console.log('user new order arrived');
    this.server.emit('order_received', orderId);
  }

  handleOrderCancel(orderId: string) {
    console.log('user cancel order');
    this.server.emit('order_cancel', orderId);
  }

  handelJoinRoom(@ConnectedSocket() client: Socket, room: string) {
    client.join(room);
    console.log('room joined');
  }

  //@SubscribeMessage('order_approved')
  handleOrderApproved(room: string, orderId: string) {
    console.log('order approved');
    this.server.to(room).emit('order_approved', orderId);
  }
}
