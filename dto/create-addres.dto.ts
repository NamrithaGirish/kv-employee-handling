import {IsNotEmpty, IsNumber, IsString} from "class-validator";


export class CreateAddressDto {

  @IsNotEmpty()
  @IsString()
  line1: string;

  @IsNotEmpty()
  @IsNumber()
  pincode: number;

  @IsNotEmpty()
  @IsString()
  line2: string;

  @IsNotEmpty()
  @IsString()
  houseNo: string;


}