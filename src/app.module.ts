import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { validate } from './config/env.validation';
import { AuthModule } from './auth/auth.module';
 


import { Token } from './auth/entity/token.model';
import { CrudEmployeeModule } from './create-employee/crud-employee.module';
import { PositionEmployeeModule } from './position-employee/position-employee.module';
import { Employee } from './create-employee/entity/employee.model';
import { PositionEmployee } from './position-employee/entity/position-employee.model';
import { PositionEmployeeService } from './position-employee/position-employee.service';
import { CrudEmployeeService } from './create-employee/crud-employee.service';
import { DivisionModule } from './division/division.module';
import { IncidentModule } from './incident/incident.module';
import { Incident } from './incident/entity/incident.model';
import { Organ } from './organ/entity/organ.model';
import { Division } from './division/entity/division.model';
import { OrganModule } from './organ/organ.module';
// import { DbPostgressModule } from './db-postgress/db-postgress.module';
import { IncidentController } from './incident/incident.controller';
import { SeedModule } from './seed/seed.module';
import { DocumentModule } from './document/document.module';
import { Document } from './document/entity/document.model';
import { AccessTokenGuard } from './auth/guard/access-token.guard';
import { AppGateway } from './app/app.gateway';







@Module({
  imports: [ 
    forwardRef(() => ConfigModule.forRoot({ isGlobal: true,  validate})),
    ConfigModule.forRoot({ isGlobal: true,  validate}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [ 
          // __dirname + "/**/**/**.entity{.ts,.js}",
          // __dirname + "/**/entity/*.ts"
          // "dist/**/*.entity{.ts,.js}",
          Organ, 
          Division,
          Incident,
          PositionEmployee,
          Employee, 
          Token,
          Document, 
        ],  
        synchronize: true, 
        // synchronize: configService.get<boolean>('DB_SYNCHRONIZATION'),
        logging: configService.get<boolean>('DB_LOGGING'),
        // migrations: [/*...*/],
        // migrationsTableName: "custom_migration_table",
      }),
      inject: [ConfigService],
    }),
    // TypeOrmModule,
    // UsersModule,
    // PostModule,
    // RolesModule,
    // DbPostgressModule,

    AuthModule,
    CrudEmployeeModule,
    PositionEmployeeModule,
    DivisionModule,
    IncidentModule,
    OrganModule,
    SeedModule, 
    // SeedtestModule, 
    DocumentModule
  ],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule {}


 
