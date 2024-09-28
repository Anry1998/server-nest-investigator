import { DocumentService } from './document.service';
import { CreateDocumentDto } from './dto/document.dto';
export declare class DocumentController {
    private documenService;
    constructor(documenService: DocumentService);
    create(dto: CreateDocumentDto): Promise<CreateDocumentDto & import("./entity/document.model").Document>;
}
