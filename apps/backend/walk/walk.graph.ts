import {
  END,
  MemorySaver,
  START,
  StateGraph,
  StateSchema,
} from '@langchain/langgraph';
import { ActionSchema } from '@repo/core';
import { generateText, Output } from 'ai';
import z from 'zod';
import { factoryLLM, LLMProvider } from '../shared/llm';
import { buildWalkPrompt } from './walk.prompt';

const State = new StateSchema({
  history: z.string(),
  prompt: z.string(),
  inputTokens: z.number().default(0),
  outputTokens: z.number().default(0),
  action: ActionSchema.optional(),
});

const workflow = new StateGraph(State)
  .addNode('start', async (state) => {})
  .addNode('process', async (state) => {
    const { text, totalUsage } = await generateText({
      model: factoryLLM(LLMProvider.Bedrock),
      prompt: buildWalkPrompt({
        history: state.history,
        prompt: state.prompt,
      }),
      output: Output.object({
        schema: ActionSchema,
      }),
    });

    const action = ActionSchema.parse(text);

    return {
      action,
      inputTokens: totalUsage.inputTokens
        ? state.inputTokens + totalUsage.inputTokens
        : state.inputTokens,
      outputTokens: totalUsage.outputTokens
        ? state.outputTokens + totalUsage.outputTokens
        : state.outputTokens,
    };
  })
  .addNode('end', async (state) => {})
  .addEdge(START, 'start')
  .addEdge('start', 'process')
  .addEdge('process', 'end')
  .addEdge('end', END);

const memory = new MemorySaver();

export const graph = workflow.compile({
  checkpointer: memory,
});
