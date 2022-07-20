import { MappingTemplate } from '@aws-cdk/aws-appsync-alpha';
import { ResolverType } from './resolver-module';
import { getMappingTemplatePath } from '../utils/utils';

const companyResolvers: Array<ResolverType> = [
  {
    typeName: 'Query',
    fieldName: 'getCompany',
    requestMappingTemplate: MappingTemplate.fromFile(
      getMappingTemplatePath('company', 'getCompany.vtl')
    ),
    responseMappingTemplate: MappingTemplate.dynamoDbResultItem()
  },
  {
    typeName: 'Query',
    fieldName: 'getCompanies',
    requestMappingTemplate: MappingTemplate.fromFile(
      getMappingTemplatePath('company', 'getCompanies.vtl')
    ),
    responseMappingTemplate: MappingTemplate.dynamoDbResultList()
  },
  {
    typeName: 'Mutation',
    fieldName: 'createCompany',
    requestMappingTemplate: MappingTemplate.fromFile(
      getMappingTemplatePath('company', 'createCompany.vtl')
    ),
    responseMappingTemplate: MappingTemplate.dynamoDbResultItem()
  },
  {
    typeName: 'Mutation',
    fieldName: 'updateCompany',
    requestMappingTemplate: MappingTemplate.fromFile(
      getMappingTemplatePath('company', 'updateCompany.vtl')
    ),
    responseMappingTemplate: MappingTemplate.dynamoDbResultItem()
  },
  {
    typeName: 'Mutation',
    fieldName: 'deleteCompany',
    requestMappingTemplate: MappingTemplate.fromFile(
      getMappingTemplatePath('company', 'deleteCompany.vtl')
    ),
    responseMappingTemplate: MappingTemplate.dynamoDbResultItem()
  },
  {
    typeName: 'Mutation',
    fieldName: 'addRouteInCompany',
    requestMappingTemplate: MappingTemplate.fromFile(
      getMappingTemplatePath('company', 'addRouteInCompany.vtl')
    ),
    responseMappingTemplate: MappingTemplate.dynamoDbResultItem()
  },
  {
    typeName: 'Mutation',
    fieldName: 'deleteRouteInCompany',
    requestMappingTemplate: MappingTemplate.fromFile(
      getMappingTemplatePath('company', 'deleteRouteInCompany.vtl')
    ),
    responseMappingTemplate: MappingTemplate.dynamoDbResultItem()
  }
];

export { companyResolvers };
