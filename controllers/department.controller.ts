import { plainToInstance } from "class-transformer";
import { DepartmentDto } from "../dto/create-department.dto";
import { DepartmentService } from "../services/department.services";
import { validate } from "class-validator";
import HttpException from "../exception/httpException";
import { NextFunction, Request, Response, Router } from "express";

export class DepartmentController{
    constructor(private departmentService:DepartmentService,router:Router){
        router.get('/',this.getAllDepartment.bind(this));
        router.get('/:id',this.getDepartmentById.bind(this));
        router.post('/',this.createDepartment.bind(this));
        router.delete('/:id',this.deleteDepartmentById.bind(this));
        router.put('/:id',this.updateDepartment.bind(this));
        router.patch('/:id',this.updateDepartment.bind(this));
    }

    async createDepartment(req:Request,res:Response,next:NextFunction){
        try{
            const data = req.body;
            const createDepartmentDto = plainToInstance(DepartmentDto,data);
            const validationError = await validate(createDepartmentDto);
            console.log(validationError)
            if (validationError.length>0){
                throw new HttpException(400,"Wrong input provided");
            }
            const dept = await this.departmentService.createDepartment(createDepartmentDto.name)
            res.status(201).send(dept);
        }
        catch(error){
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
                throw new HttpException(400,"Invalid Request Body");
            }
            const dept = await this.departmentService.updateDepartment(deptId,updateDepartmentDto.name);
            res.status(200).send(dept);
        }
        catch(error){
            next(error);
        }
    }
}