import { Column, Entity, JoinColumn, OneToOne} from "typeorm";
import AbstractEntity from "./abstract.entity";
import Employee from "./employee.entity";

@Entity()
class Address extends AbstractEntity{

    @Column()
    pincode : number;

    @Column()
    line1 : string;
        
    @Column()
    line2 : string;

    @Column()
    houseNo: string;

    @OneToOne(()=>Employee,(employee)=>employee.address,{
      onDelete:'CASCADE'
    })

    @JoinColumn()
    employee : Employee;

}

export default Address;