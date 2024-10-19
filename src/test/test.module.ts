import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
// import { TestService } from './test.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeTest } from './entity/test.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmployeeTest]), 
  ],
  controllers: [TestController],
  // providers: [TestService]
  providers: [{
    provide: 'USER_SERVICE',
    useClass: EmployeeTest
  }]
})
export class TestModule {}
