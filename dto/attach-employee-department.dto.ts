import { IsNumber } from "class-validator";

export class attachEmployeeDepartmentDto {
    @IsNumber()
    id:number
}