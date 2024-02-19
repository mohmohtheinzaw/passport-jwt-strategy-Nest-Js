import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminService {
    constructor(
        private readonly dbService:PrismaService
    ){}

    async findOne(id:string){
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
                    statusCode:200
                }
            }
        } catch (error) {
            throw new HttpException('fail to fetch admin with id',HttpStatus.BAD_REQUEST)
        }
    }

    async fetchAll(){
        try {
            const data = await this.dbService.admin.findMany({
                where:{
                    
                }
            })
            return {
                data:data,
                metadata:{
                    message:'admin fetch successfully.'
                }
            }
        } catch (error) {
            
        }
    }
}
