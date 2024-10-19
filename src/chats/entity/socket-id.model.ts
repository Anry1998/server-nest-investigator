import { Employee } from '../../create-employee/entity/employee.model';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'socket' })
export class SocketId {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    socketId: string;

    @ManyToOne(() => Employee, employee => employee.id)
    @JoinColumn({ name: 'employeeId', referencedColumnName: 'id' })
    employeeId: number
}