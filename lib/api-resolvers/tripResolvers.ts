import { MappingTemplate } from '@aws-cdk/aws-appsync-alpha';
import { ResolverType } from './resolver-module';
import { getMappingTemplatePath } from '../utils/utils';

const tripResolvers: Array<ResolverType> = [
  {
    typeName: 'Query',
    fieldName: 'getTrip',
    requestMappingTemplate: MappingTemplate.fromFile(
      getMappingTemplatePath('trip', 'getTrip.vtl')
    ),
    responseMappingTemplate: MappingTemplate.dynamoDbResultItem()
  },
  {
    typeName: 'Query',
    fieldName: 'getTrips',
    requestMappingTemplate: MappingTemplate.fromFile(
      getMappingTemplatePath('trip', 'getTrips.vtl')
    ),
    responseMappingTemplate: MappingTemplate.dynamoDbResultList()
  },
  {
    typeName: 'Mutation',
    fieldName: 'createTrips',
    requestMappingTemplate: MappingTemplate.fromFile(
      getMappingTemplatePath('trip', 'createTrip.vtl')
    ),
    responseMappingTemplate: MappingTemplate.dynamoDbResultItem()
  },
  {
    typeName: 'Mutation',
    fieldName: 'updateTrip',
    requestMappingTemplate: MappingTemplate.fromFile(
      getMappingTemplatePath('trip', 'updateTrip.vtl')
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

export { tripResolvers };
