import { JwtPayload } from "../dto/jwt-payload";
import HttpException from "../exception/httpException";
import { JWT_SECRET, JWT_VALIDITY } from "../utils/constants";
import { EmployeeService } from "./employee.services";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { LoggerService } from "./logger.service";

export class AuthService{
    private logger = LoggerService.getInstance(EmployeeService.name)
    
    constructor(private employeeService :EmployeeService){

    }

    async login (email:string,password:string){
        const employee = await this.employeeService.getEmployeeByEmail(email);
        if (!employee){
            throw new Error("Invalid email or password")
        }
        this.logger.info("Employee : "+employee);
        if (employee){
            const isPasswordValid = await bcrypt.compare(password,employee.password);
        if (!isPasswordValid){
            throw new Error("Invalid email or password")
        }
        const payload:JwtPayload = {
            id:employee.id,
            email:employee.email,
            role:employee.role
        } // encoded - get data with decode
        const token = jwt.sign(payload,JWT_SECRET,{expiresIn:JWT_VALIDITY});
        return {
            tokenType:"Bearer",
            accessToken:token
        }
        }
        
    }
}