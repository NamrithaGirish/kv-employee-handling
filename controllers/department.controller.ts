import { plainToInstance } from "class-transformer";
import { DepartmentDto } from "../dto/create-department.dto";
import { DepartmentService } from "../services/department.services";
import { validate } from "class-validator";
import HttpException from "../exception/httpException";
import { NextFunction, Request, Response, Router } from "express";
import { LoggerService } from "../services/logger.service";
import { authorizeMiddleware } from "../middleware/authorize.middleware";
import { EmployeeRole } from "../entities/employee.entity";

export class DepartmentController{
    private logger = LoggerService.getInstance(DepartmentController.name)
    
    constructor(private departmentService:DepartmentService,router:Router){
        router.get('/',this.getAllDepartment.bind(this));
        router.get('/:id/employees',this.getAllEmployees.bind(this));
        router.get('/:id',this.getDepartmentById.bind(this));
        router.post('/',authorizeMiddleware([EmployeeRole.HR]), this.createDepartment.bind(this));
        router.delete('/:id',authorizeMiddleware([EmployeeRole.HR]),this.deleteDepartmentById.bind(this));
        router.put('/:id',this.updateDepartment.bind(this));
        router.patch('/:id',authorizeMiddleware([EmployeeRole.HR,EmployeeRole.DEV]),this.updateDepartment.bind(this));

    }

    async createDepartment(req:Request,res:Response,next:NextFunction){
        try{
            const data = req.body;
            const createDepartmentDto = plainToInstance(DepartmentDto,data);
            const validationError = await validate(createDepartmentDto);
            if (validationError.length>0){
                this.logger.info(validationError);
                throw new HttpException(400,"Invalid input provided");
            }
            const dept = await this.departmentService.createDepartment(createDepartmentDto.name)
            res.status(201).send(dept);
        }
        catch(error){
            this.logger.error(error);
            next(error);
        }
        
    }
    async getAllDepartment(req:Request,res:Response,next:NextFunction){
        try{
            const depts = await this.departmentService.getAllDepartment();
            if (depts.length==0) {
                throw new HttpException(404, "No Departments Found")
            }
            res.status(200).send(depts);
        }
        catch(error){
            this.logger.error(error);
            next(error);
        }
    }
    async getDepartmentById(req:Request,res:Response,next:NextFunction){
        try{
            const deptId = Number(req.params.id)
            const dept = await this.departmentService.getDepartmentById(deptId);
            if (!dept){
                throw new HttpException(404,"Department Not Found")
            }
            res.status(200).send(dept);
        }
        catch(error){
            this.logger.error(error);
            next(error);
        }
    }
    async deleteDepartmentById(req:Request,res:Response,next:NextFunction){
        try{
            const deptId = Number(req.params.id)
            const dept = await this.departmentService.deleteDepartmentById(deptId);
            res.status(200).send(dept);
        }
        catch(error){
            this.logger.error(error);
            next(error);
        }
    }
    async updateDepartment(req:Request,res:Response,next:NextFunction){
        try{
            const deptId = Number(req.params.id)
            const data = req.body;
            const updateDepartmentDto = plainToInstance(DepartmentDto,data);
            const validationError = await validate(updateDepartmentDto);
            if (validationError.length>0){
                this.logger.error(validationError);
                throw new HttpException(400,"Invalid Request Body");
            }
            const dept = await this.departmentService.updateDepartment(deptId,updateDepartmentDto.name);
            res.status(200).send(dept);
        }
        catch(error){
            this.logger.error(error);
            next(error);
        }
    }
    async getAllEmployees(req:Request,res:Response,next:NextFunction):Promise<void>{
        try{
            const deptId = Number(req.params.id)
            const dept = await this.departmentService.getAllEmployees(deptId);
            if (!dept){
                throw new HttpException(404,"Department Not Found")
            }
            res.status(200).send(dept);
        }
        catch(error){
            this.logger.error(error);
            next(error);
        }
    }
}