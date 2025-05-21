import { Column, Entity, OneToOne} from "typeorm";
import AbstractEntity from "./abstract.entity";
import Employee from "./employee.entity";

@Entity()
class Address extends AbstractEntity{

    @Column()
    pincode : number;

    @Column()
    line1 : string;

    @OneToOne(()=>Employee,(employee)=>employee.address)
    employee : Employee;

}

export default Address;