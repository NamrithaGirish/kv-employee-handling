
import { CreateAddressDto } from '../dto/create-addres.dto';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';
import Address from '../entities/address.entity';
import Employee, { EmployeeRole } from '../entities/employee.entity';
import HttpException from '../exception/httpException';
import EmployeeRepository from '../repositories/employee.repository'
import bcrypt from 'bcrypt'
import { LoggerService } from './logger.service';
import Department from '../entities/department.entity';

export class EmployeeService{
    private logger = LoggerService.getInstance(EmployeeService.name)
    constructor(private employeeRepository:EmployeeRepository){}

    async createEmployee(name:string,email:string,age:number,address:CreateAddressDto,password:string,role:EmployeeRole,dept:Department):Promise<Employee>{
        // const addr = new Address();
        // addr.line1 = address.line1;
        // addr.pincode = address.pincode;
        const employee = new Employee();
        employee.name = name;
        employee.email = email;
        employee.age = age;
        employee.role = role;
        employee.password = await bcrypt.hash(password,10);
        employee.address = address as Address;
        employee.dept = dept
        return this.employeeRepository.create(employee);
    }
    async getAllEmployees():Promise<Employee[]>{
        this.logger.info("Getting all employees")
        return this.employeeRepository.findMany();
    }
    async getEmployeeById(empId:number):Promise<Employee|null>{
        const employee = await this.employeeRepository.findOneByID(empId);
        if (!employee){
            throw new HttpException(400,"Employee not found")
        }
        return employee
    }
    async updateEmployeeById(empId:number,updateEmployeeDto:UpdateEmployeeDto):Promise<void>{
        const employee = await this.employeeRepository.findOneByID(empId);
        if (employee){
            if (updateEmployeeDto.address != null){
                console.log("hello")
                if (!employee.address) {
                    employee.address = new Address();   
                }
                if (updateEmployeeDto.address.line1){
                    employee.address.line1 = updateEmployeeDto.address.line1
                }if (updateEmployeeDto.address.pincode){
                    employee.address.pincode = updateEmployeeDto.address.pincode
                }
                // employee.address = updateEmployeeDto.address as Address
            }
            if (updateEmployeeDto.age!= null){
                employee.age = updateEmployeeDto.age;
            }
            if (updateEmployeeDto.name!= null){
                employee.name = updateEmployeeDto.name;
            }
            if (updateEmployeeDto.email){
                console.log("hello33333")
                employee.email = updateEmployeeDto.email;
            }
            employee.updatedAt = new Date();
            console.log("Modified :",employee);
            await this.employeeRepository.update(empId,employee);
        }
    }
    async deleteEmployeeById(empId:number):Promise<void>{
        await this.employeeRepository.delete(empId);
    }
    async removeEmployeeById(employee:Employee):Promise<void>{
        await this.employeeRepository.remove(employee);
    }
    async getEmployeeByEmail(email:string):Promise<Employee|null>{
        return this.employeeRepository.findByEmail(email);
    }
    // async getEmployeeByDeptId(deptId:number):Promise<Employee|null>{
    //     return this.employeeRepository.findByDeptId(deptId);
    // }
}