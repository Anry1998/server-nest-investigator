import { DataSource, Repository } from 'typeorm';
import { SocketId } from './entity/socket-id.model';
export declare class SocketService {
    private socketRepository;
    private dataSource;
    constructor(socketRepository: Repository<SocketId>, dataSource: DataSource);
    saveSocketId(employeeId: number, socketId: string): Promise<void>;
    removeSocketId(socketId: string): Promise<import("typeorm").DeleteResult>;
    getSocketIdByEmployeeId(employeeId: number): Promise<SocketId[]>;
    getSocketIdListByEmployeeIdList(employeeIdList: string): Promise<any>;
}
