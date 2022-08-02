import { MappingTemplate } from '@aws-cdk/aws-appsync-alpha';
import { getMappingTemplatePath } from '../utils/utils';
import { ResolverType } from './main';

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
    fieldName: 'deleteRouteInCheckpoint',
    requestMappingTemplate: MappingTemplate.fromFile(
      getMappingTemplatePath('checkpoint', 'deleteRouteInCheckpoint.vtl')
    ),
    responseMappingTemplate: MappingTemplate.dynamoDbResultItem()
  }
];

export { checkpointResolvers };
