

import { Employee } from '../../create-employee/entity/employee.model';
import { Organ } from '../../organ/entity/organ.model';

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

@Entity({ name: 'incident' })
export class Incident {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @CreateDateColumn()
    createTime: Date;


    @ManyToOne(() => Organ, (organ) => organ.divisions)
    @JoinColumn({ name: 'organ-incident', referencedColumnName: 'id' })
    organId: number;

    @ManyToMany(() => Employee, {
        cascade: true,
        eager: true,
    })
    @JoinColumn({ name: 'incident-employee', referencedColumnName: 'id' })
    employes: Employee[]; 
}