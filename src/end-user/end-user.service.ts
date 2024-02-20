import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrder } from './dto/end-user.dto';
import { generateOrderId } from 'src/helper/helper';
import { Responser } from 'src/response/response';
import { SocketGateway } from 'src/socket/socket.gateway';

@Injectable()
export class EndUserService {
    constructor(
        private readonly dbService:PrismaService,
        private readonly socket:SocketGateway
        ){}

    async createOrder(userId:string,dto:CreateOrder){
        const orderId = generateOrderId()
        try {
            const data = await this.dbService.order.create({
                data:{
                    customerId:userId,
                    totalPrice:dto.totalCost,
                    deliveryCharges:dto.deliveryCharges,
                    paymentType:dto.paymentMethod,
                    orderId:orderId
                }
            })
            await this.dbService.orderProduct.createMany({
                data:dto.items.map((d)=>{
                    return {
                        orderId:data.id,
                        bookId:d.id,
                        quantity:d.quantity
                    }
                })
            })

            this.socket.handleReceivingOrder(data.id)

            return Responser({
                body:data,
                message:'create order successfully',
                statusCode:HttpStatus.OK
            })
        } catch (error) {
            console.log(error)
            throw new HttpException('fail to create order',HttpStatus.BAD_REQUEST)
        }
    }
}
