
import { CreateAddressDto } from '../dto/create-addres.dto';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';
import Address from '../entities/address.entity';
import Employee, { EmployeeRole, EmployeeStatus } from '../entities/employee.entity';
import HttpException from '../exception/httpException';
import EmployeeRepository from '../repositories/employee.repository'
import bcrypt from 'bcrypt'
import { LoggerService } from './logger.service';
import Department from '../entities/department.entity';
import { DepartmentService } from './department.services';
import { CreateEmployeeDto } from '../dto/create-employee.dto';

export class EmployeeService{
    private logger = LoggerService.getInstance(EmployeeService.name)
    constructor(private employeeRepository:EmployeeRepository,private departmentService:DepartmentService){}

    async createEmployee(createEmployeeDto:CreateEmployeeDto):Promise<Employee>{
        // const addr = new Address();
        // addr.line1 = address.line1;
        // addr.pincode = address.pincode;
        const department = await this.departmentService.getDepartmentById(createEmployeeDto.deptId);
        if (!department){
            throw new HttpException(400, "Invalid Department")
        }
        const employee = new Employee();
        employee.name = createEmployeeDto.name;
        employee.email = createEmployeeDto.email;
        employee.age = createEmployeeDto.age;
        employee.experience = createEmployeeDto.experience;
        employee.role = createEmployeeDto.role;
        employee.status = createEmployeeDto.status;
        employee.joiningDate = createEmployeeDto.joiningDate;
        employee.employeeId = createEmployeeDto.employeeId;
        employee.password = await bcrypt.hash(createEmployeeDto.password,10);
        employee.address = createEmployeeDto.address as Address
        // const addr = new Address();
        
        // addr.houseNo = address.houseNo;
        // addr.line1 = address.line1;
        // addr.line2 = address.line2;
        // addr.pincode = address.pincode;
        // addr.employee = employee;

        // employee.address = addr;
        // console.log(address as Address)
        // console.log(employee.address)
        employee.dept = department
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
    async updateEmployeeById(empId:number,updateEmployeeDto:UpdateEmployeeDto):Promise<Employee>{
        const employee = await this.employeeRepository.findOneByID(empId);
        if (employee){
            if (updateEmployeeDto.dept_id){
                const dept = await this.departmentService.getDepartmentById(updateEmployeeDto.dept_id)

                if(!dept){
                    throw new HttpException(400,"Invalid Department")
                }
                employee.dept=dept;
            }
            if (updateEmployeeDto.address){
                employee.address.line1 = updateEmployeeDto.address.line1 || employee.address.line1
                employee.address.pincode = updateEmployeeDto.address.pincode || employee.address.pincode
            }
            employee.age = updateEmployeeDto.age || employee.age;
            employee.name = updateEmployeeDto.name || employee.name;
            employee.email = updateEmployeeDto.email || employee.email;
            employee.status = updateEmployeeDto.status || employee.status;
            employee.experience = updateEmployeeDto.experience || employee.experience;
            employee.joiningDate = updateEmployeeDto.joiningDate? new Date(updateEmployeeDto.joiningDate) : employee.joiningDate;
            return await this.employeeRepository.update(empId,employee);
            
            // if (updateEmployeeDto.address != null){
                
            //     if (!employee.address) {
            //         employee.address = new Address();   
            //     }
            //     if (updateEmployeeDto.address.line1){
            //         employee.address.line1 = updateEmployeeDto.address.line1
            //     }if (updateEmployeeDto.address.pincode){
            //         employee.address.pincode = updateEmployeeDto.address.pincode
            //     }
            //     // employee.address = updateEmployeeDto.address as Address
            // }
            // if (updateEmployeeDto.age!= null){
            //     employee.age = updateEmployeeDto.age;
            // }
            // if (updateEmployeeDto.name!= null){
            //     employee.name = updateEmployeeDto.name;
            // }
            // if (updateEmployeeDto.email){
            //     employee.email = updateEmployeeDto.email;
            // }
            // employee.updatedAt = new Date();
            // console.log("Modified :",employee);
            // await this.employeeRepository.update(empId,employee);
        }
        else{
            throw new HttpException(404,"Employee not found")
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
    async getEmployeesByDept(dept:Department):Promise<void>{
        await this.employeeRepository.findByDept(dept);
    }
}