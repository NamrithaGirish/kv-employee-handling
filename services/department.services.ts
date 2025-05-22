import Department from "../entities/department.entity";
import { DepartmentRepository } from "../repositories/department.repository";

export class DepartmentService{
    constructor(private deptRepository:DepartmentRepository){}

    async createDepartment(deptName:string):Promise<Department>{
        const dept = new Department();
        dept.name = deptName;
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
}