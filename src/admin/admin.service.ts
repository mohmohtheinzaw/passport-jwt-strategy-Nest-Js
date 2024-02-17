import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { BadRequestException } from 'src/response/response';
import { IResponse } from 'src/response/response-interfaces';

@Injectable()
export class AdminService {
    constructor(
        private readonly dbService:PrismaService
    ){}

    async findOne(id:string):Promise<IResponse>{
        try {
            const admin = await this.dbService.admin.findUniqueOrThrow({
                where:{
                    id
                }
            })
            return {
                data:admin,
                metadata:{
                    message:'fetch admin successfully.',
                    statusCode:HttpStatus.OK
                }
            }
        } catch (error) {
            throw new BadRequestException({
                message:'fail to fetch admin',
                code:HttpStatus.BAD_REQUEST,
                cause:new Error(error)
            })
        }
    }

    async fetchAll():Promise<IResponse>{
        try {
            const data = await this.dbService.admin.findMany({
                
            })
        } catch (error) {
            
        }
    }
}
