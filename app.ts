import express, { Request, Response } from "express";
// import employeeRouter from "./employee_router";
// import loggerMiddleware from "./loggerMiddleware";
// import { processTimeMiddleware } from "./processTimeMiddleware";
import  datasource from "./db/data-source";
import employeeRouter from "./routers/employee.router";
import loggerMiddleware from "./middleware/loggerMiddleware";
import processTimeMiddleware from "./middleware/processTimeMiddleware";
import errorMiddleware from "./middleware/errorMiddleware";

const server = express();
server.use(express.json());
server.use(loggerMiddleware);
server.use(processTimeMiddleware);

server.use("/employee", employeeRouter);
server.use(errorMiddleware);

server.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello world");
});
(async ()=>{
  try{
    await datasource.initialize();
    console.log("connected")
  }
  catch{
    console.error("Failed");
    process.exit();
  }
  server.listen(3000, () => {
    console.log("server listening to 3000");
  });
})();




