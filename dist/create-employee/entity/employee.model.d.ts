import { Token } from '../../auth/entity/token.model';
import { Incident } from 'src/incident/entity/incident.model';
import { PositionEmployee } from '../../position-employee/entity/position-employee.model';
import { Messagers } from 'src/chats/entity/message.model';
export declare enum Rank {
    PRIVATE = "\u0440\u044F\u0434\u043E\u0432\u043E\u0439",
    JUNIOR_SERGEANT = "\u043C\u043B\u0430\u0434\u0448\u0438\u0439 \u0441\u0435\u0440\u0436\u0430\u043D\u0442",
    SERGEANT = "\u0441\u0435\u0440\u0436\u0430\u043D\u0442",
    SENIOR_SERGEANT = "\u0441\u0442\u0430\u0440\u0448\u0438\u0439 \u0441\u0435\u0440\u0436\u0430\u043D\u0442",
    ENSIGN = "\u043F\u0440\u0430\u043F\u043E\u0440\u0449\u0438\u043A",
    SECOND_LIEUTENANT = "\u043C\u043B\u0430\u0434\u0448\u0438\u0439 \u043B\u0435\u0439\u0442\u0435\u043D\u0430\u043D\u0442",
    LIEUTENANT = "\u043B\u0435\u0439\u0442\u0435\u043D\u0430\u043D\u0442",
    SENIOR_LIEUTENANT = "\u0441\u0442\u0430\u0440\u0448\u0438\u0439 \u043B\u0435\u0439\u0442\u0435\u043D\u0430\u043D\u0442",
    CAPTAIN = "\u043A\u0430\u043F\u0438\u0442\u0430\u043D",
    MAJOR = "\u043C\u0430\u0439\u043E\u0440",
    LIEUTENANT_COLONEL = "\u043F\u043E\u0434\u043F\u043E\u043B\u043A\u043E\u0432\u043D\u0438\u043A",
    COLONEL = "\u043F\u043E\u043B\u043A\u043E\u0432\u043D\u0438\u043A",
    MAJOR_GENERAL = "\u0433\u0435\u043D\u0435\u0440\u0430\u043B-\u043C\u0430\u0439\u043E\u0440",
    LIEUTENANT_GENERAL = "\u0433\u0435\u043D\u0435\u0440\u0430\u043B-\u043B\u0435\u0439\u0442\u0435\u043D\u0430\u043D\u0442",
    COLONEL_GENERAL = "\u0433\u0435\u043D\u0435\u0440\u0430\u043B-\u043F\u043E\u043B\u043A\u043E\u0432\u043D\u0438\u043A",
    GENERAL = "\u0433\u0435\u043D\u0435\u0440\u0430\u043B"
}
export declare class Employee {
    constructor(partial: Partial<Employee>);
    id: number;
    email: string;
    password: string;
    organId: number;
    divisionId: number;
    token: Token[];
    createTime: Date;
    post: PositionEmployee[];
    incidents: Incident[];
    chats: Employee[];
    messagers: Messagers[];
}
export declare class SerializationEmployee {
    id: number;
    email: string;
    password: string;
    organId: number;
    divisionId: number;
    token: Token[];
    createTime: Date;
    post: PositionEmployee[];
    incidents: Incident[];
    chats: Employee[];
    messagers: Messagers[];
    constructor(partial: Partial<SerializationEmployee>);
}
