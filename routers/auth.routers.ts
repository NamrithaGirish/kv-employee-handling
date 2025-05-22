import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../services/auth.services";
import express from 'express';
import { EmployeeService } from "../services/employee.services";
import EmployeeRepository from "../repositories/employee.repository";
import datasource from "../db/data-source";
import Employee from "../entities/employee.entity";
import { employeeService } from "./employee.router";

// const employeeRepository = new EmployeeRepository(datasource.getRepository(Employee));
// const employeeService = new EmployeeService(employeeRepository);
const authService = new AuthService(employeeService);
const authRouter = express.Router()

const authController = new AuthController(authService,authRouter);

export default authRouter;