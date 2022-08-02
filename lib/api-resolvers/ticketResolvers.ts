import { MappingTemplate } from '@aws-cdk/aws-appsync-alpha';
import { ResolverType } from './main';
import { getMappingTemplatePath } from '../utils/utils';

const ticketResolvers: Array<ResolverType> = [
  {
    typeName: 'Query',
    fieldName: 'getTicket',
    requestMappingTemplate: MappingTemplate.fromFile(
      getMappingTemplatePath('ticket', 'getTicket.vtl')
    ),
    responseMappingTemplate: MappingTemplate.dynamoDbResultItem()
  },
  {
    typeName: 'Query',
    fieldName: 'getTickets',
    requestMappingTemplate: MappingTemplate.fromFile(
      getMappingTemplatePath('ticket', 'getTickets.vtl')
    ),
    responseMappingTemplate: MappingTemplate.dynamoDbResultList()
  },
  {
    typeName: 'Mutation',
    fieldName: 'updateTicket',
    requestMappingTemplate: MappingTemplate.fromFile(
      getMappingTemplatePath('ticket', 'updateTicket.vtl')
    ),
    responseMappingTemplate: MappingTemplate.dynamoDbResultItem()
  },
  {
    typeName: 'Mutation',
    fieldName: 'deleteTicket',
    requestMappingTemplate: MappingTemplate.fromFile(
      getMappingTemplatePath('ticket', 'deleteTicket.vtl')
    ),
    responseMappingTemplate: MappingTemplate.dynamoDbResultItem()
  }
];
export { ticketResolvers };
