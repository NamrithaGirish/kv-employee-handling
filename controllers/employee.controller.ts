import { plainToClass, plainToInstance } from "class-transformer";
import HttpException from "../exception/httpException";
import EmployeeRepository from "../repositories/employee.repository";
import { EmployeeService } from "../services/employee.services";
import { isEmailValid } from "../validators/emailValidator";
import { CreateEmployeeDto } from "../dto/create-employee.dto";
import { validate } from "class-validator";
import { UpdateEmployeeDto } from "../dto/update-employee.dto";
import { authorizeMiddleware } from "../middleware/authorize.middleware";
import { EmployeeRole } from "../entities/employee.entity";
import Department from "../entities/department.entity";

export class EmployeeController{
    constructor(private employeeService:EmployeeService, router ){
        router.post('/', this.createEmployee.bind(this));
        router.get('/',this.getAllEmployees.bind(this));
        // router.get('/:id',this.getEmployeeById, () => {})
        router.get('/:id',this.getEmployeeById)
        router.patch('/:id',authorizeMiddleware([EmployeeRole.HR,EmployeeRole.DEV]),this.updateEmployeeById.bind(this));
        router.delete('/:id',authorizeMiddleware([EmployeeRole.HR]),this.deleteEmployeeById.bind(this));
        router.delete('/remove/:id',authorizeMiddleware([EmployeeRole.HR]),this.removeEmployeeById.bind(this));
    }
    async createEmployee(req,res,next){
        try{
            const data = req.body
            const createEmployeeDto = plainToInstance(CreateEmployeeDto,data);
            const err = await validate(createEmployeeDto); 
            
            if (err.length>0){
                console.log(err)
                throw new HttpException(400,"Invalid input");
            }
            const employee = await this.employeeService.createEmployee(
                createEmployeeDto.name,
                createEmployeeDto.email,
                createEmployeeDto.age,
                createEmployeeDto.address,
                createEmployeeDto.password,
                createEmployeeDto.role,
                createEmployeeDto.dept as Department
            );
            res.status(201).send(employee);
        }
        catch(error){
            // console.log(error)
            next(error);
        }
    }
    async getAllEmployees(req,res){
        const employees = await this.employeeService.getAllEmployees();
        // const createEmployeeDto = plainToClass()
        if (!employees){
            res.status(400).send({"error":"No employees found"})
            return;
        }
        console.log(req.user);
        res.status(200).send(employees);
    }
    getEmployeeById = async(req,res,next)=>{
        try{
            const empId = Number(req.params["id"]);
            const employee = await this.employeeService.getEmployeeById(empId);
            const createEmployeeDto = plainToInstance(CreateEmployeeDto,employee);
            console.log(createEmployeeDto);
            if (!employee){
                throw new HttpException(404,"Employee not found")
            }
            res.status(200).send(employee);
        }
        catch(error){
            next(error);
        }
        
    }
    async updateEmployeeById(req,res,next){
        try{
            const empId = Number(req.params["id"]);
            const data = req.body;
            const updateEmployeeDto = plainToInstance(UpdateEmployeeDto,data);
            console.log(updateEmployeeDto);
            const err = await validate(updateEmployeeDto
                ,{skipMissingProperties: true}
            );
            if (err.length>0){
                throw new HttpException(400,"Validation failed");
            }
            // const name = updateEmployeeDto.name;
            // const email = updateEmployeeDto.email;
            // const address = updateEmployeeDto.address
            // const age = updateEmployeeDto.age;
            await this.employeeService.updateEmployeeById(empId,updateEmployeeDto);
            const employee = await this.employeeService.getEmployeeById(empId);
            res.status(200).send(employee);
        }
        catch(err){
            next(err);
        }
       
    }
    async deleteEmployeeById(req,res){
        const empId = Number(req.params["id"]);
        const employee = await this.employeeService.getEmployeeById(empId);
        await this.employeeService.deleteEmployeeById(empId);
        res.status(200).send(employee);
    }
    async removeEmployeeById(req,res){
        const empId = Number(req.params["id"]);
        const employee = await this.employeeService.getEmployeeById(empId);
        await this.employeeService.removeEmployeeById(employee);
        res.status(200).send(employee);
    }
}