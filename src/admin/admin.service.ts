import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AdminService {
    constructor(
        private readonly dbService:PrismaService
    ){}

    async findOne(id:string){
        try {
            const admin = await this.dbService.admin.findUnique({
                where:{
                    id
                }
            })
            return admin
        } catch (error) {
            
        }
    }
}
