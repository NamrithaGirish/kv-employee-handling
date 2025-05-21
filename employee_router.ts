import express from "express";
import Employee from "./entities/employee.entity";
import datasource from "./db/data-source";
import { Entity } from "typeorm";

const employeeRouter = express.Router();

employeeRouter.get("/", async(req, res) => {
  const employeeRepository = datasource.getRepository(Employee);
  const employees = await employeeRepository.find();
  if (!employees){
    res.status(400).send({"error":"No employees found"})
    return;
  }
  res.status(200).send(employees);
});

employeeRouter.get("/:id", async(req, res) => {
  const employeeRepository = datasource.getRepository(Employee);
  const empId = Number(req.params["id"]);
  const employee = await employeeRepository.findOneBy({id:empId});
  if (employee==null) {
    res.status(400).send({"error":"Employee not found"});
    return;
  }
    res.status(200).send(employee);
  
});

employeeRouter.post("/", (req, res) => {
  console.log(req.body);
  const employeeRepository = datasource.getRepository(Employee);
  let fieldsPassed = Object.keys(req.body);
  const requiredFields = ['email','name'];
  if (requiredFields.every(field=>fieldsPassed.includes(field))){
    res.status(400).send({"error":"All fields not found"});
    return;
  }
  const newEmployee = new Employee();
  newEmployee.email = req.body.email;
  newEmployee.name = req.body.name;
  employeeRepository.save(newEmployee);
  res.status(200).send(newEmployee);
});

employeeRouter.delete("/:id", async(req, res) => {
  const employeeRepository = datasource.getRepository(Employee);
  const empId = Number(req.params["id"]);
  const employee = await employeeRepository.findOneBy({id:empId});
  if (employee == null){
    res.status(400).send({"error":"Employee not found"})
    
  }else{
    await employeeRepository.delete(empId);
    res.status(200).send(employee);
  }
});

employeeRouter.put("/:id", async(req, res) => {
  const employeeRepository = datasource.getRepository(Employee);
  const empId = Number(req.params["id"]);
  const employee = await employeeRepository.findOneBy({id:empId});
  if (employee ==null){
    res.status(400).send({"error":"Employee not found"})
    
  }
  else{
    let fieldsPassed = Object.keys(req.body);
    const requiredFields = ['email','name'];
    const validPut = requiredFields.every(field=>fieldsPassed.includes(field));
    // console.log(validPut);
    //Need to add return otherwise repeated send
    /*
    [2025-05-20T17:59:01.926Z] GET /employee/7 200
node:_http_outgoing:641
    throw new ERR_HTTP_HEADERS_SENT('set');
          ^

Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    at ServerResponse.setHeader (node:_http_outgoing:641:11)
    at ServerResponse.header (/home/namrithac/training/node/session-05-starter/node_modules/express/lib/response.js:794:10)
    at ServerResponse.send (/home/namrithac/training/node/session-05-starter/node_modules/express/lib/response.js:174:12)
    at /home/namrithac/training/node/session-05-starter/dist/employee_router.js:37:21
    at Generator.next (<anonymous>)
    at fulfilled (/home/namrithac/training/node/session-05-starter/dist/employee_router.js:5:58)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5) {
  code: 'ERR_HTTP_HEADERS_SENT'
}
    */
    if (!validPut){
      res.status(400).send({"error":"All fields not found"});
      return;
    }
    employee.email = req.body.email;
    employee.name = req.body.name;
    employee.updatedAt = new Date();
    await employeeRepository.save(employee);
    res.status(200).send(employee);
  }
});

employeeRouter.patch("/:id", async(req, res) => {
  const employeeRepository = datasource.getRepository(Employee);
  const empId = Number(req.params["id"]);
  const employee = await employeeRepository.findOneBy({id:empId});
  let success = 0;
  if (employee ==null){
    res.status(400).send({"error":"Employee not found"})
    return;
  }
  if ("email" in req.body){
    employee.email = req.body.email;
    success = 1;
  }
  if ("name" in req.body){
    employee.name = req.body.name;
    success = 1;
  }
  if (success==0){
    res.status(400).send({"error":"No relevant data found to update"})
    return;
  }
  employee.updatedAt = new Date();
  await employeeRepository.save(employee);
  res.status(200).send(employee);
});

export default employeeRouter;
