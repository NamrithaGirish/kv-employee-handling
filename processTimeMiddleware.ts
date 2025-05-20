import { NextFunction,Request,Response } from "express";
export const processTimeMiddleware = (req ,res,next:NextFunction)=>{
    const startTime = new Date().getMilliseconds();
    const end = res.end;
    res.end = function(a,b){
        const endTime = new Date().getMilliseconds();
        const processTime = endTime - startTime;
        res.setHeader('process-time',processTime);
        end.call(res,a,b)
    };
    // to do add a middleware for process time - in response header
    next();
}

export default processTimeMiddleware;
