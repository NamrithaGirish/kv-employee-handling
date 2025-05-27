
import 'dotenv/config'

export const JWT_SECRET:string = process.env.JWT_SECRET;
console.log(JWT_SECRET)

export const JWT_VALIDITY = "1h";