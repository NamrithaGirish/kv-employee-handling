import { NextFunction,Request,Response } from "express";
export const loggerMiddleware = (req :Request,res:Response,next:NextFunction)=>{
    const startTime = new Date().getMilliseconds();
    res.on("finish",()=>{
        const endTime = new Date().getMilliseconds();
        const processTime = endTime - startTime;
        console.log(`${new Date().toISOString()}\t${req.method}\t${req.originalUrl}\t${res.statusCode}\t${processTime}ms`);
    });
    // to do add a middleware for process time - in response header
    next();
}