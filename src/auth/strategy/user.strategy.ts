import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt,Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";

@Injectable()
export class EndUserStrategy extends PassportStrategy(Strategy,'user') {
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
        const user = await this.authService.findOneUser(payload.id)
        if(!user){
            throw new UnauthorizedException(
                'Invalid token'
            )
        }
        return user
    }

}