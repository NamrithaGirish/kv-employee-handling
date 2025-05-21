import HttpException from "../exception/httpException";

export const errorMiddleware = (error,req,res,next) =>{
    // res.on("finish")
    try{
        // console.log(error);
        // res.status(500).send({
        //     "error":error.message
        // })
        if (error instanceof HttpException){
            let respBody = {message:error.message}
            res.status(error.status).json(respBody)
        }else{
            res.status(500).send({"error":error.message})
        }
    }
    catch(error){
        next(error);
    }
}

export default errorMiddleware;
