"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerMiddleware = void 0;
const loggerMiddleware = (req, res, next) => {
    const startTime = new Date().getMilliseconds();
    res.on("finish", () => {
        const endTime = new Date().getMilliseconds();
        const processTime = endTime - startTime;
        console.log(`${new Date().toISOString()}\t${req.method}\t${req.originalUrl}\t${res.statusCode}\t${processTime}ms`);
    });
    // to do add a middleware for process time - in response header
    next();
};
exports.loggerMiddleware = loggerMiddleware;
//# sourceMappingURL=loggerMiddleware.js.map