import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import Dynamo from 'dynamodb-onetable/Dynamo';
import { Table } from 'dynamodb-onetable';
import Schema from './schema';

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

export default table;
