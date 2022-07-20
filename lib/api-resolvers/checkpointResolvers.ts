import { MappingTemplate } from '@aws-cdk/aws-appsync-alpha';
import { getMappingTemplatePath } from '../utils/utils';
import { ResolverType } from './resolver-module';

const checkpointResolvers: Array<ResolverType> = [
  {
    typeName: 'Query',
    fieldName: 'getCheckpoint',
    requestMappingTemplate: MappingTemplate.fromFile(
      getMappingTemplatePath('checkpoint', 'getCheckpoint.vtl')
    ),
    responseMappingTemplate: MappingTemplate.dynamoDbResultItem()
  },
  {
    typeName: 'Query',
    fieldName: 'getCheckpoints',
    requestMappingTemplate: MappingTemplate.fromFile(
      getMappingTemplatePath('checkpoint', 'getCheckpoints.vtl')
    ),
    responseMappingTemplate: MappingTemplate.dynamoDbResultList()
  },
  {
    typeName: 'Mutation',
    fieldName: 'createCheckpoint',
    requestMappingTemplate: MappingTemplate.fromFile(
      getMappingTemplatePath('checkpoint', 'createCheckpoint.vtl')
    ),
    responseMappingTemplate: MappingTemplate.dynamoDbResultItem()
  },
  {
    typeName: 'Mutation',
    fieldName: 'updateCheckpoint',
    requestMappingTemplate: MappingTemplate.fromFile(
      getMappingTemplatePath('checkpoint', 'updateCheckpoint.vtl')
    ),
    responseMappingTemplate: MappingTemplate.dynamoDbResultItem()
  },
  {
    typeName: 'Mutation',
    fieldName: 'deleteCheckpoint',
    requestMappingTemplate: MappingTemplate.fromFile(
      getMappingTemplatePath('checkpoint', 'deleteCheckpoint.vtl')
    ),
    responseMappingTemplate: MappingTemplate.dynamoDbResultItem()
  },
  {
    typeName: 'Mutation',
    fieldName: 'addRouteInCheckpoint',
    requestMappingTemplate: MappingTemplate.fromFile(
      getMappingTemplatePath('checkpoint', 'addRouteInCheckpoint.vtl')
    ),
    responseMappingTemplate: MappingTemplate.dynamoDbResultItem()
  },
  {
    typeName: 'Mutation',
    fieldName: 'removeRouteInCheckpoint',
    requestMappingTemplate: MappingTemplate.fromFile(
      getMappingTemplatePath('checkpoint', 'removeRouteInCheckpoint.vtl')
    ),
    responseMappingTemplate: MappingTemplate.dynamoDbResultItem()
  }
];

export { checkpointResolvers };
