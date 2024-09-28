import { SeedService } from './seed.service';
export declare class SeedController {
    private readonly seedService;
    constructor(seedService: SeedService);
    seedDataOrgan(): Promise<string>;
    seedDataDivision(): Promise<string>;
    seedDataPositionEmployee(): Promise<string>;
    seedOrganDivisionPost(): Promise<void>;
    seedDataCreateExampleEmployes(): Promise<string>;
    seedDataAll(): Promise<string>;
    seedDataAllTest(): Promise<string>;
}
