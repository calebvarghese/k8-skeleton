import { CfnOutput, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam'
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as s3Deployment from 'aws-cdk-lib/aws-s3-deployment'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins'

export class AwsStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);


    // create bucket and cloud formation for portal SPA hosting
    const siteBucket = new s3.Bucket(this, 'site-bucket',{
        websiteIndexDocument: 'index.html',
        websiteErrorDocument: 'index.html',
        removalPolicy: RemovalPolicy.DESTROY,
    })
    const siteDistOAI = new cloudfront.OriginAccessIdentity(this, `${props?.stackName}-site-dist-oai`);
    const siteDistribution =new cloudfront.Distribution(this, `${props?.stackName}-site-dist`, {
      defaultBehavior: { 
                        origin: new origins.S3Origin(siteBucket), 
                        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS
                      },
      defaultRootObject: 'index.html',
      
    });
    siteBucket.addToResourcePolicy(new iam.PolicyStatement({
      actions: ['s3:GetObject'],
      resources: [siteBucket.arnForObjects('*')],
      principals: [new iam.CanonicalUserPrincipal(siteDistOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId)]
    }));
    
    new CfnOutput(this, 'siteBucket',{value: siteBucket.bucketName})
    new CfnOutput(this, 'siteDistribution',{value: siteDistribution.distributionDomainName})
    new CfnOutput(this, 'siteDistributionID',{value: siteDistribution.distributionId})
  }
}