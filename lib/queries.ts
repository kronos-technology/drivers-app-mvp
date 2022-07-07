import * as appsync from '@aws-cdk/aws-appsync-alpha';
import { getMappingTemplatePath } from './utils/utils';
export type Resolver = {
  typeName: string;
  fieldName: string;
  requestMappingTemplate: appsync.MappingTemplate;
  responseMappingTemplate: appsync.MappingTemplate;
};

const driverResolvers: Array<Resolver> = [
  {
    typeName: 'Query',
    fieldName: 'getDriverById',
    requestMappingTemplate: appsync.MappingTemplate.fromFile(
      getMappingTemplatePath('driver', 'q-get-driver-by-id.vtl')
    ),
    responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem()
  },
  {
    typeName: 'Query',
    fieldName: 'listDrivers',
    requestMappingTemplate: appsync.MappingTemplate.fromFile(
      getMappingTemplatePath('driver', 'q-list-drivers.vtl')
    ),
    responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultList()
  },
  {
    typeName: 'Mutation',
    fieldName: 'createDriver',
    requestMappingTemplate: appsync.MappingTemplate.fromFile(
      getMappingTemplatePath('driver', 'm-create-driver.vtl')
    ),
    responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem()
  },
  {
    typeName: 'Mutation',
    fieldName: 'updateDriver',
    requestMappingTemplate: appsync.MappingTemplate.fromFile(
      getMappingTemplatePath('driver', 'm-update-driver.vtl')
    ),
    responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem()
  },
  {
    typeName: 'Mutation',
    fieldName: 'deleteDriver',
    requestMappingTemplate: appsync.MappingTemplate.fromFile(
      getMappingTemplatePath('driver', 'm-delete-driver.vtl')
    ),
    responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem()
  }
];

const companyResolvers: Array<Resolver> = [
  {
    typeName: 'Query',
    fieldName: 'getCompanyById',
    requestMappingTemplate: appsync.MappingTemplate.fromFile(
      getMappingTemplatePath('company', 'q-get-company-by-id.vtl')
    ),
    responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem()
  },
  {
    typeName: 'Query',
    fieldName: 'listCompanies',
    requestMappingTemplate: appsync.MappingTemplate.fromFile(
      getMappingTemplatePath('company', 'q-list-companies.vtl')
    ),
    responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultList()
  },
  {
    typeName: 'Mutation',
    fieldName: 'createCompany',
    requestMappingTemplate: appsync.MappingTemplate.fromFile(
      getMappingTemplatePath('company', 'm-create-company.vtl')
    ),
    responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem()
  },
  {
    typeName: 'Mutation',
    fieldName: 'updateCompany',
    requestMappingTemplate: appsync.MappingTemplate.fromFile(
      getMappingTemplatePath('company', 'm-update-company.vtl')
    ),
    responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem()
  },
  {
    typeName: 'Mutation',
    fieldName: 'deleteCompany',
    requestMappingTemplate: appsync.MappingTemplate.fromFile(
      getMappingTemplatePath('company', 'm-delete-company.vtl')
    ),
    responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem()
  }
];
const driverQueries = ['getDriverById', 'listDrivers', 'driversByCompany'];

const vehicleQueries = [
  'getVehicleByPlate',
  'listVehicles',
  'vehiclesByCompany'
];

const companyQueries = ['getCompanyById', 'listCompanies', 'routesInCompany'];

const routeQueries = [
  'getRouteById',
  'listRoutes',
  'routesByOrigin',
  'routesByDestination'
];

const checkpointQueries = [
  'getCheckpointById',
  'listCheckpoints',
  'routesInCheckpoint'
];

const checkinQueries = [
  'getCheckinById',
  'checkinHistory',
  'checkinHistoryByRoute'
];

const queries: Array<string> = driverQueries.concat(
  vehicleQueries,
  companyQueries,
  routeQueries,
  checkinQueries,
  checkpointQueries
);

const resolvers: Array<Resolver> = driverResolvers.concat(companyResolvers);
export { queries, resolvers };
