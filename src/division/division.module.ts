import { Module } from '@nestjs/common';
import { DivisionController } from './division.controller';
import { DivisionService } from './division.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Division } from './entity/division.model';

@Module({
  controllers: [DivisionController],
  providers: [DivisionService],
  imports: [
    TypeOrmModule.forFeature([Division]),
  ],
  exports: [
    DivisionService
  ]
})
export class DivisionModule {}
