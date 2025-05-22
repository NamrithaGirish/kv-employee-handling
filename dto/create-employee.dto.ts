import { IsEmail, IsEnum, isNotEmpty, IsNotEmpty, IsNumber, IsString, IsStrongPassword, MinLength, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateAddressDto } from "./create-addres.dto";
import { EmployeeRole } from "../entities/employee.entity";
import Department from "../entities/department.entity";
import { attachEmployeeDepartmentDto } from "./attach-employee-department.dto";

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
  @Type(()=>attachEmployeeDepartmentDto)
  dept:attachEmployeeDepartmentDto


}