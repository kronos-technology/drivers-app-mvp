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
  protected schema = Schema;
  protected table: Table;
  protected model: Model<EntityModel>;
  protected _entity: string;
  public idField: string;

  constructor(params) {
    if (!params.tableName) {
      params.tableName = tableName;
    }
    this.table = new Table({
      name: params.tableName,
      client: new Dynamo({
        client: new DynamoDBClient({})
      }),
      logger: true,
      schema: Schema
    });
    this._entity = params.modelName;
    this.model = this.table.getModel<EntityModel>(params.modelName);
    this.idField = params.idField;
  }

  public get entity() {
    return this._entity.toLowerCase();
  }

  async create(data): Promise<EntityModel | Response> {
    console.log(
      `Creating new ${this.entity}: ${JSON.stringify(data, null, 2)}`
    );
    try {
      const created: EntityModel = await this.model.create(data, {
        exists: false
      });
      return created;
    } catch (error) {
      console.error('DynamoDB error: ', error);
      if (error == 'ConditionalCheckFailedException') {
        return { statusCode: 400, body: `${this.entity} already exists` };
      }
      return { statusCode: 500, body: `Internal Error` };
    }
  }

  async get(id): Promise<EntityModel | undefined> {
    console.log(`Getting ${this.entity} with id ${id}`);
    try {
      let idObject = {};
      idObject[this.idField] = id;
      const item: EntityModel | undefined = await this.model.get(idObject);
      return item;
    } catch (error) {
      console.error('DynamoDB error: ', error);
      return undefined;
    }
  }

  async list(): Promise<Array<EntityModel> | undefined> {
    console.log(`Listing all items for ${this.entity}`);
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
    console.log(`Updating ${this.entity} with id ${data}`);
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

  async delete(id: string): Promise<EntityModel | undefined> {
    console.log(`Deleting ${this.entity} with id ${id}`);
    let idObject = {};
    idObject[this.idField] = id;
    try {
      const deleted: EntityModel | undefined = await this.model.remove(
        idObject,
        {
          exists: true
        }
      );
      return deleted;
    } catch (error) {
      console.error('DynamoDB error: ', error);
      return undefined;
    }
  }
}

export type Response = {
  statusCode: number;
  body: string;
  headers?: string;
};
type _vehicleType = Entity<typeof Schema.models.VEHICLE>;
type _routeType = Entity<typeof Schema.models.ROUTE>;
type _companyType = Entity<typeof Schema.models.COMPANY>;
type _driverType = Entity<typeof Schema.models.DRIVER>;
type _checkpointType = Entity<typeof Schema.models.CHECKPOINT>;
type _checkinType = Entity<typeof Schema.models.CHECKIN>;

export type EntityModel =
  | _vehicleType
  | _routeType
  | _companyType
  | _driverType
  | _checkpointType
  | _checkinType;

export type VehicleType = {
  plate: string;
  status: string;
  number: string;
  companyId: string;
  currentDriverId?: string;
};

export type RouteType = {
  routeId: string;
  origin: string;
  intermediates?: Array<string>;
  destination: string;
  geojson: string;
};

export type DriverType = {
  driverId: string;
  name: string;
  lastName: string;
  companyId: string;
  birthdate: string;
  phone: string;
};

export type CompanyType = {
  companyId: string;
  name: string;
  phone: string;
  address?: string;
  email?: string;
  city: string;
};

export type CheckpointType = {
  checkpointId: string;
  latitude: string;
  longitude: string;
  geohash: string;
  city: string;
  description: string;
};

export type CheckinType = {
  checkpointId: string;
  routeId: string;
  timestamp: string;
  plate: string;
  driverId: string;
  companyId: string;
  vehicleNumber: string;
};

export default BaseEntity;
