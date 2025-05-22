import { Entity, ForeignKey, OneToOne, JoinColumn, ManyToOne, IsNull, Column} from "typeorm";
import AbstractEntity from "./abstract.entity";
import Address from "./address.entity";
import Department from "./department.entity";
export enum EmployeeRole{
  UI = "UI",
  UX = "UX",
  DEV = "DEVELOPER",
  HR = "HR"
}
@Entity()
class Employee extends AbstractEntity {

    @Column({unique:true})
    email: string;

    @Column()
    age:number

    @Column()
    name: string;

    @OneToOne(()=>Address,(address)=>address.employee,{
      cascade:true,
      onDelete:'CASCADE'
    })
    @JoinColumn()
    address : Address

    @ManyToOne(()=>Department,(dept)=>dept.employee,{
      cascade:true,
      onDelete:'CASCADE'
    })
    dept : Department

    @Column()
    password : string

    @Column(
      {
        type:'enum',
        enum:EmployeeRole,
        default:EmployeeRole.DEV
      }
    )
    role : EmployeeRole
  }
  
  export default Employee;
  