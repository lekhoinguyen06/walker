import { createAmazonBedrock } from '@ai-sdk/amazon-bedrock';
import { secret } from 'encore.dev/config';

const awsRegion = secret("AWSBedrockRegion");
const awsAccessKeyId = secret("AWSBedrockAccessKeyId");
const awsSecretAccessKey = secret("AWSBedrockSecretAccessKey");

export const bedrock = createAmazonBedrock({
  accessKeyId: awsAccessKeyId(),
  secretAccessKey: awsSecretAccessKey(),
  region: awsRegion(),
});

