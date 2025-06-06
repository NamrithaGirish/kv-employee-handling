import express, { Request, Response } from "express";
// import employeeRouter from "./employee_router";
// import loggerMiddleware from "./loggerMiddleware";
// import { processTimeMiddleware } from "./processTimeMiddleware";
import datasource from "./db/data-source";
import employeeRouter from "./routers/employee.router";
import loggerMiddleware from "./middleware/loggerMiddleware";
import processTimeMiddleware from "./middleware/processTimeMiddleware";
import errorMiddleware from "./middleware/errorMiddleware";
import authRouter from "./routers/auth.routers";
import { authMiddleware } from "./middleware/auth.middleware";
import { authorizeMiddleware } from "./middleware/authorize.middleware";
import { LoggerService } from "./services/logger.service";
import departmentRouter from "./routers/department.routers";
import cors from "cors";

const server = express();
const logger = LoggerService.getInstance("app");
server.use(express.json());
server.use(loggerMiddleware);
server.use(processTimeMiddleware);
server.use(cors());

// server.use("/employee",employeeRouter);
server.use("/employee", authMiddleware, employeeRouter);
server.use("/department", authMiddleware, departmentRouter);
server.use("/auth", authRouter);
server.use(errorMiddleware);

server.get("/", (req: Request, res: Response) => {
	res.status(200).json({ message: "Welcome" });
});
(async () => {
	try {
		await datasource.initialize();
		logger.info("DB Connected");
		// console.log("connected")
	} catch (err) {
		console.log(err);
		logger.error(err);
		process.exit();
	}
	server.listen(4000, () => {
		logger.info("server listening to 4000");
	});
})();
