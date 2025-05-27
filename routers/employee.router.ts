import express from "express";
import EmployeeRepository from "../repositories/employee.repository";
import datasource from "../db/data-source";
import Employee from "../entities/employee.entity";
import { EmployeeService } from "../services/employee.services";
import { EmployeeController } from "../controllers/employee.controller";
import { DepartmentService } from "../services/department.services";
import Department from "../entities/department.entity";
import { DepartmentRepository } from "../repositories/department.repository";
import { departmentService } from "./department.routers";
const employeeRouter = express.Router();
const employeeRepository = new EmployeeRepository(datasource.getRepository(Employee));

const employeeService = new EmployeeService(employeeRepository,departmentService);
const employeeController = new EmployeeController(employeeService,employeeRouter);

export {employeeRepository}
export {employeeService};
export default employeeRouter;