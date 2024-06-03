import { Injectable } from '@nestjs/common';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';
import { AlumnosRepository } from './alumnos.repository';
import { Alumno } from './entities/alumno.entity';

@Injectable()
export class AlumnosService {
  constructor(private readonly repository: AlumnosRepository) {}

  create(createAlumnoDto: CreateAlumnoDto) {
    return this.repository.upsertOne(Alumno.newInstanceFromDTO(createAlumnoDto));
  }

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: string) {
    return this.repository.findByAlumnoId(id);
  }

  update(id: string, updateAlumnoDto: UpdateAlumnoDto) {
    const existingObject = new Alumno();

    if (updateAlumnoDto.nombre) {
      existingObject.nombre = updateAlumnoDto.nombre;
    }

    existingObject.alumnoId = id

    return this.repository.upsertOne(existingObject);
  }

  remove(id: string) {
    return this.repository.deleteById(id);
  }
}
