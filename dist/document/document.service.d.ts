import { Document } from './entity/document.model';
import { Repository } from 'typeorm';
import { CreateDocumentDto } from './dto/document.dto';
export declare class DocumentService {
    private documentRepository;
    constructor(documentRepository: Repository<Document>);
    createDocument(dto: CreateDocumentDto): Promise<CreateDocumentDto & Document>;
}
