import jwt from "jsonwebtoken"
import * as crypto from 'crypto';
export const admingenerateToken = function(payload:string):string{
    return jwt.sign(payload,process.env.ADMINSECRETKEY)
}

export const endUserGenerateToken = function(payload:string):string {
    return jwt.sign(payload,process.env.USERSECRET)
}

export const getHashed = function (payload: string): String {
  return crypto.createHash('sha1').update(payload).digest('hex');
};


