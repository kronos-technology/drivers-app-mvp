import { DynamoDBClient, ListBackupsCommand } from '@aws-sdk/client-dynamodb';
import { OneTableError, OneTableArgError, Table } from 'dynamodb-onetable';
import Dynamo from 'dynamodb-onetable/Dynamo';
import Schema from './schema';

export type Driver = {
  driverId: String;
  name: String;
  lastName: String;
  companyId: String;
  birthdate: String;
  phone: String;
};
export type DriverUpdate = {
  driverId: String;
  name?: String;
  lastName?: String;
  companyId?: String;
  birthdate?: String;
  phone?: String;
};
const client = new Dynamo({
  client: new DynamoDBClient({})
});
/*
    Single-table schema and setup. This is used for general access and by `createTable`
 */
const tableName = 'DriversAppMvpStack-DbTableED196C5F-2JLYN2IVIIPA';
//const tableName = process.env.DB_TABLE;
const table = new Table({
  name: tableName,
  client: client,
  logger: true,
  schema: Schema
});
const Driver = table.getModel('Driver');

async function create(driverInfo: Driver) {
  console.log('Creating new driver in database');
  try {
    const newDriver = await Driver.create(driverInfo, { exists: false });
    return newDriver;
  } catch (err) {
    console.log('DynamoDB error: ', err);
    return null;
  }
}

async function getById(id: String) {
  console.log('Retreving driver with id: ', id);
  try {
    const driverInfo = await Driver.get({ driverId: id });
    console.log(driverInfo);
    return driverInfo;
  } catch (error) {
    console.log('DynamoDB error: ', error);
    return null;
  }
}

async function list() {
  console.log('Listing drivers in database');
  try {
    const driversList = await Driver.find({}, { index: 'gs1' });
    return driversList;
  } catch (error) {
    console.log('DynamoDB error: ', error);
    return null;
  }
}

async function listByCompany(id: String) {
  console.log('Listing drivers for company ', id);
  try {
    const driversList = await Driver.find({ companyId: id }, { index: 'gs1' });
    return driversList;
  } catch (error) {
    console.log('DynamoDB error: ', error);
    return null;
  }
}

async function update(data: DriverUpdate) {
  console.log('Updating driver ', data.driverId);
  try {
    const driver = await Driver.update(data);
    return driver;
  } catch (error) {
    console.log('DynamoDB error: ', error);
    return null;
  }
}

async function remove(id: String) {
  console.log('Deleting driver ', id);
  try {
    const removed = await Driver.remove({ driverId: id });
    return removed;
  } catch (error) {
    console.log('DynamoDB error: ', error);
    return null;
  }
}
export { list, listByCompany, getById, create, update, remove };
