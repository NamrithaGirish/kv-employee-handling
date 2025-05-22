import { EmployeeRole } from "../entities/employee.entity";
import HttpException from "../exception/httpException";

export const authorizeMiddleware =(role:EmployeeRole[]) =>
    {
        return (req,res,next)=>{
        const payload = req.user;
        if (!role.includes(payload.role)){
            throw new HttpException(403,"No access")
        }
        next();
    }
}