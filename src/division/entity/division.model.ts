

import { Employee } from '../../create-employee/entity/employee.model';
import { Organ } from '../../organ/entity/organ.model';
import {
    Column,
    CreateDateColumn,
    Entity,
    Generated,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';


@Entity({ name: 'division' })
export class Division {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;
  
    // @Column()
    // email: string;

    // @Column()
    // adress: string;

    @CreateDateColumn() 
    createTime: Date;

    @ManyToOne(() => Organ, (organ) => organ.divisions)
    @JoinColumn({ name: 'organ-division', referencedColumnName: 'id' })
    organId: number;

    @OneToMany(() => Employee, (employee) => employee.divisionId)
    @JoinColumn()
    employes: Employee[]
}