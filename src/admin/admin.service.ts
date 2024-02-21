import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Responser } from 'src/response/response';
import { AdminUpdateInput, OrderConfirm } from './dto/admin.dto';
import { PaginationService } from 'src/pagination/pagination.service';
import { contains } from 'class-validator';
import { Pagination } from 'src/decorator/pagination.decorator';

@Injectable()
export class AdminService {
  constructor(private readonly dbService: PrismaService) {}
  private readonly paginationService = new PaginationService();
  async findOne(id: string) {
    try {
      const admin = await this.dbService.admin.findUniqueOrThrow({
        where: {
          id,
        },
      });
      return Responser({
        message: 'admin fetch successfully.',
        body: admin,
        statusCode: HttpStatus.OK,
      });
    } catch (error) {
      throw new HttpException(
        'fail to fetch admin with id',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async fetchAll(pagination: Pagination, search: string) {
    //console.log(search);
    try {
      const data = await this.dbService.admin.findMany({
        where: {
          isDeleted: false,
          OR: [
            {
              name: {
                contains: search,
              },
            },
            {
              email: {
                contains: search,
              },
            },
          ],
        },
        take: pagination.limit,
        skip: pagination.offset,
      });
      const totalAdmin = await this.dbService.admin.count({
        where: {
          isDeleted: false,
        },
      });
      const totalPage = this.paginationService.totalPage(
        totalAdmin,
        pagination.size,
      );
      return Responser({
        message: 'admin list fetch successfully.',
        body: data,
        statusCode: HttpStatus.OK,
        pagination: {
          total: totalAdmin,
          totalPage: totalPage,
        },
      });
    } catch (error) {
      throw new HttpException(
        'fail to fetch admin list',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: string) {
    try {
      const data = await this.dbService.admin.delete({
        where: {
          id,
        },
      });
      return Responser({
        message: 'admin delete successfully.',
        body: data,
        statusCode: HttpStatus.OK,
      });
    } catch (error) {
      throw new HttpException(
        'fail to delete admin',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, data: AdminUpdateInput) {
    try {
      const admin = await this.dbService.admin.findUniqueOrThrow({
        where: {
          id,
        },
      });
      const updatedAdmin = await this.dbService.admin.update({
        where: {
          id,
        },
        data: {
          ...admin,
          ...data,
        },
      });
      return Responser({
        message: 'admin update successfully.',
        body: updatedAdmin,
        statusCode: HttpStatus.OK,
      });
    } catch (error) {
      throw new HttpException(
        'fail to update admin',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async reduceStock(orderId: string) {
    try {
      const orderProducts = await this.dbService.orderProduct.findMany({
        where: {
          orderId,
        },
      });
      orderProducts.forEach(async (orderProduct) => {
        const book = await this.dbService.book.findUniqueOrThrow({
          where: {
            id: orderProduct.bookId,
          },
        });
        await this.dbService.book.update({
          where: {
            id: book.id,
          },
          data: {
            stock: {
              decrement: orderProduct.quantity,
            },
          },
        });
      });
    } catch (error) {
      throw new HttpException('fail to reduce stock', HttpStatus.BAD_REQUEST);
    }
  }

  async approvedOrder(id: string, adminId: string, dto: OrderConfirm) {
    try {
      const order = await this.dbService.order.findUniqueOrThrow({
        where: {
          id,
        },
      });
      console.log(order);
      const updatedOrder = await this.dbService.order.update({
        where: {
          id,
        },
        data: {
          status: 'APPROVED',
          deliveredDate: new Date(dto.deliveredDate),
          actionById: adminId,
        },
      });
      await this.reduceStock(id);
      return Responser({
        message: 'order update successfully.',
        body: updatedOrder,
        statusCode: HttpStatus.OK,
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'fail to update order',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //   async (id: string) {
  //     try {
  //       const order = await this.dbService.order.findUniqueOrThrow({
  //         where: {
  //           id,
  //         },
  //       });
  //       const updatedOrder = await this.dbService.order.update({
  //         where: {
  //           id,
  //         },
  //         data: {
  //           status: 'CANCELLED',
  //         },
  //       });
  //       return Responser({
  //         message: 'order update successfully.',
  //         body: updatedOrder,
  //         statusCode: HttpStatus.OK,
  //       });
  //     } catch (error) {
  //       throw new HttpException(
  //         'fail to update order',
  //         HttpStatus.INTERNAL_SERVER_ERROR,
  //       );
  //     }
  //   }
}
