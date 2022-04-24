import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as cognito from '@aws-cdk/aws-cognito'

export class DriversAppMvpStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'DriversAppMvpQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
