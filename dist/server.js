"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loggerMiddleware_1 = require("./loggerMiddleware");
const processTimeMiddleware_1 = require("./processTimeMiddleware");
const employee_router_1 = __importDefault(require("./employee_router"));
const server = (0, express_1.default)();
const port = 3000;
server.use(express_1.default.json());
server.use(loggerMiddleware_1.loggerMiddleware);
server.use(processTimeMiddleware_1.processTimeMiddleware);
server.get('/', (req, res) => {
    console.log("URL : " + req.url);
    res.status(200);
    res.send("<h1>Welcome</h1>");
});
server.use('/employees', employee_router_1.default);
server.listen(port, () => {
    console.log(`Server running at ${port}...`);
});
//# sourceMappingURL=server.js.map