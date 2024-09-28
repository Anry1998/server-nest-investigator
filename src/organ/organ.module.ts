import { Module } from '@nestjs/common';
import { OrganController } from './organ.controller';
import { OrganService } from './organ.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organ } from './entity/organ.model';

@Module({
  controllers: [OrganController],
  providers: [OrganService],
  imports: [
    TypeOrmModule.forFeature([Organ]),
  ],
  exports: [
    OrganService
  ]
})
export class OrganModule {}
