import { Body, Controller, Post } from '@nestjs/common';
import { DocumentService } from './document.service';
import { CreateDocumentDto } from './dto/document.dto';

@Controller('document')
export class DocumentController {
    constructor( 
        private documenService: DocumentService,
    ) {}

    @Post('/create')
    create (@Body() dto: CreateDocumentDto) {
       return this.documenService.createDocument(dto)
    }
}
