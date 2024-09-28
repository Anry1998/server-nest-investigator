import { Division } from '../division/entity/division.model';
import { Organ } from '../organ/entity/organ.model';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { PositionEmployee } from '../position-employee/entity/position-employee.model';
export declare class SeedService {
    private organRepository;
    private divisionRepository;
    private positionEmployeeRepository;
    private authService;
    constructor(organRepository: Repository<Organ>, divisionRepository: Repository<Division>, positionEmployeeRepository: Repository<PositionEmployee>, authService: AuthService);
    seedDataOrgan(): Promise<void>;
    seedDataDivision(): Promise<void>;
    seedDataPositionEmployee(): Promise<void>;
    createExampleEmployes(): Promise<any>;
    allOrganDivisionPost(): Promise<void>;
    allSeed(): Promise<any>;
}
