import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import Dynamo from 'dynamodb-onetable/Dynamo';
import { Table, Entity, Model } from 'dynamodb-onetable';
import Schema from './schema';

/*
    Single-table schema and setup. This is used for general access and by `createTable`
 */
const tableName = 'DriversAppMvpStack-DbTableED196C5F-2JLYN2IVIIPA';
//const tableName = process.env.DB_TABLE;

class BaseEntity {
  protected schema: typeof Schema = Schema;
  protected table: Table;
  protected model: Model<EntityModel>;
  protected entityName: string;

  constructor(params) {
    this.table = new Table({
      name: params.tableName,
      client: new Dynamo({ client: new DynamoDBClient({}) }),
      logger: true,
      schema: Schema
    });
    this.model = this.table.getModel<EntityModel>(params.modelName);
  }

  async create(data): Promise<EntityModel | undefined> {
    console.log(`Creating new ${this.entityName}`);
    try {
      const created: EntityModel = await this.model.create(data, {
        exists: false
      });
      return created;
    } catch (error) {
      console.error('DynamoDB error: ', error);
      return undefined;
    }
  }

  async get(id): Promise<EntityModel | undefined> {
    console.log(`Getting ${this.entityName} with id ${id}`);
    try {
      const item: EntityModel | undefined = await this.model.get(id);
      return item;
    } catch (error) {
      console.error('DynamoDB error: ', error);
      return undefined;
    }
  }

  async list(): Promise<Array<EntityModel> | undefined> {
    console.log(`Listing all elements for ${this.entityName} entity`);
    try {
      const list: Array<EntityModel> = await this.model.find(
        {},
        { index: 'gs1' }
      );
      return list;
    } catch (error) {
      console.error('DynamoDB error: ', error);
      return undefined;
    }
  }

  async update(data): Promise<EntityModel | undefined> {
    console.log(`Updating ${this.entityName} with id ${data.id}`);
    try {
      const updated: EntityModel | undefined = await this.model.update(data, {
        exists: true
      });
      return updated;
    } catch (error) {
      console.error('DynamoDB error: ', error);
      return undefined;
    }
  }

  async delete(id): Promise<EntityModel | undefined> {
    console.log(`Deleting  ${this.entityName} with id ${id}`);
    try {
      const deleted: EntityModel | undefined = await this.model.remove(id, {
        exists: true
      });
      return deleted;
    } catch (error) {
      console.error('DynamoDB error: ', error);
      return undefined;
    }
  }
}

export type VehicleType = Entity<typeof Schema.models.Vehicle>;
export type RouteType = Entity<typeof Schema.models.Route>;
export type CompanyType = Entity<typeof Schema.models.Company>;
export type DriverType = Entity<typeof Schema.models.Driver>;
export type CheckpointType = Entity<typeof Schema.models.Checkpoint>;
export type CheckinType = Entity<typeof Schema.models.Checkin>;
export type EntityModel =
  | VehicleType
  | RouteType
  | CompanyType
  | DriverType
  | CheckpointType
  | CheckinType;
export default BaseEntity;
