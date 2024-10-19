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
import { Messagers } from './message.model';

@Entity({ name: 'chat' })
export class Chat {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    title: string;
    

    // @ManyToOne(() => Employee, employee => employee.id)
    // @JoinColumn({ name: 'employeeId', referencedColumnName: 'id' })
    // employeeId: number[]

    // @ManyToMany(() => Employee, {
    //     cascade: true,
    //     eager: true,
    // })
    // @JoinColumn({ name: 'chat-employee', referencedColumnName: 'id' })
    // employes: Employee[];  


    @ManyToMany(() => Employee, {
        cascade: true,
        eager: true,
    })
    @JoinTable({
        name: "employes_chats",
        joinColumn: { name: "chatId", referencedColumnName: "id" },
        inverseJoinColumn: { name: "employeeId" }
      })
    employes: Employee[];




    @OneToMany(() => Messagers, messagers => messagers.chatId)
    messagers: Messagers[];
    
    @CreateDateColumn() 
    createTime: Date;
}