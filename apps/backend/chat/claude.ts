import { ChatAnthropic } from "@langchain/anthropic"
import { secret } from "encore.dev/config";
import { MessageLimits } from "./message/message.const";

const apiKey = secret("AnthropicApiKey");

const claude = new ChatAnthropic({
    anthropicApiKey: apiKey(),
    model: "claude-haiku-4-5",
    temperature: 0,
    maxTokens: MessageLimits.MaxTokens,
    maxRetries: 2,
});

export default claude;