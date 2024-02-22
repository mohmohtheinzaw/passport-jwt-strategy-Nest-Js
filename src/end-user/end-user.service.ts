import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrder } from './dto/end-user.dto';
import { generateOrderId } from 'src/helper/helper';
import { Responser } from 'src/response/response';
import { SocketGateway } from 'src/socket/socket.gateway';

@Injectable()
export class EndUserService {
  constructor(
    private readonly dbService: PrismaService,
    private readonly socket: SocketGateway,
  ) {}

  async createOrder(userId: string, dto: CreateOrder) {
    const orderId = generateOrderId();
    try {
      const data = await this.dbService.order.create({
        data: {
          customerId: userId,
          totalPrice: dto.totalCost,
          deliveryCharges: dto.deliveryCharges,
          paymentType: dto.paymentMethod,
          orderId: orderId,
        },
      });
      await this.dbService.orderProduct.createMany({
        data: dto.items.map((d) => {
          return {
            orderId: data.id,
            bookId: d.id,
            quantity: d.quantity,
          };
        }),
      });

      this.socket.handleReceivingOrder(data.id);
      // join room socket

      return Responser({
        body: data,
        message: 'create order successfully',
        statusCode: HttpStatus.OK,
      });
    } catch (error) {
      console.log(error);
      throw new HttpException('fail to create order', HttpStatus.BAD_REQUEST);
    }
  }

  async fetchOrder(userId: string) {
    try {
      const data = await this.dbService.order.findMany({
        where: {
          customerId: userId,
        },
        include: {
          OrderProduct: {
            include: {
              book: true,
            },
          },
        },
      });
      return Responser({
        body: data,
        message: 'fetch order successfully',
        statusCode: HttpStatus.OK,
      });
    } catch (error) {
      console.log(error);
      throw new HttpException('fail to fetch order', HttpStatus.BAD_REQUEST);
    }
  }

  private async checkOrderedTimeValidity(id: string) {
    const order = await this.dbService.order.findUniqueOrThrow({
      where: {
        id,
      },
    });
    const currentTime = new Date().getTime();
    const orderTime = new Date(order.createdAt).getTime();
    if (currentTime - orderTime > 24 * 60 * 60 * 1000) {
      throw new HttpException(
        'you can not cancel order',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async cancelOrder(id: string) {
    try {
      // check order created time is greater than 24 or not
      await this.checkOrderedTimeValidity(id);
      const data = await this.dbService.order.update({
        where: {
          id,
        },
        data: {
          status: 'USER_CANCEL',
        },
      });

      this.socket.handleOrderCancel(data.id);

      return Responser({
        body: data,
        message: 'order cancelled successfully',
        statusCode: HttpStatus.OK,
      });
    } catch (error) {
      console.log(error);
      throw new HttpException('fail to cancel order', HttpStatus.BAD_REQUEST);
    }
  }
}
