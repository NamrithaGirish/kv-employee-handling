import { IsEmail, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateAddressDto } from "./create-addres.dto";
import { UpdateAddressDto } from "./update-address.dto";

export class UpdateEmployeeDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @ValidateNested()
  @Type(()=>UpdateAddressDto)
  address:UpdateAddressDto

}