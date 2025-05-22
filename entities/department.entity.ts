import { Entity, Column, ForeignKey, OneToOne, JoinColumn, ManyToOne, OneToMany} from "typeorm";
import AbstractEntity from "./abstract.entity";
import Address from "./address.entity";
import Employee from "./employee.entity";

@Entity()
class Department extends AbstractEntity {

    @Column({
      unique:true
    })
    name: string;


    @OneToMany(()=>Employee,(employee)=>employee.dept)
    employee : Employee[]
  }
  
  export default Department;
  