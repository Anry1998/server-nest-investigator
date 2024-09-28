import { Token } from '../../auth/entity/token.model';
import { Division } from '../../division/entity/division.model';
import { Incident } from 'src/incident/entity/incident.model';
import { Organ } from '../../organ/entity/organ.model';
import { PositionEmployee } from '../../position-employee/entity/position-employee.model';


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
import { Document } from '../../document/entity/document.model';

export enum Rank {
    PRIVATE = 'рядовой',
    JUNIOR_SERGEANT = 'младший сержант',
    SERGEANT = 'сержант',
    SENIOR_SERGEANT = 'старший сержант',
    ENSIGN = 'прапорщик',

    SECOND_LIEUTENANT = 'младший лейтенант',
    LIEUTENANT = 'лейтенант',
    SENIOR_LIEUTENANT = 'старший лейтенант',
    CAPTAIN = 'капитан',
    MAJOR = 'майор',
    LIEUTENANT_COLONEL = 'подполковник',
    COLONEL = 'полковник',

    MAJOR_GENERAL = 'генерал-майор',
    LIEUTENANT_GENERAL = 'генерал-лейтенант',
    COLONEL_GENERAL = 'генерал-полковник',
    GENERAL = 'генерал',
}

@Entity({ name: 'employee' })
export class Employee {
    @PrimaryGeneratedColumn('increment')
    id: number;
  
    @Column()
    email: string;

    @Column()
    password: string;

    @ManyToOne(() => Organ, (organ) => organ.employes, {
        cascade: true,
        eager: true,
    })
    @JoinColumn({ name: 'organ', referencedColumnName: 'id' })
    organId: number

    @ManyToOne(() => Division, division => division.employes, {
        cascade: true,
        eager: true,
    })
    @JoinColumn({ name: 'division', referencedColumnName: 'id' })
    divisionId: number

    @OneToMany(() => Token, token => token.employeeId)
    @JoinColumn()
    token: Token[];

    @CreateDateColumn()
    createTime: Date;

    @ManyToMany(() => PositionEmployee, {
        cascade: true,
        eager: true,
    })
    @JoinTable({
        name: "employee_post",
        joinColumn: { name: "employeeId", referencedColumnName: "id" },
        inverseJoinColumn: { name: "postId" }
      })
    post: PositionEmployee[];


    // @ManyToMany(() => Document, document => document.id)
    // document: Document[]

    @ManyToMany(() => Incident)
    @JoinTable({
        name: "employee_incident",
        joinColumn: { name: "employeeId", referencedColumnName: "id" },
        inverseJoinColumn: { name: "postId" }
      })
    incidents: Incident[];


    
}

