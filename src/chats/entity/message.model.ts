import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Employee } from '../../create-employee/entity/employee.model';
import { Chat } from './chat.model';

@Entity({ name: 'messagers' })
export class Messagers {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => Chat, chat => chat.id)
    @JoinColumn({ name: 'chatId', referencedColumnName: 'id' })
    chatId: number;

    @ManyToOne(() => Employee, employee => employee.id)
    @JoinColumn({ name: 'employeeId', referencedColumnName: 'id' })
    employeeId: number;

    @Column()
    message: string;

    @Column({default: true})
    notRead: boolean

    @CreateDateColumn()
    createTime: Date;

    @UpdateDateColumn()
    updateTime: Date;
}