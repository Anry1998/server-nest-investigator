import { Injectable } from "@nestjs/common"
import { Exclude, plainToClass } from "class-transformer"


export interface User {
    username: string
    password: string
}


@Injectable()
export class EmployeeTest{
    private users: User[] = [
        {
            username: 'username1',
            password: 'password'
        },
        {
            username: 'username2',
            password: 'password'
        },
        {
            username: 'username3',
            password: 'password'
        },
        {
            username: 'username4',
            password: 'password'
        },
    ]

    getUsers() {
        // return this.users

        return this.users.map((user) => plainToClass(SerializationUser, user))
    }

    getUserByUsername(username: string) {
        return this.users.find((user) => user.username === username)
    }
}

export class SerializationUser{
    username: string

    @Exclude()
    password: string

    constructor(partial: Partial<SerializationUser>) {
        Object.assign(this, partial);
      }
}


// import {
//     Column,
//     Entity,
//     PrimaryGeneratedColumn,
// } from 'typeorm';
// import { Exclude } from 'class-transformer';



// @Entity({ name: 'employee-test' })
// export class EmployeeTest {



//     @PrimaryGeneratedColumn('increment')
//     id: number;
  
//     @Column()
//     email: string;

//     @Exclude()
//     // @Column()
//     password: string;

//     constructor(partial: Partial<EmployeeTest>) {
//         Object.assign(this, partial);
//     }
    
// }

