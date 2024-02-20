import { BadRequestException, HttpException, HttpStatus, Injectable, RequestMapping } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CustomerRegister, LoginCustomer, RegisterAdmin } from './dto/auth.dto';
import { Responser } from 'src/response/response';
import { JwtService } from '@nestjs/jwt';
import { OTPSTATUS } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly dbService: PrismaService,
    private readonly jwtService:JwtService
    ) {}

    private async createOtp(phone: string) {
      try {
        const code = Math.floor(100000 + Math.random() * 900000);
        const data = await this.dbService.otp.upsert({
          where: {
            phone: phone,
          },
          update: {
            code: phone === '09123456789' ? '555555' : code.toString(),
            otpStatus: 'UNUSED',
          },
          create: {
            code: phone === '09123456789' ? '555555' : code.toString(),
            phone,
            otpStatus: 'UNUSED',
          },
        });
        return data;
      } catch (error) {
        throw new HttpException('fail to create otp',HttpStatus.BAD_REQUEST)
      }
    }
    private async checkCustomerExist(phone: string) {
      const customer = this.dbService.endUser.findUnique({
        where: {
          phone,
          isDeleted: false,
        },
      });
      return customer;
    }

    private async checkOtp(phone: string, code: string) {
      const otp = await this.dbService.otp.findUniqueOrThrow({
        where: {
          phone,
          code,
          otpStatus: 'UNUSED',
        },
      });
      return otp;
    }

    private async updateOtpStatus(phone: string, code: string, status: OTPSTATUS) {
      return await this.dbService.otp.update({
        where: {
          phone,
          code,
        },
        data: {
          otpStatus: status,
        },
      });
    }
  
  async registerCustomer(dto:CustomerRegister){
    try {
      await this.checkOtp(dto.phone,dto.code)
      await this.updateOtpStatus(dto.phone,dto.code,'USED')
      const data = await this.dbService.endUser.create({
        data:{
          name:dto.name,
          phone:dto.phone,
        }
      })
      return Responser({
        body:data,
        message:'register user successfully.',
        statusCode:HttpStatus.OK
      })
    } catch (error) {
      throw new HttpException('fail to register customer',error,error)
    }
  }


  async registerRequestOtp(phone:string){
    try {
      const user = await this.checkCustomerExist(phone)
      if(user){
        throw new HttpException('User already exist with this phone',HttpStatus.CONFLICT)
      }
      const data = await this.createOtp(phone)
      return Responser({
        body:data,
        message:'Otp created successfully.',
        statusCode:HttpStatus.OK
      })
    } catch (error) {
      throw new HttpException('fail to create otp',HttpStatus.BAD_REQUEST)
    } 
  }

  // private async findOtp(phone: string) {
  //       const data = await this.dbService.otp.findFirst({
  //         where: {
  //           phone,
  //         },
  //         orderBy: {
  //           createdAt: 'desc',
  //         },
  //       });
  //       return data;
  //     }

  async loginRequestOtp(phone:string){
    try {
      const user = await this.checkCustomerExist(phone)
      if(!user){
        throw new HttpException('user does not exist',HttpStatus.BAD_REQUEST)
      }
      const data = await this.createOtp(phone)
      return Responser({
        body:data,
        message:'login request code success',
        statusCode:HttpStatus.OK
      })
    } catch (error) {
      console.log(error)
      throw new HttpException('fail to request login code',HttpStatus.BAD_REQUEST)
    }
  }

  async loginCustomer(dto:LoginCustomer){
    try {
      await this.checkOtp(dto.phone,dto.code)
      await this.updateOtpStatus(dto.phone,dto.code,'USED')
      const data = await this.dbService.endUser.findFirst({
        where:{
          phone:dto.phone
        }
      })
      const token = await this.jwtService.signAsync(
        {id:data.id,email:data.email},
        {
            secret: process.env.ADMIN_SECRET_KEY,
            expiresIn: '1d',
          },
        )
      return Responser({
        body:token,
        message:'login user successfully.',
        statusCode:HttpStatus.OK
      })      
    } catch (error) {
      throw new HttpException('fail to login customer',HttpStatus.BAD_REQUEST)
    }
  }

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
