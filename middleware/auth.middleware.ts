import HttpException from "../exception/httpException";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../utils/constants";
import {Request,Response,NextFunction} from "express"
import { JwtPayload } from "../dto/jwt-payload";

export const getToken = (req:Request)=>{
    const token = req.headers.authorization;
    if (!token){
        throw new HttpException(401,"Not autorised");
    }
    const tokenSplits = token.split(' ');
    if (tokenSplits.length!=2){
        throw new HttpException(401,"Not autorised");

    }
    return tokenSplits[1];
}

export const authMiddleware = (req:Request,res:Response,next:NextFunction)=>{
    const token = getToken(req);
    console.log(token)
    if (!token){
        throw new HttpException(401,"Not Authorized")
    }
    try{
        const payload = jwt.verify(token,JWT_SECRET) as JwtPayload;
        console.log(payload);
        req.user = payload;
        // if (!verify){
        //     throw new HttpException(401,"Not Authorized")
        // }
    }
    catch(error){
        throw new HttpException(401,"Invalid token")

    }
    next();
}