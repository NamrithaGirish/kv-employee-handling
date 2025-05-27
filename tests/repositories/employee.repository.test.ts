import { DataSource } from 'typeorm';
import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import Employee from '../../entities/employee.entity';
import EmployeeRepository from '../../repositories/employee.repository';
import Address from '../../entities/address.entity';
import { EmployeeRole } from '../../entities/employee.entity';
import AbstractEntity from '../../entities/abstract.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

describe('EmployeeRepository', () => {
  let container: StartedPostgreSqlContainer;
  let dataSource: DataSource;
  let employeeRepository: EmployeeRepository;

  beforeAll(async () => {
    container = await new PostgreSqlContainer()
      .withDatabase('test_db')
      .withUsername('test_user')
      .withPassword('test_password')
      .start();

    dataSource = new DataSource({
      type: 'postgres',
      host: container.getHost(),
      port: container.getPort(),
      username: container.getUsername(),
      password: container.getPassword(),
      database: container.getDatabase(),
      entities: [Employee, Address, AbstractEntity],
      migrations: ['db/migrations/*.ts'],
      namingStrategy: new SnakeNamingStrategy(),
    });

    await dataSource.initialize();

    // Run migrations
    await dataSource.runMigrations();

    const typeormRepository = dataSource.getRepository(Employee);
    employeeRepository = new EmployeeRepository(typeormRepository);
  });

  
  afterAll(async () => {
    await dataSource.destroy();
    await container.stop();
  });

  describe('find', () => {
    it('should return all employees with their addresses', async () => {
      // Create test data
      const addressRepo = dataSource.getRepository(Address);
      const employeeRepo = dataSource.getRepository(Employee);

      const address = addressRepo.create({
        line1: '123 Main St',
        pincode: 12345
      });
      await addressRepo.save(address);

      const employee = employeeRepo.create({
        name: 'John Doe',
        age: 25,
        email: 'john@example.com',
        password: 'hashedPassword',
        role: EmployeeRole.DEV,
        address
      });
      await employeeRepo.save(employee);

      const result = await employeeRepository.findMany();

      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        name: 'John Doe',
        email: 'john@example.com',
        address: {
          line1: '123 Main St',
          pincode: '12345'
        }
      });
    });
  });
}); 