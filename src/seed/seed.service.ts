import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Division } from '../division/entity/division.model';
import { Organ } from '../organ/entity/organ.model';
import { Repository } from 'typeorm';

import { AuthService } from '../auth/auth.service';
import { PositionEmployee } from '../position-employee/entity/position-employee.model'
import { CreateEmployeeDto } from '../create-employee/dto/create-employee.dto';








@Injectable()
export class SeedService {

    constructor(
        @InjectRepository(Organ) private organRepository: Repository<Organ>,
        @InjectRepository(Division) private divisionRepository: Repository<Division>,
        @InjectRepository(PositionEmployee) private positionEmployeeRepository: Repository<PositionEmployee>,
        private authService: AuthService,
    ) {}

    async seedDataOrgan(): Promise<void> {
        const postData: Partial<Organ>[] = [
          { name: 'ОМВД России по городу Анапе', adress: 'г. Анапа, ул. Краснодарская, 111' },
          { name: 'ОМВД России по городу Абинску', adress: 'г. Обнинск, просп. Ленина, 89' },
        ];
        try {
          await this.organRepository.save(postData);
          Logger.log('Данные успешно сохранены');
        } catch (error) {
          Logger.error(`Ошибка при заполнении данных: ${error.message}`, error.stack);
        }
    }

    async seedDataDivision(): Promise<void> {
        const postData: Partial<Division>[] = [
          { name: 'Следственный отдел', organId: 1 },
          { name: 'Уголовный розыск', organId: 1 },
        ];
        try {
          await this.divisionRepository.save(postData);
          Logger.log('Данные успешно сохранены');
        } catch (error) {
          Logger.error(`Ошибка при заполнении данных: ${error.message}`, error.stack);
        }
    } 

    async seedDataPositionEmployee(): Promise<void> {
        const postData: Partial<PositionEmployee>[] = [
          { value: 'Следователь', description: 'Не важно' },
          { value: 'Оперуполномоченный', description: 'Не важно' },
          { value: 'Инспектор дежурной части', description: 'Не важно' },
          { value: 'Начальник следственного отдела', description: 'Не важно'},
          { value: 'Заместитель начальника отдела', description: 'Не важно'},
        ];
        try {
          await this.positionEmployeeRepository.save(postData);
          Logger.log('Данные успешно сохранены');
        } catch (error) {
          Logger.error(`Ошибка при заполнении данных: ${error.message}`, error.stack);
        } 
    }   
   
    async createExampleEmployes() {
        const postData:CreateEmployeeDto[] =[
            { email: 'andrey.britvin.983@mail.ru', password: 'Aa79628775438!',organid:1, postid: 1, divisionid:1,},
            { email: 'andrey.britvin.98@mail.ru', password: 'Aa79628775438!', organid:1, divisionid:1, postid: 1},
        ]       
        try {      
            for (let i = 0; i < postData.length; i++) {
               await this.authService.registration(postData[i]) 
            }   
            Logger.log('Данные успешно сохранены');  
            return 'Данные успешно сохранены' 
        } catch (error) {
            Logger.error(`Ошибка при заполнении данных: ${error.message}`, error.stack);
            return error.message
        } 
    }       
  
    async allOrganDivisionPost() {
      await this.seedDataOrgan()
      await this.seedDataDivision() 
      await this.seedDataPositionEmployee()
    }       
 
    async allSeed() { 
        await this.seedDataOrgan() 
        await this.seedDataDivision()
        await this.seedDataPositionEmployee()
        return await this.createExampleEmployes()
    }
 
}
