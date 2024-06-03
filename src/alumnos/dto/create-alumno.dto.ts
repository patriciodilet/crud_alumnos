import {  IsString, MinLength } from 'class-validator';

export class CreateAlumnoDto {

    @IsString()
    @MinLength(1)
    nombre: string
}


