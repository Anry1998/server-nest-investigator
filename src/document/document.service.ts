import { Injectable } from '@nestjs/common';
import { Document } from './entity/document.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDocumentDto } from './dto/document.dto';

@Injectable()
export class DocumentService {

    constructor(
        @InjectRepository(Document) private documentRepository: Repository<Document>,
    ) {}

    async createDocument(dto: CreateDocumentDto) {
        return await this.documentRepository.save(dto)  
    }
}
