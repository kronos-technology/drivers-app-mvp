import { MappingTemplate } from '@aws-cdk/aws-appsync-alpha';
import { Resolver } from './resolver-module';
import { getMappingTemplatePath } from '../utils/utils';

const routeResolvers: Array<Resolver> = [
  {
    typeName: 'Query',
    fieldName: 'getRoute',
    requestMappingTemplate: MappingTemplate.fromFile(
      getMappingTemplatePath('route', 'getRoute.vtl')
    ),
    responseMappingTemplate: MappingTemplate.dynamoDbResultItem()
  },
  {
    typeName: 'Query',
    fieldName: 'getRoutes',
    requestMappingTemplate: MappingTemplate.fromFile(
      getMappingTemplatePath('route', 'getRoutes.vtl')
    ),
    responseMappingTemplate: MappingTemplate.dynamoDbResultList()
  },
  {
    typeName: 'Mutation',
    fieldName: 'createRoute',
    requestMappingTemplate: MappingTemplate.fromFile(
      getMappingTemplatePath('route', 'createRoute.vtl')
    ),
    responseMappingTemplate: MappingTemplate.dynamoDbResultItem()
  },
  {
    typeName: 'Mutation',
    fieldName: 'updateRoute',
    requestMappingTemplate: MappingTemplate.fromFile(
      getMappingTemplatePath('route', 'updateRoute.vtl')
    ),
    responseMappingTemplate: MappingTemplate.dynamoDbResultItem()
  },
  {
    typeName: 'Mutation',
    fieldName: 'deleteRoute',
    requestMappingTemplate: MappingTemplate.fromFile(
      getMappingTemplatePath('route', 'deleteRoute.vtl')
    ),
    responseMappingTemplate: MappingTemplate.dynamoDbResultItem()
  }
];

export { routeResolvers };
