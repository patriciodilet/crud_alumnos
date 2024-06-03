import {
    AttributeValue,
    DeleteItemCommand,
    DynamoDBClient,
    GetItemCommand,
    PutItemCommand,
    ScanCommand,
  } from '@aws-sdk/client-dynamodb';
  import { Injectable } from '@nestjs/common';
  import { Alumno } from './entities/alumno.entity';
  
  @Injectable()
  export class AlumnosRepository {
    private readonly tableName = 'alumnos';
    private readonly client: DynamoDBClient;
  
    constructor() {
      this.client = new DynamoDBClient({
        region: 'us-east-1',
      });
    }
  
    async findAll() {
      const result: Alumno[] = [];
  
      const command = new ScanCommand({
        TableName: this.tableName,
      });
  
      const response = await this.client.send(command);
  
      if (response.Items) {
        response.Items.forEach((item) => {
          result.push(Alumno.newInstanceFromDynamoDBObject(item));
        });
      }
  
      return result;
    }
  
    async findByAlumnoId(alumnoId: string) {
      const command = new GetItemCommand({
        TableName: this.tableName,
        Key: {
          alumnoId: {
            S: alumnoId,
          },
        },
      });
  
      const result = await this.client.send(command);

      if (result.Item) {
        return Alumno.newInstanceFromDynamoDBObject(result.Item);
      }
  
      return undefined;
    }
  
    async upsertOne(data: Alumno) {
      const itemObject: Record<string, AttributeValue> = {
        alumnoId: {
          S: data.alumnoId,
        },
        nombre: {
            S: data.nombre,
        }
      };
  
  
      const command = new PutItemCommand({
        TableName: this.tableName,
        Item: itemObject,
      });
  
      await this.client.send(command);
  
      return data;
    }
  
    /**
     * Delete item from database
     * @returns true: if object was actually deleted, false otherwise
     */
    async deleteById(alumnoId: string) {
      const command = new DeleteItemCommand({
        TableName: this.tableName,
        Key: {
          alumnoId: {
            S: alumnoId,
          },
        },
        ReturnConsumedCapacity: 'TOTAL',
        ReturnValues: 'ALL_OLD',
      });
  
      const result = await this.client.send(command);
      if (result.Attributes) {
        return true;
      }
      return false;
    }
  }
  