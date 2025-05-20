import express from 'express';
import {loggerMiddleware} from './loggerMiddleware';
import {processTimeMiddleware} from './processTimeMiddleware';
import employeeRouter from './employee_router';

const server = express();
const port = 3000;
server.use(express.json());
server.use(loggerMiddleware);
server.use(processTimeMiddleware);

server.get('/',(req,res)=>{
    console.log("URL : "+req.url);
    res.status(200);
    res.send("<h1>Welcome</h1>");
});
server.use('/employees',employeeRouter);
server.listen(
    port,
    ()=>{
        console.log(`Server running at ${port}...`);
    }
);