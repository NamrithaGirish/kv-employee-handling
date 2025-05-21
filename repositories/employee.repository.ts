import Employee from "../entities/employee.entity";
import { DeleteResult, Repository } from "typeorm";

class EmployeeRepository{
    constructor(private repository:Repository<Employee>){
        
    }
    async create(employee: Employee):Promise<Employee>{
        return this.repository.save(employee);
    }
    async findMany():Promise<Employee[]>{
        return this.repository.find({
            relations : {
                address : true
            }
        });
    }
    async findOneByID(empId:number):Promise<Employee>{
        return this.repository.findOne(
            {
            where: {id: empId},
            relations:{
                address : true
            }
            }
        );
    }
    async update(empId:number, employee:Employee):Promise<void>{
        await this.repository.save({empId,...employee})
    }
    async delete(empId:number):Promise<void>{
        await this.repository.delete(empId);
    }

}
export default EmployeeRepository;