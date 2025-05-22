import { EmployeeRole } from "../entities/employee.entity";

export class JwtPayload{
    id:number;
    email: string;
    role:EmployeeRole
}