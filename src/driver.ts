import { DynamoDBClient, ListBackupsCommand } from '@aws-sdk/client-dynamodb';
import { OneTableError, OneTableArgError, Table } from 'dynamodb-onetable';
import Dynamo from 'dynamodb-onetable/Dynamo';
import Schema from './schema';

type Driver = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  inventory: number;
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

async function createDriver(driver_data) {
  console.log('Creating new driver in database');
  try {
    const newDriver = await Driver.create(driver_data);
    return newDriver;
  } catch (err) {
    console.log('DynamoDB error: ', err);
    return null;
  }
}

async function getDriverById(id) {
  console.log('Retreving driver with id: ', id);
  try {
    const driverInfo = await Driver.get({ driver_id: id });
    console.log(driverInfo);
    return driverInfo;
  } catch (error) {
    console.log('DynamoDB error: ', error);
    return null;
  }
}

async function listDrivers() {
  console.log('Listing drivers in database');
  try {
    //const driversList = await Driver.find({});

    const driversList = await Driver.find({}, { index: 'gs1' });

    console.log(driversList);
    return driversList;
  } catch (error) {
    console.log('DynamoDB error: ', error);
    return null;
  }
}

async function listDriversByCompany(id) {
  console.log('Listing drivers for company', id);
  try {
    //const driversList = await Driver.find({});

    const driversList = await Driver.find({ company_id: id }, { index: 'gs1' });

    console.log(driversList);
    return driversList;
  } catch (error) {
    console.log('DynamoDB error: ', error);
    return null;
  }
}

export { listDrivers, listDriversByCompany, getDriverById, createDriver };
export default Driver;
