import Department from "../entities/department.entity";
import Employee from "../entities/employee.entity";
import HttpException from "../exception/httpException";
import { DepartmentRepository } from "../repositories/department.repository";
import EmployeeRepository from "../repositories/employee.repository";
import { EmployeeService } from "./employee.services";
import { LoggerService } from "./logger.service";

export class DepartmentService{
    private logger = LoggerService.getInstance(EmployeeService.name)
    
    constructor(private deptRepository:DepartmentRepository,private employeeRepository:EmployeeRepository){}

    async createDepartment(deptName:string):Promise<Department>{
        const dept = new Department();
        dept.name = deptName;
        this.logger.info("Creating Department")
        return await this.deptRepository.create(dept);
    }
    async getAllDepartment():Promise<Department[]>{
        return await this.deptRepository.getAll();
    }
    async getDepartmentById(deptId:number):Promise<Department>{
        return await this.deptRepository.getById(deptId);
    }
    async deleteDepartmentById(deptId:number):Promise<Department>{
        const dept = await this.deptRepository.getById(deptId);
        return await this.deptRepository.delete(dept);
    }
    async updateDepartment(deptId:number,deptName:string):Promise<Department>{
        const dept = await this.deptRepository.getById(deptId);
        dept.name = deptName;
        return await this.deptRepository.update(deptId,dept);
    }
    async getAllEmployees(deptId:number):Promise<Department>{
        return await this.deptRepository.getAllEmployeeByDeptId(deptId)
        //await this.employeeService.getEmployeesByDept(dept);
    }
    async addEmployeeToDept(deptId:number,employeeList:number[]){
        const dept = await this.deptRepository.getById(deptId);
        for (let i=0;i<employeeList.length;i++){
            console.log("employee id " ,employeeList[i])
            const employee = await this.employeeRepository.findOneByID(employeeList[i]);
            console.log(employee);
        }
        // employeeList.forEach(async(empId)=>{
        //     console.log("employee id " ,empId)
        //     const employee = await this.employeeRepository.findOneByID(empId);
        //     console.log(employee);
        //     // if (employee){
        //     //     await this.employeeRepository.updateDept(empId,dept)
        //     // }
        //     // else{
        //     //     throw new HttpException(400,"Invalid employee")
        //     // }

        // })
    }
}