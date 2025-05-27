import { Entity, ForeignKey, OneToOne, JoinColumn, ManyToOne, IsNull, Column} from "typeorm";
import AbstractEntity from "./abstract.entity";
import Address from "./address.entity";
import Department from "./department.entity";
import { IsDate } from "class-validator";
export enum EmployeeRole{
  UI = "UI",
  UX = "UX",
  DEV = "DEVELOPER",
  HR = "HR"
}
export enum EmployeeStatus{
  ACTIVE="ACTIIVE",
  INACTIVE="INACTIVE",
  PROBATION="PROBATION"
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
      cascade:true
    })
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

    @Column()
    joiningDate:Date

    @Column({
      default:0
    })
    experience :number

    @Column({
      type:'enum',
      enum:EmployeeStatus,
      default:EmployeeStatus.PROBATION
    })
    status:EmployeeStatus

    @Column({
      unique:true
    })
    employeeId:string
  }
  
  export default Employee;
  