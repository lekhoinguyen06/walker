import { secret } from "encore.dev/config";
import { ChatBedrockConverse } from "@langchain/aws";
import { LLMConfig } from "./type";
import { LLMModel, TokenLimit } from "./const";

const awsRegion = secret("AWSBedrockRegion");
const awsAccessKeyId = secret("AWSBedrockAccessKeyId");
const awsSecretAccessKey = secret("AWSBedrockSecretAccessKey");

export function createBedrock({ model, maxTokens, schema }: Omit<LLMConfig, "provider"> = { model: LLMModel.Bedrock.Gemini.Gemma3["4B"], maxTokens: TokenLimit.Concise}) {
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