// lib/cdk-products-stack.ts
import * as cdk from '@aws-cdk/core'
import * as cognito from '@aws-cdk/aws-cognito'
import * as appsync from '@aws-cdk/aws-appsync'
import * as ddb from '@aws-cdk/aws-dynamodb'
import * as lambda from '@aws-cdk/aws-lambda'

// lib/cdk-products-stack.ts
export class DriversAppMvpStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const userPool = new cognito.UserPool(this, 'user-pool', {
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
    })

    const userPoolClient = new cognito.UserPoolClient(this, "UserPoolClient", {
      userPool
    })

    const api = new appsync.GraphqlApi(this, 'drivers', {
      name: "cdk-product-api",
      logConfig: {
        fieldLogLevel: appsync.FieldLogLevel.ALL,
      },
      schema: appsync.Schema.fromAsset('./graphql/schema.graphql'),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
          apiKeyConfig: {
            expires: cdk.Expiration.after(cdk.Duration.days(365))
          }
        },
        additionalAuthorizationModes: [{
          authorizationType: appsync.AuthorizationType.USER_POOL,
          userPoolConfig: {
            userPool,
          }
        }]
      },
    })

    // Create the function
    const productLambda = new lambda.Function(this, 'AppSyncProductHandler', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'main.handler',
      code: lambda.Code.fromAsset('lambda-fns'),
      memorySize: 1024
    })

    // Set the new Lambda function as a data source for the AppSync API
    const lambdaDs = api.addLambdaDataSource('lambdaDatasource', productLambda)

    lambdaDs.createResolver({
      typeName: "Query",
      fieldName: "getProductById"
    })

    lambdaDs.createResolver({
      typeName: "Query",
      fieldName: "listProducts"
    })

    lambdaDs.createResolver({
      typeName: "Query",
      fieldName: "productsByCategory"
    })

    lambdaDs.createResolver({
      typeName: "Mutation",
      fieldName: "createProduct"
    })

    lambdaDs.createResolver({
      typeName: "Mutation",
      fieldName: "deleteProduct"
    })

    lambdaDs.createResolver({
      typeName: "Mutation",
      fieldName: "updateProduct"
    })

    const productTable = new ddb.Table(this, 'CDKProductTable', {
      billingMode: ddb.BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: 'id',
        type: ddb.AttributeType.STRING,
      },
    })

    // Add a global secondary index to enable another data access pattern
    productTable.addGlobalSecondaryIndex({
      indexName: "productsByCategory",
      partitionKey: {
        name: "category",
        type: ddb.AttributeType.STRING,
      }
    })

    // Enable the Lambda function to access the DynamoDB table (using IAM)
    productTable.grantFullAccess(productLambda)

    // Create an environment variable that we will use in the function code
    productLambda.addEnvironment('PRODUCT_TABLE', productTable.tableName)

    new cdk.CfnOutput(this, "GraphQLAPIURL", {
      value: api.graphqlUrl
    })

    new cdk.CfnOutput(this, 'AppSyncAPIKey', {
      value: api.apiKey || ''
    })

    new cdk.CfnOutput(this, 'ProjectRegion', {
      value: this.region
    })

    new cdk.CfnOutput(this, "UserPoolId", {
      value: userPool.userPoolId
    })

    new cdk.CfnOutput(this, "UserPoolClientId", {
      value: userPoolClient.userPoolClientId
    })
  }

  }
