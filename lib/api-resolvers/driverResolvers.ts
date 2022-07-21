import { MappingTemplate } from '@aws-cdk/aws-appsync-alpha';
import { ResolverType } from './main';
import { getMappingTemplatePath } from '../utils/utils';

const driverResolvers: Array<ResolverType> = [
  {
    typeName: 'Query',
    fieldName: 'getDriver',
    requestMappingTemplate: MappingTemplate.fromFile(
      getMappingTemplatePath('driver', 'getDriver.vtl')
    ),
    responseMappingTemplate: MappingTemplate.dynamoDbResultItem()
  },
  {
    typeName: 'Query',
    fieldName: 'getDrivers',
    requestMappingTemplate: MappingTemplate.fromFile(
      getMappingTemplatePath('driver', 'getDrivers.vtl')
    ),
    responseMappingTemplate: MappingTemplate.dynamoDbResultList()
  },
  {
    typeName: 'Mutation',
    fieldName: 'createDriver',
    requestMappingTemplate: MappingTemplate.fromFile(
      getMappingTemplatePath('driver', 'createDriver.vtl')
    ),
    responseMappingTemplate: MappingTemplate.dynamoDbResultItem()
  },
  {
    typeName: 'Mutation',
    fieldName: 'updateDriver',
    requestMappingTemplate: MappingTemplate.fromFile(
      getMappingTemplatePath('driver', 'updateDriver.vtl')
    ),
    responseMappingTemplate: MappingTemplate.dynamoDbResultItem()
  },
  {
    typeName: 'Mutation',
    fieldName: 'deleteDriver',
    requestMappingTemplate: MappingTemplate.fromFile(
      getMappingTemplatePath('driver', 'deleteDriver.vtl')
    ),
    responseMappingTemplate: MappingTemplate.dynamoDbResultItem()
  }
];

export { driverResolvers };
