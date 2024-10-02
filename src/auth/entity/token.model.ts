import { Employee } from '../../create-employee/entity/employee.model';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'token' })
export class Token {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    refreshToken: string;

    @ManyToOne(() => Employee, employee => employee.id)
    @JoinColumn({ name: 'employeeId', referencedColumnName: 'id' })
    employeeId: number
}