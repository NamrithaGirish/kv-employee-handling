import { anyNumber, mock, MockProxy } from "jest-mock-extended";
import EmployeeRepository from "../../repositories/employee.repository";
import { EmployeeService } from "../../services/employee.services";
import { when } from 'jest-when';
import Employee from "../../entities/employee.entity";
import HttpException from "../../exception/httpException";
import { DepartmentService } from "../../services/department.services";
import { UpdateEmployeeDto } from "../../dto/update-employee.dto";


describe('EmployeeService',()=>{
    let employeeRepository:MockProxy<EmployeeRepository>
    let departmentService:MockProxy<DepartmentService>
    let employeeService:EmployeeService
    beforeEach(()=>{
        employeeRepository = mock<EmployeeRepository>();
        departmentService = mock<DepartmentService>();
        employeeService = new EmployeeService(employeeRepository,departmentService)
    })

    describe('getEmployeeByID',()=>{
        it('test an employee without valid id',async ()=>{
            // const employee:Employee = new Employee()
            when(employeeRepository.findOneByID).calledWith(anyNumber).mockReturnValue(null)
            expect(employeeService.getEmployeeById(9)).rejects.toThrow(new HttpException(400,"Employee not found"))
            // const result = await employeeService.getEmployeeById(9)
            // expect(result).toBeNull
        });
        it('test an employee with valid id',async ()=>{
            const mockEmployee = {
                id:10,
                name:"Name"
            } as Employee
            when(employeeRepository.findOneByID).calledWith(12).mockReturnValue(mockEmployee)
            const result = await employeeService.getEmployeeById(12)
            expect(result).toStrictEqual(mockEmployee);
        })
    })
    describe('getAllEmployees',()=>{
        it('test for no employees',async ()=>{
            const mockError = new HttpException(400,"No employees found")
            when(employeeRepository.findMany).calledWith().mockReturnValue([])
            expect(await employeeService.getAllEmployees()).toStrictEqual([])
            
        });
        it('test for all employees',async ()=>{
            const mockEmployee = {
                id:10,
                name:"Name"
            } as Employee
            const mockList:Employee[] = [mockEmployee];
            when(employeeRepository.findMany).calledWith().mockReturnValue(mockList)
            const result = await employeeService.getAllEmployees()
            expect(result).toStrictEqual(mockList);
        })
    })
    describe('updateEmployeeById',()=>{
        it('test for updating employee',async ()=>{
            const mockUpdateEmployeeDto = {
                name:"New Name"
            } as UpdateEmployeeDto
            const mockEmployeeBeforeUpdate = {
                id:10,
                name:"Name"
            } as Employee
            const mockEmployeeAfterUpdate = {
                id:10,
                name:"New Name"
            } as Employee

            when(employeeRepository.findOneByID).calledWith(10).mockReturnValue(mockEmployeeBeforeUpdate)
            when(employeeRepository.update).calledWith(10,mockEmployeeAfterUpdate).mockReturnValue(mockEmployeeAfterUpdate)
            const result = await employeeService.updateEmployeeById(10,mockUpdateEmployeeDto);
            console.log(result);
            expect(result).toStrictEqual(mockEmployeeAfterUpdate)
            
        });
        it('test for wrong emp id',async ()=>{
            const mockUpdateEmployeeDto = {
                name:"New Name"
            } as UpdateEmployeeDto
            const mockError = new HttpException(404,"Employee not found")
            when(employeeRepository.findOneByID).calledWith(anyNumber).mockReturnValue(null)
            expect(employeeService.updateEmployeeById(10,mockUpdateEmployeeDto)).rejects.toThrow(mockError)
            
        });
        describe("deleteEmployee", () => {
            it("should call remove if employee exists", async () => {
            const mockEmployee = { id: 1 } as Employee;
            when(employeeRepository.findOneByID)
                .calledWith(1)
                .mockResolvedValue(mockEmployee);
            await employeeService.removeEmployeeById(mockEmployee);
            expect(employeeRepository.remove).toHaveBeenCalledWith(mockEmployee);
            });
            it("should not call remove if employee does not exist", async () => {
            when(employeeRepository.findOneByID).calledWith(99).mockResolvedValue(null);
            await employeeService.deleteEmployeeById(99);
            expect(employeeRepository.remove).not.toHaveBeenCalled();
            });
        });
        
    })
})