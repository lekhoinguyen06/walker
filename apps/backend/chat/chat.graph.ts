import {
  END,
  MemorySaver,
  START,
  StateGraph,
  StateSchema,
} from '@langchain/langgraph';
import z from 'zod';
import { generateText, Output } from 'ai';
import { factoryLLM, LLMModel, LLMProvider } from '../shared/llm';
import { buildPrompt, buildShouldWalkPrompt } from './chat.prompt';
import { walk } from '~encore/clients';
import log from 'encore.dev/log';

const ResponseSchema = z.object({
  response: z.string(),
  oneliner: z.string(),
});

const WalkSchema = z.object({
  shouldWalk: z.boolean(),
});

const State = new StateSchema({
  history: z.string(),
  prompt: z.string(),
  walk: z.boolean().optional().default(false),
  response: z.string().optional(),
  inputTokens: z.number().default(0),
  outputTokens: z.number().default(0),
});

const workflow = new StateGraph(State)
  .addNode('process', async (state) => {
    const { text, totalUsage } = await generateText({
      model: factoryLLM(LLMProvider.Bedrock),
      prompt: buildPrompt({ history: state.history, prompt: state.prompt }),
      output: Output.object({
        schema: ResponseSchema,
      }),
    });

    const parsed = ResponseSchema.parse(JSON.parse(text));

    return {
      response: parsed,
      inputTokens: totalUsage.inputTokens
        ? state.inputTokens + totalUsage.inputTokens
        : state.inputTokens,
      outputTokens: totalUsage.outputTokens
        ? state.outputTokens + totalUsage.outputTokens
        : state.outputTokens,
    };
  })
  .addNode('decider', async (state) => {
    const { text, totalUsage } = await generateText({
      model: factoryLLM(LLMProvider.Bedrock),
      prompt: buildShouldWalkPrompt({
        history: state.history,
        prompt: state.prompt,
      }),
      output: Output.object({
        schema: WalkSchema,
      }),
    });

    const parsed = WalkSchema.parse(JSON.parse(text));

    if (parsed.shouldWalk) {
      const stream = await walk.walk({
        executionId: 'test-execution-id',
      });

      await stream.send({
        purpose: 'Explain pricing detail to customer',
        prompt: 'Navigate to pricing page',
        map: '{"navigation-header":{"children":{"link-to-home-page":{"children":{},"options":{"permission":false,"content":{"text":false},"dynamic":false},"content":{}},"link-to-docs-page":{"children":{},"options":{"permission":false,"content":{"text":false},"dynamic":false},"content":{}},"link-to-demo-page":{"children":{},"options":{"permission":false,"content":{"text":false},"dynamic":false},"content":{}},"link-to-github-page":{"children":{},"options":{"permission":false,"content":{"text":false},"dynamic":false},"content":{}},"link-to-pricing-page":{"children":{},"options":{"permission":false,"content":{"text":false},"dynamic":false},"content":{}},"link-to-about-page":{"children":{},"options":{"permission":false,"content":{"text":false},"dynamic":false},"content":{}},"link-to-try-concierge":{"children":{},"options":{"permission":false,"content":{"text":false},"dynamic":false},"content":{}}},"options":{"permission":false,"content":{"text":false},"dynamic":false},"content":{}}}',
        hash: '69e07a8f92b9ae26e56136cb062ffdaf915eb4ef',
      });

      for await (const payload of stream) {
        log.info('Received payload from walk:', { payload });
      }
    }

    return {
      walk: parsed.shouldWalk,
      inputTokens: totalUsage.inputTokens
        ? state.inputTokens + totalUsage.inputTokens
        : state.inputTokens,
      outputTokens: totalUsage.outputTokens
        ? state.outputTokens + totalUsage.outputTokens
        : state.outputTokens,
    };
  })
  .addNode('observe', async (state) => {
    log.info('State: ', { state });
    return state;
  })
  .addEdge(START, 'process')
  .addEdge('process', 'decider')
  .addEdge('decider', 'observe')
  .addEdge('observe', END);

const memory = new MemorySaver();

export const graph = workflow.compile({
  checkpointer: memory,
});
