import { NextFunction } from "express";

export const processTimeMiddleware = (req, res, next:NextFunction) => {
  const startTime = Date.now(); 
  const end = res.end;
  res.end = function (chunk, encoding) {
    const totalTime = Date.now() - startTime;
    res.setHeader("X-Process-Time", totalTime);
    end.call(res, chunk, encoding); 
  };
  next();
};

export default processTimeMiddleware;
