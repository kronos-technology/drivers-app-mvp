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
  },
  {
    typeName: 'Mutation',
    fieldName: 'assignRouteInCompany',
    requestMappingTemplate: appsync.MappingTemplate.fromFile(
      getMappingTemplatePath('company', 'm-assign-route-in-company.vtl')
    ),
    responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem()
  },
  {
    typeName: 'Mutation',
    fieldName: 'unassignRouteInCompany',
    requestMappingTemplate: appsync.MappingTemplate.fromFile(
      getMappingTemplatePath('company', 'm-unassign-route-in-company.vtl')
    ),
    responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem()
  }
];

const routeResolvers: Array<Resolver> = [
  {
    typeName: 'Query',
    fieldName: 'getRouteById',
    requestMappingTemplate: appsync.MappingTemplate.fromFile(
      getMappingTemplatePath('route', 'q-get-route-by-id.vtl')
    ),
    responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem()
  },
  {
    typeName: 'Query',
    fieldName: 'listRoutes',
    requestMappingTemplate: appsync.MappingTemplate.fromFile(
      getMappingTemplatePath('route', 'q-list-routes.vtl')
    ),
    responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultList()
  },
  {
    typeName: 'Mutation',
    fieldName: 'createRoute',
    requestMappingTemplate: appsync.MappingTemplate.fromFile(
      getMappingTemplatePath('route', 'm-create-route.vtl')
    ),
    responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem()
  },
  {
    typeName: 'Mutation',
    fieldName: 'updateRoute',
    requestMappingTemplate: appsync.MappingTemplate.fromFile(
      getMappingTemplatePath('route', 'm-update-route.vtl')
    ),
    responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem()
  },
  {
    typeName: 'Mutation',
    fieldName: 'deleteRoute',
    requestMappingTemplate: appsync.MappingTemplate.fromFile(
      getMappingTemplatePath('route', 'm-delete-route.vtl')
    ),
    responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem()
  }
];

const resolvers: Array<Resolver> = driverResolvers.concat(
  companyResolvers,
  routeResolvers
);

export { resolvers };
