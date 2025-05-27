import {
  IsDate,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { UpdateAddressDto } from "./update-address.dto";
import { EmployeeRole, EmployeeStatus } from "../entities/employee.entity";

export class UpdateEmployeeDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @ValidateNested()
  @Type(() => UpdateAddressDto)
  address: UpdateAddressDto;

  // @Type(()=>attachEmployeeDepartmentDto)
  @IsNumber()
  dept_id: number;

  @IsDateString()
  joiningDate: Date;

  @IsEnum(EmployeeStatus)
  status: EmployeeStatus;

  @IsNumber()
  experience: number;

  @IsEnum(EmployeeRole)
  role: EmployeeRole;
}
