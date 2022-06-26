// lib/cdk-products-stack.ts

import {
  Stack,
  StackProps,
  CfnOutput,
  Expiration,
  Duration
} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {
  aws_cognito as cognito,
  aws_dynamodb as dynamodb,
  aws_lambda_nodejs as lambda
} from 'aws-cdk-lib';
import * as sfn from 'aws-cdk-lib/aws-stepfunctions';
import * as tasks from 'aws-cdk-lib/aws-stepfunctions-tasks';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import * as appsync from '@aws-cdk/aws-appsync-alpha';
import { Role, ServicePrincipal, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import * as path from 'path';
import { queries as ApiQueries } from './queries';
import { mutations as ApiMutations } from './mutations';

const START_EXECUTION_REQUEST_TEMPLATE = (stateMachineArn: String) => {
  return `
  {
    "version": "2018-05-29",
    "method": "POST",
    "resourcePath": "/",
    "params": {
      "headers": {
        "content-type": "application/x-amz-json-1.0",
        "x-amz-target":"AWSStepFunctions.StartSyncExecution"
      },
      "body": {
        "stateMachineArn": "${stateMachineArn}",
        "name" : "$context.args.execution.name",
        "input": "{ \\\"input\\\": \\\"$context.args.execution.input\\\"}"
      }
    }
  }
`;
};

const RESPONSE_TEMPLATE = `
## Raise a GraphQL field error in case of a datasource invocation error
#if($ctx.error)
  $util.error($ctx.error.message, $ctx.error.type)
#end
## if the response status code is not 200, then return an error. Else return the body **
#if($ctx.result.statusCode == 200)
    ## If response is 200, return the body.
  $ctx.result.body
#else
    ## If response is not 200, append the response to error block.
    $utils.appendError($ctx.result.body, $ctx.result.statusCode)
#end
`;

// lib/cdk-products-stack.ts
export class DriversAppMvpStack extends Stack {
  apiQueries: Array<string> = ApiQueries;
  apiMutations: Array<string> = ApiMutations;
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
      }
    });

    const appsyncStepFunctionsRole = new Role(this, 'SyncStateMachineRole', {
      assumedBy: new ServicePrincipal('appsync.amazonaws.com')
    });
    appsyncStepFunctionsRole.addToPolicy(
      new PolicyStatement({
        resources: ['*'],
        actions: ['states:StartSyncExecution']
      })
    );

    const endpoint = 'https://sync-states.' + this.region + '.amazonaws.com/';
    const httpdatasource = api.addHttpDataSource(
      'StepFunctionsStateMachine',
      endpoint,
      {
        authorizationConfig: {
          signingRegion: this.region,
          signingServiceName: 'states'
        }
      }
    );

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

    // Create the function for handling CRUD Operations
    const appsyncHandlerLambda: lambda.NodejsFunction =
      new lambda.NodejsFunction(this, 'ApiLambdaResolver', {
        runtime: Runtime.NODEJS_16_X,
        handler: 'handler',
        entry: path.join(__dirname, '../src/lambda/api/main.ts'),
        environment: {
          TABLE_NAME: dbTable.tableName
        }
      });

    // Set the new Lambda function as a data source for the AppSync API
    const lambdaDs = api.addLambdaDataSource(
      'lambdaDatasource',
      appsyncHandlerLambda
    );

    const queryResolvers = this.apiQueries.map((field) => {
      lambdaDs.createResolver({ typeName: 'Query', fieldName: field });
    });

    const mutationResolvers = this.apiMutations.map((field) => {
      lambdaDs.createResolver({ typeName: 'Mutation', fieldName: field });
    });

    // Enable the Lambda function to access the DynamoDB table (using IAM)
    dbTable.grantFullAccess(appsyncHandlerLambda);

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
