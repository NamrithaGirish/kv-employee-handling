import { Entity, Column, ForeignKey, OneToOne, JoinColumn} from "typeorm";
import AbstractEntity from "./abstract.entity";
import Address from "./address.entity";

@Entity()
class Employee extends AbstractEntity {

    @Column({unique:true})
    email: string;

    @Column()
    age:number

    @Column()
    name: string;

    @OneToOne(()=>Address,(address)=>address.employee)
    @JoinColumn()
    address : Address
  }
  
  export default Employee;
  