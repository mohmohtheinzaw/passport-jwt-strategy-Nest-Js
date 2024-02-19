import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ExceptionConstants } from "src/exception/exceptionConstant";

@Injectable()
export class UserAuthGuard extends AuthGuard('user') {
    handleRequest<TUser = any>(err: any, user: any): TUser {
        if(err || !user) {
            throw err || 
            new UnauthorizedException({
                message:'Invalid token',
                code:ExceptionConstants.UnauthorizedCodes.ACCESS_TOKEN_EXPIRED,
                description:'Invalid or expired token'
            })
        }
        return user
    }
    
}