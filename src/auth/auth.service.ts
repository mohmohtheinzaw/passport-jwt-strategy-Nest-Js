import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RegisterAdmin } from './dto/admin.dto';
import { BadRequestException } from 'src/response/response';
import { IResponse } from 'src/response/response-interfaces';

@Injectable()
export class AuthService {
    private readonly dbService:PrismaService

    async registerAdmin(dto:RegisterAdmin):Promise<IResponse>{
        try {
            const data = await this.dbService.admin.create({
                data:{
                    name:dto.name,
                    email:dto.email,
                    password:dto.password
                }
            })
            return {
                data:data,
                metadata:{
                    message:'Admin register successfully.',
                    statusCode:HttpStatus.OK
                }
            }
        } catch (error) {
            throw new BadRequestException({
                message:'fail to create admin',
                code:HttpStatus.BAD_REQUEST,
            })
        }
    }

    async loginAdmin(email:string,password:string):Promise<IResponse>{
        try {
            const data = await this.dbService.admin.findFirst({
                where:{
                    email,
                    password
                }
            })
            if(!data){
                throw new BadRequestException({
                    message:'email & password something went wrong'
                })
            }
            // to generate token
            return {
                data:data,
                metadata:{
                    message:'Admin login successfully',
                    statusCode:HttpStatus.OK
                }
            }
        } catch (error) {
            throw new BadRequestException({
                message:'fail to login admin',
                cause:new Error(error),
                code:HttpStatus.BAD_REQUEST
            })
        }
    }

    async findOneAdmin(id:string){
            const admin = await this.dbService.admin.findUnique({
                where:{
                    id
                }
            })
            return admin
    }

    async findOneUser(id:string){
        const user= await this.dbService.endUser.findUnique({
            where:{
                id
            }
        })
        return user
    }
}
