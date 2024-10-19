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
import { Chat } from 'src/chats/entity/chat.model';
import { Messagers } from 'src/chats/entity/message.model';
import { Exclude } from 'class-transformer';

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

    constructor(partial: Partial<Employee>) {
        Object.assign(this, partial);
    }

    @PrimaryGeneratedColumn('increment')
    id: number;
  
    @Column()
    email: string;


    // @Exclude()
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


    // @ManyToMany(() => Chat)
    // @JoinTable({
    //     name: "employes_chats",
    //     joinColumn: { name: "employeeId", referencedColumnName: "id" },
    //     inverseJoinColumn: { name: "chatId" }
    //   })
    // chats: Chat[];


    @ManyToMany(() => Chat, )
    // @JoinColumn({ name: 'chat-employee', referencedColumnName: 'id' })
    chats: Employee[]; 


    @OneToMany(() => Messagers, messagers => messagers.employeeId)
    messagers: Messagers[];

    // @OneToMany(() => Token, token => token.employeeId)
    // token: Token[];   
}


export class SerializationEmployee{
    id: number;
    email: string;

    @Exclude()
    password: string

    organId: number
    divisionId: number
    token: Token[];
    createTime: Date;
    post: PositionEmployee[];
    incidents: Incident[];
    chats: Employee[];
    messagers: Messagers[];

    constructor(partial: Partial<SerializationEmployee>) {
        Object.assign(this, partial);
      }
}
