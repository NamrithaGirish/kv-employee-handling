import { IsDate, IsDateString, IsEmail, IsEnum, isNotEmpty, IsNotEmpty, IsNumber, IsString, IsStrongPassword, MinLength, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateAddressDto } from "./create-addres.dto";
import { EmployeeRole, EmployeeStatus } from "../entities/employee.entity";
import Department from "../entities/department.entity";
import { IsNull } from "typeorm";

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  // @IsStrongPassword()
  @MinLength(5)
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @ValidateNested()
  @Type(()=>CreateAddressDto)
  address:CreateAddressDto

  @IsEnum(EmployeeRole)
  @IsNotEmpty()
  role:EmployeeRole

  @IsNotEmpty()
  @IsNumber()
  deptId:number

  @IsString()
  @IsNotEmpty()
  employeeId:string

  @IsNumber()
  @IsNotEmpty()
  experience:number

  @IsDateString()
  @IsNotEmpty()
  joiningDate:Date

  @IsEnum(EmployeeStatus)
  @IsNotEmpty()
  status:EmployeeStatus

}