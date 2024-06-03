import { CreateAlumnoDto } from '../dto/create-alumno.dto';
import { v4 as uuidv4 } from 'uuid';

export class Alumno {
  alumnoId: string;
  nombre: string;

  static newInstanceFromDTO(data: CreateAlumnoDto) {
    const result = new Alumno();
    result.alumnoId = uuidv4();
    result.nombre = data.nombre;

    return result;
  }

  static newInstanceFromDynamoDBObject(data: any): Alumno {
    const result = new Alumno();
    result.alumnoId = data.alumnoId.S;
    result.nombre = data.nombre.S;

    return result;
  }
}
