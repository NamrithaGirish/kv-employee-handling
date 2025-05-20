"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processTimeMiddleware = void 0;
const processTimeMiddleware = (req, res, next) => {
    const startTime = new Date().getMilliseconds();
    res.on("finish", () => {
        const endTime = new Date().getMilliseconds();
        const processTime = endTime - startTime;
        res.setHeader('process time', processTime);
    });
    // to do add a middleware for process time - in response header
    next();
};
exports.processTimeMiddleware = processTimeMiddleware;
//# sourceMappingURL=processTimeMiddleware.js.map