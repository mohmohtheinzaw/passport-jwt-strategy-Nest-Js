import {  Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ExceptionConstants } from "src/exception/exceptionConstant";

@Injectable()
export class AdminAuthGuard extends AuthGuard('jwt') {
    handleRequest<TUser = any>(err: any, user: any): TUser {
        if(err || !user) {
            throw err || 
            new UnauthorizedException({
                message:'Invalid token',
                code:ExceptionConstants.UnauthorizedCodes.ACCESS_TOKEN_EXPIRED,
                description:'Invalid or expired token'
            })
        }
        return user;
    }
}
