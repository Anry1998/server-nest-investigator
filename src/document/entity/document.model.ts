
import { Organ } from '../../organ/entity/organ.model';
import { Employee } from '../../create-employee/entity/employee.model';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

export enum TypeDocyment {
    RESOLUTION = 'ПОСТАНОВЛЕНИЕ',
    PROTOCOL = 'ПРОТОКОЛ',
    REPORT = 'РАПОРТ',
    COVER_LETTER = 'СОПРОВОДИТЕЛЬНОЕ ПИСЬМО',
    NOTIFICATION = 'УВЕДОМЛЕНИЕ',   
}



@Entity({ name: 'document' })
export class Document {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @CreateDateColumn()
    createTime: Date;

    @ManyToOne(() => Organ, (organ) => organ.documents, {
        cascade: true,
        eager: true,
    })
    @JoinColumn({ name: 'organId', referencedColumnName: 'id' })
    organId: number;
 
    // @Column()
    // typeDocyment: TypeDocyment;

    @Column()
    formТumber: number;
   
    @Column()
    value: string;
      
    @ManyToMany(() => Employee, {
        cascade: true,
        eager: true,
    })
    @JoinTable({
        name: "employee_document",
        joinColumn: { name: "employeeId", referencedColumnName: "id" },
        inverseJoinColumn: { name: "documentId" }
      })
    employee: number[];
} 
 
