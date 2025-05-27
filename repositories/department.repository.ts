import { Repository } from "typeorm";
import Department from "../entities/department.entity";

export class DepartmentRepository{
    constructor(private repository:Repository<Department>){

    }

    async create(dept:Department):Promise<Department>{
        return await this.repository.save(dept);
    }
    async update(deptId:number,dept:Department):Promise<Department>{
        return await this.repository.save({deptId,...dept});
    }
    async delete(dept:Department):Promise<Department>{
        return await this.repository.softRemove(dept);
    }
    async getById(id:number):Promise<Department>{
        return await this.repository.findOne(
            {   where:{id} }
        );
    }
    async getAllEmployeeByDeptId(id:number):Promise<Department>{
        return await this.repository.findOne(
            {   where:{id},relations:{
                employee:true
            } }
        );
    }
    async getAll():Promise<Department[]>{
        return await this.repository.find();
    }

}