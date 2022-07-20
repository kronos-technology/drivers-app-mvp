import {
  Stack,
  StackProps,
  CfnOutput,
  Expiration,
  Duration
} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_cognito as cognito, aws_dynamodb as dynamodb } from 'aws-cdk-lib';
import * as appsync from '@aws-cdk/aws-appsync-alpha';
import {
  ResolverType,
  resolvers as ApiResolvers
} from './api-resolvers/resolver-module';
import { getMappingTemplatePath } from './utils/utils';

// lib/cdk-products-stack.ts
export class DriversAppMvpStack extends Stack {
  apiResolvers: Array<ResolverType> = ApiResolvers;
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const userPool = new cognito.UserPool(this, 'UserPool', {
      selfSignUpEnabled: true,
      accountRecovery: cognito.AccountRecovery.PHONE_AND_EMAIL,
      userVerification: {
        emailStyle: cognito.VerificationEmailStyle.CODE
      },
      autoVerify: {
        email: true
      },
      standardAttributes: {
        email: {
          required: true,
          mutable: true
        }
      }
    });

    const userPoolClient = new cognito.UserPoolClient(this, 'UserPoolClient', {
      userPool
    });

    const api = new appsync.GraphqlApi(this, 'Api', {
      name: 'api',
      logConfig: {
        fieldLogLevel: appsync.FieldLogLevel.ALL
      },
      schema: appsync.Schema.fromAsset('./graphql/schema.graphql'),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
          apiKeyConfig: {
            expires: Expiration.after(Duration.days(365))
          }
        },
        additionalAuthorizationModes: [
          {
            authorizationType: appsync.AuthorizationType.USER_POOL,
            userPoolConfig: {
              userPool
            }
          }
        ]
      },
      xrayEnabled: true
    });

    const dbTable = new dynamodb.Table(this, 'DbTable', {
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      partitionKey: { name: 'pk', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'sk', type: dynamodb.AttributeType.STRING },
      timeToLiveAttribute: 'expire'
    });

    // Add a global secondary index to enable another data access pattern
    dbTable.addGlobalSecondaryIndex({
      indexName: 'gs1',
      partitionKey: {
        name: 'gs1pk',
        type: dynamodb.AttributeType.STRING
      },
      sortKey: {
        name: 'gs1sk',
        type: dynamodb.AttributeType.STRING
      }
    });

    dbTable.addGlobalSecondaryIndex({
      indexName: 'gs2',
      partitionKey: {
        name: 'gs2pk',
        type: dynamodb.AttributeType.STRING
      },
      sortKey: {
        name: 'gs2sk',
        type: dynamodb.AttributeType.STRING
      }
    });

    // AppSync Data Source -> DynamoDB table
    const DDBDataSource = api.addDynamoDbDataSource('DDBDataSource', dbTable);
    const getLatestCheckinFunction = new appsync.AppsyncFunction(
      this,
      'getLatestCheckinFn',
      {
        name: 'getLatestCheckinFunction',
        api,
        dataSource: DDBDataSource,
        requestMappingTemplate: appsync.MappingTemplate.fromFile(
          getMappingTemplatePath('checkin', 'q-get-latest-checkin-req.vtl')
        ),
        responseMappingTemplate: appsync.MappingTemplate.fromFile(
          getMappingTemplatePath('checkin', 'q-get-latest-checkin-res.vtl')
        )
      }
    );

    const updateLastCheckinFunction = new appsync.AppsyncFunction(
      this,
      'updateLastCheckinFn',
      {
        name: 'updateLastCheckinFunction',
        api,
        dataSource: DDBDataSource,
        requestMappingTemplate: appsync.MappingTemplate.fromFile(
          getMappingTemplatePath('checkin', 'm-update-last-checkin-req.vtl')
        ),
        responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem()
      }
    );

    const createCheckinFunction = new appsync.AppsyncFunction(
      this,
      'createCheckinFn',
      {
        name: 'createCheckinFunction',
        api,
        dataSource: DDBDataSource,
        requestMappingTemplate: appsync.MappingTemplate.fromFile(
          getMappingTemplatePath('checkin', 'm-create-checkin-req.vtl')
        ),
        responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem()
      }
    );

    const checkinResolver = new appsync.Resolver(
      this,
      'createCheckinPipeline',
      {
        api,
        typeName: 'Mutation',
        fieldName: 'createCheckin',
        requestMappingTemplate: appsync.MappingTemplate.fromFile(
          getMappingTemplatePath('checkin', 'p-create-checkin-before.vtl')
        ),
        pipelineConfig: [
          getLatestCheckinFunction,
          updateLastCheckinFunction,
          createCheckinFunction
        ],
        responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem()
      }
    );

    // Add resolvers to handle CRUD functionalities against dynamodb
    const apiResolvers = this.apiResolvers.map((r: ResolverType) => {
      DDBDataSource.createResolver(r);
    });

    new CfnOutput(this, 'GraphQLAPIURL', {
      value: api.graphqlUrl
    });

    new CfnOutput(this, 'AppSyncAPIKey', {
      value: api.apiKey || ''
    });

    new CfnOutput(this, 'ProjectRegion', {
      value: this.region
    });

    new CfnOutput(this, 'UserPoolId', {
      value: userPool.userPoolId
    });

    new CfnOutput(this, 'UserPoolClientId', {
      value: userPoolClient.userPoolClientId
    });
  }
}
