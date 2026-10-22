import {
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type LanguageModel,
} from "ai";
import type { IRequestStrict } from "itty-router";
import type { ChatRequestBodyDTO } from "./chat.dto";

type ChatRequestType = {
  content: ChatRequestBodyDTO;
  ai: LanguageModel;
} & IRequestStrict;

export const chatController = async (req: ChatRequestType) => {
  const result = streamText({
    model: req.ai,
    messages: req.content.messages,
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
};
