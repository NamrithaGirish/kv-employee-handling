import HttpException from "../exception/httpException";
import { AuthService } from "../services/auth.services";
import {NextFunction, Router, Response,Request} from 'express'
import { LoggerService } from "../services/logger.service";

export class AuthController{
        private logger = LoggerService.getInstance(AuthController.name)
    
    constructor(private authService:AuthService, private router:Router){
        router.post('/login',this.login.bind(this));
    }

    async login(req:Request,res:Response,next:NextFunction){
        try{
            const data = req.body;
            const email = data.email;
            const password = data.password;
            if (!email || !password){
                throw new HttpException(400,"Invalid request body")
            }
            const token = await this.authService.login(email,password);
            res.status(200).send(token);
        }
        catch(error){
            this.logger.error(error);
            next(error);
        }
        
    }
}