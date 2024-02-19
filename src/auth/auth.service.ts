import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterAdmin } from './dto/admin.dto';
import { Responser } from 'src/response/response';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly dbService: PrismaService,
    private readonly jwtService:JwtService
    ) {}
  async registerAdmin(dto: RegisterAdmin) {
    const admin = await this.dbService.admin.findFirst({
        where: {
          email: dto.email,
        },
      });
      if (admin) {
         throw new HttpException('admin already exist with this email',409)
      }
    try {
      const data = await this.dbService.admin.create({
        data: {
          name: dto.name,
          email: dto.email,
          password: dto.password,
        },
      });
      console.log(data)
      return Responser({
        message:'Admin create success',
        statusCode:HttpStatus.OK,
        body:data
      })
    } catch (error) {
      console.log(error);
      throw new HttpException('fail to create admin',400)
    }
  }
  async loginAdmin(email: string, password: string) {
    try {
      const data = await this.dbService.admin.findFirst({
        where: {
          email,
          password,
        },
      });
      if (!data) {
        throw new HttpException(
        'email & password something went wrong',400
        );
      }
      // to generate token
      const token = await this.jwtService.signAsync(
        {id:data.id,email:data.email},
        {
            secret: process.env.ADMIN_SECRET_KEY,
            expiresIn: '1d',
          },
        )
      return {
        data: token,
        metadata: {
          message: 'Admin login successfully',
          statusCode:HttpStatus.OK,
        },
      };
    } catch (error) {
      throw new HttpException(
       'Admin login fail',
       400
      );
    }
  }

  async validateAdmin(id:string){
    try {
        const data = await this.dbService.admin.findUnique({
            where:{
                id
            }
        })
        return Responser({
            message:'Admin validate success',
            statusCode:HttpStatus.OK,
            body:data
        })
    } catch (error) {
        throw new HttpException('Validate admin fail',HttpStatus.BAD_REQUEST)
    }
  }

  async findOneAdmin(id: string) {
    const admin = await this.dbService.admin.findUnique({
      where: {
        id,
      },
    });
    return admin;
  }

  async findOneUser(id: string) {
    const user = await this.dbService.endUser.findUnique({
      where: {
        id,
      },
    });
    return user;
  }
}
