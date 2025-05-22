import { DepartmentController } from "../controllers/department.controller";
import datasource from "../db/data-source";
import Department from "../entities/department.entity";
import { DepartmentRepository } from "../repositories/department.repository";
import { DepartmentService } from "../services/department.services";
import express from "express"

const departmentRouter = express.Router();
const departmentRepository = new DepartmentRepository(datasource.getRepository(Department));
const departmentService = new DepartmentService(departmentRepository);
const departmentController = new DepartmentController(departmentService,departmentRouter);

export default departmentRouter;