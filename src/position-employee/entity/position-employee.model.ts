
import { Employee } from '../../create-employee/entity/employee.model';
import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';



@Entity({ name: 'post' })
export class PositionEmployee {
    @PrimaryGeneratedColumn('increment')
    id: number;
  
    @Column()
    value: string;

    @Column()
    description: string;

     
    @ManyToMany(() => Employee, employee => employee.id)
    employee: Employee[]
} 
 
