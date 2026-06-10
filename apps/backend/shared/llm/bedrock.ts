import { secret } from "encore.dev/config";
import { ChatBedrockConverse } from "@langchain/aws";

const awsRegion = secret("AWSBedrockRegion");
const awsAccessKeyId = secret("AWSBedrockAccessKeyId");
const awsSecretAccessKey = secret("AWSBedrockSecretAccessKey");

export function createBedrockClient({ model, maxTokens, schema }: { model?: string; maxTokens?: number; schema?: any } = { }) {
    const llm = new ChatBedrockConverse({
        model: "anthropic.claude-3-5-sonnet-20240620-v1:0",
        region: awsRegion(),
        credentials: {
            accessKeyId: awsAccessKeyId(),
            secretAccessKey: awsSecretAccessKey(),
        },
    });
    return llm;
}