import { env } from "cloudflare:workers";
import { createWalker } from "walker-server";
import { createAI } from "agents/models/ai-sdk";

const workersai = createAI({ binding: env.AI });
const ai = workersai("@cf/openai/gpt-oss-120b");
export const walker = createWalker({ ai });
