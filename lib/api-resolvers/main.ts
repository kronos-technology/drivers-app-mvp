import { checkpointResolvers } from './checkpointResolvers';
import { companyResolvers } from './companyResolvers';
import { driverResolvers } from './driverResolvers';
import { routeResolvers } from './routeResolvers';
import { ticketResolvers } from './ticketResolvers';
import { tripResolvers } from './tripResolvers';

import { AppsyncFunction, MappingTemplate } from '@aws-cdk/aws-appsync-alpha';

export type ResolverType = {
  typeName: string;
  fieldName: string;
  requestMappingTemplate: MappingTemplate;
  responseMappingTemplate: MappingTemplate;
  pipelineConfig?: Array<AppsyncFunction>;
};

const resolvers: Array<ResolverType> = checkpointResolvers.concat(
  companyResolvers,
  driverResolvers,
  routeResolvers,
  ticketResolvers,
  tripResolvers
);

export { resolvers };
