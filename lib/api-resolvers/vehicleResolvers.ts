import { MappingTemplate } from '@aws-cdk/aws-appsync-alpha';
import { ResolverType } from './main';
import { getMappingTemplatePath } from '../utils/utils';

const vehicleResolvers: Array<ResolverType> = [
  {
    typeName: 'Query',
    fieldName: 'getVehicle',
    requestMappingTemplate: MappingTemplate.fromFile(
      getMappingTemplatePath('vehicle', 'getVehicle.vtl')
    ),
    responseMappingTemplate: MappingTemplate.dynamoDbResultItem()
  },
  {
    typeName: 'Query',
    fieldName: 'getVehicles',
    requestMappingTemplate: MappingTemplate.fromFile(
      getMappingTemplatePath('vehicle', 'getVehicles.vtl')
    ),
    responseMappingTemplate: MappingTemplate.dynamoDbResultList()
  },
  {
    typeName: 'Mutation',
    fieldName: 'createVehicle',
    requestMappingTemplate: MappingTemplate.fromFile(
      getMappingTemplatePath('vehicle', 'createVehicle.vtl')
    ),
    responseMappingTemplate: MappingTemplate.dynamoDbResultItem()
  },
  {
    typeName: 'Mutation',
    fieldName: 'updateVehicle',
    requestMappingTemplate: MappingTemplate.fromFile(
      getMappingTemplatePath('vehicle', 'updateVehicle.vtl')
    ),
    responseMappingTemplate: MappingTemplate.dynamoDbResultItem()
  },
  {
    typeName: 'Mutation',
    fieldName: 'deleteVehicle',
    requestMappingTemplate: MappingTemplate.fromFile(
      getMappingTemplatePath('vehicle', 'deleteVehicle.vtl')
    ),
    responseMappingTemplate: MappingTemplate.dynamoDbResultItem()
  }
];

export { vehicleResolvers };
