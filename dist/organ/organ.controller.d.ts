import { OrganService } from './organ.service';
import { CreateOrganDto } from './dto/create-organ.dto';
export declare class OrganController {
    private organService;
    constructor(organService: OrganService);
    create(dto: CreateOrganDto): Promise<CreateOrganDto & import("./entity/organ.model").Organ>;
    test({ organId }: {
        organId: any;
    }): Promise<any>;
}
