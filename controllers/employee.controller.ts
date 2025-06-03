import { plainToClass, plainToInstance } from "class-transformer";
import HttpException from "../exception/httpException";
import EmployeeRepository from "../repositories/employee.repository";
import { EmployeeService } from "../services/employee.services";
import { isEmailValid } from "../validators/emailValidator";
import { CreateEmployeeDto } from "../dto/create-employee.dto";
import { validate } from "class-validator";
import { UpdateEmployeeDto } from "../dto/update-employee.dto";
import { authorizeMiddleware } from "../middleware/authorize.middleware";
import { EmployeeRole } from "../entities/employee.entity";
import Department from "../entities/department.entity";
import { Request, Response, NextFunction, Router } from "express";
import { LoggerService } from "../services/logger.service";

export class EmployeeController {
	private logger = LoggerService.getInstance(EmployeeService.name);

	constructor(private employeeService: EmployeeService, router: Router) {
		router.post(
			"/",
			authorizeMiddleware([EmployeeRole.HR]),
			this.createEmployee.bind(this)
		);
		router.get("/", this.getAllEmployees.bind(this));
		// router.get('/:id',this.getEmployeeById, () => {})
		router.get("/:id", this.getEmployeeById);
		router.patch(
			"/:id",
			authorizeMiddleware([EmployeeRole.HR, EmployeeRole.DEV]),
			this.updateEmployeeById.bind(this)
		);
		router.delete(
			"/remove/:id",
			authorizeMiddleware([EmployeeRole.HR]),
			this.deleteEmployeeById.bind(this)
		);
		router.delete(
			"/:id",
			authorizeMiddleware([EmployeeRole.HR]),
			this.removeEmployeeById.bind(this)
		);
	}
	async createEmployee(req: Request, res: Response, next: NextFunction) {
		try {
			const data = req.body;
			// data.joiningDate = new Date(data.joiningDate)
			const createEmployeeDto = plainToInstance(CreateEmployeeDto, data);
			const err = await validate(createEmployeeDto);
			console.log("Error : ", err);
			if (err.length > 0) {
				console.log("Error : ", err);
				const errMsg = err.map((error) => {
					// console.log(
					// 	"validation error child : ",
					// 	Object.values(error.constraints)
					// );
					return error.constraints
						? Object.values(error.constraints).join(", ")
						: "";
				});
				this.logger.error("Create error : " + JSON.stringify(errMsg));
				throw new HttpException(400, JSON.stringify(errMsg));
			}
			const employee = await this.employeeService.createEmployee(
				createEmployeeDto
			);
			res.status(201).send(employee);
		} catch (error) {
			this.logger.error("Creation :" + error);
			next(error);
		}
	}
	async getAllEmployees(req: Request, res: Response, next: NextFunction) {
		try {
			const employees = await this.employeeService.getAllEmployees();
			if (!employees) {
				throw new HttpException(400, "No employees found");
			}
			this.logger.info(req.user);
			res.status(200).send(employees);
		} catch (error) {
			next(error);
		}
	}
	getEmployeeById = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const empId = Number(req.params["id"]);
			const employee = await this.employeeService.getEmployeeById(empId);
			const createEmployeeDto = plainToInstance(
				CreateEmployeeDto,
				employee
			);
			console.log(createEmployeeDto);
			if (!employee) {
				throw new HttpException(404, "Employee not found");
			}
			res.status(200).send(employee);
		} catch (error) {
			next(error);
		}
	};
	async updateEmployeeById(req: Request, res: Response, next: NextFunction) {
		try {
			const empId = Number(req.params["id"]);
			const data = req.body;
			const updateEmployeeDto = plainToInstance(UpdateEmployeeDto, data);

			const err = await validate(updateEmployeeDto, {
				skipMissingProperties: true,
			});
			this.logger.error(err);
			if (err.length > 0) {
				const errMsg = err.map((error) => {
					return error.constraints
						? Object.values(error.constraints).join(", ")
						: "";
				});
				this.logger.error("Create error : " + JSON.stringify(errMsg));
				throw new HttpException(400, JSON.stringify(errMsg));
			}
			await this.employeeService.updateEmployeeById(
				empId,
				updateEmployeeDto
			);
			const employee = await this.employeeService.getEmployeeById(empId);
			res.status(200).send(employee);
		} catch (err) {
			next(err);
		}
	}
	async deleteEmployeeById(req: Request, res: Response, next: NextFunction) {
		try {
			const empId = Number(req.params["id"]);
			const employee = await this.employeeService.getEmployeeById(empId);
			await this.employeeService.deleteEmployeeById(empId);
			res.status(200).send(employee);
		} catch (error) {
			next(error);
		}
	}
	async removeEmployeeById(req: Request, res: Response, next: NextFunction) {
		try {
			const empId = Number(req.params["id"]);
			const employee = await this.employeeService.getEmployeeById(empId);
			await this.employeeService.removeEmployeeById(employee);
			res.status(200).send(employee);
		} catch (error) {
			this.logger.error(error);
			next(error);
		}
	}
}
