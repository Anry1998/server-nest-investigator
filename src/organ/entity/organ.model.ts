

import { Document } from '../../document/entity/document.model';
import { Employee } from '../../create-employee/entity/employee.model';
import { Division } from '../../division/entity/division.model';
import { Incident } from '../../incident/entity/incident.model';

import {
    Column,
    CreateDateColumn,
    Entity,
    Generated,
    JoinColumn,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';




@Entity({ name: 'organ' })
export class Organ {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;
  
    @Column()
    adress: string;

    @CreateDateColumn()
    createTime: Date;

    @OneToMany(() => Employee, (employee) => employee.organId)
    employes: Employee[]

    @OneToMany(() => Division, (division) => division.organId)
    divisions: Division[]

    @OneToMany(() => Incident, (incident) => incident.organId)
    incidents: Incident[]

    @OneToMany(() => Document, (document) => document.organId)
    documents: Document[]


    // @ManyToMany(() => Incident, {
    //     cascade: true,
    //     eager: true,
    // })
    // @JoinTable({
    //     name: "organ_incident",
    //     joinColumn: { name: "organId", referencedColumnName: "id" },
    //     inverseJoinColumn: { name: "incidentId" }
    //   })
    // incidents: Incident[];

}