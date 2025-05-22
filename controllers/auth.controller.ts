import HttpException from "../exception/httpException";
import { AuthService } from "../services/auth.services";
import {Router} from 'express'

export class AuthController{
    constructor(private authService:AuthService, private router:Router){
        router.post('/login',this.login.bind(this));
    }

    async login(req,res,next){
        try{
            const data = req.body;
            const email = data.email;
            const password = data.password;
            if (!email || !password){
                throw new HttpException(400,"Invalid request body")
            }
            const token = await this.authService.login(email,password);
            res.status(200).send(token)
        }
        catch(error){
            next(error);
        }
        
    }
}