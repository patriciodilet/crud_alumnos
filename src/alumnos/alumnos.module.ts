import { Module } from '@nestjs/common';
import { AlumnosService } from './alumnos.service';
import { AlumnosController } from './alumnos.controller';
import { AlumnosRepository } from './alumnos.repository';

@Module({
  controllers: [AlumnosController],
  providers: [AlumnosService, AlumnosRepository],
})
export class AlumnosModule {}
