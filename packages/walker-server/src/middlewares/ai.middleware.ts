import type { LanguageModel } from "ai";
import type { RequestHandler } from "itty-router";

type RequestWithAI = {
  ai: LanguageModel;
};

export function withAI(ai: LanguageModel): RequestHandler<RequestWithAI> {
  return async (req) => {
    req.ai = ai;
  };
}
