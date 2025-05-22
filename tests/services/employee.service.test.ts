import { anyNumber, mock, MockProxy } from "jest-mock-extended";
import EmployeeRepository from "../../repositories/employee.repository";
import { EmployeeService } from "../../services/employee.services";
import { when } from 'jest-when';
import Employee from "../../entities/employee.entity";
import HttpException from "../../exception/httpException";


describe('EmployeeService',()=>{
    let employeeRepository:MockProxy<EmployeeRepository>
    let employeeService:EmployeeService
    beforeEach(()=>{
        employeeRepository = mock<EmployeeRepository>();
        employeeService = new EmployeeService(employeeRepository)
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
})