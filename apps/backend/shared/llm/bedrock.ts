import { secret } from "encore.dev/config";
import { ChatBedrockConverse } from "@langchain/aws";
import { LLMConfig } from "./type";
import { LLMModel, TokenLimit } from "./const";
import log from "encore.dev/log";

const awsRegion = secret("AWSBedrockRegion");
const awsAccessKeyId = secret("AWSBedrockAccessKeyId");
const awsSecretAccessKey = secret("AWSBedrockSecretAccessKey");


export function createBedrock({ model, maxTokens, schema }: Omit<LLMConfig, "provider"> = { model: LLMModel.Bedrock.Gemini.Gemma3["4B"], maxTokens: TokenLimit.Concise}) {
    log.debug("AWS Config:", {
      region: awsRegion(),
      accessKeyId: awsAccessKeyId()?.slice(0, 8) + "...", // only log first 8 chars for safety
      hasSecret: !!awsSecretAccessKey(),
    });
    const llm = new ChatBedrockConverse({
        model,
        region: awsRegion(),
        credentials: {
            accessKeyId: awsAccessKeyId(),
            secretAccessKey: awsSecretAccessKey(),
        },
    });
    return llm;
}