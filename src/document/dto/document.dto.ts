import { TypeDocyment } from "../entity/document.model";

export class CreateDocumentDto {
    // readonly name: string
    readonly organId: number;
    // readonly typeDocyment: TypeDocyment;
    readonly formТumber: number
    readonly value: string;
    readonly employee: number[]
} 