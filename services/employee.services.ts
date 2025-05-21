
import { CreateAddressDto } from '../dto/create-addres.dto';
import Address from '../entities/address.entity';
import Employee from '../entities/employee.entity';
import EmployeeRepository from '../repositories/employee.repository'

export class EmployeeService{
    constructor(private employeeRepository:EmployeeRepository){

    }
    async createEmployee(name:string,email:string,age:number,address:CreateAddressDto):Promise<Employee>{
        const addr = new Address();
        addr.line1 = address.line1;
        addr.pincode = address.pincode;
        const employee = new Employee();
        employee.name = name;
        employee.email = email;
        employee.age = age;
        employee.address = addr;
        return this.employeeRepository.create(employee);
    }
    async getAllEmployees():Promise<Employee[]>{
        return this.employeeRepository.findMany();
    }
    async getEmployeeById(empId:number):Promise<Employee>{
        return this.employeeRepository.findOneByID(empId);
    }
    async updateEmployeeById(empId:number,email:string,name:string):Promise<void>{
        const employee = await this.employeeRepository.findOneByID(empId);
        if (employee){
            employee.name=name;
            employee.email=email;
            employee.updatedAt = new Date();
            await this.employeeRepository.update(empId,employee);
        }
    }
    async deleteEmployeeById(empId:number):Promise<void>{
        await this.employeeRepository.delete(empId);
    }
}