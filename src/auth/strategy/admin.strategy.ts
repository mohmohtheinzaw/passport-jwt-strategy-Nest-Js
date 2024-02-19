import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class AdminStrategy extends PassportStrategy(Strategy) {
    constructor( private readonly authService:AuthService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: process.env.ADMIN_SECRET_KEY,
          });
    }

    async validate(payload:{
        id:string;
        email:string;
        iat:number;
        exp:number;
    }){
        console.log('here')
        const user = await this.authService.findOneAdmin(payload.id)
        if(!user){
            throw new UnauthorizedException(
                'Invalid token'
            )
        }
        return user
    }

}