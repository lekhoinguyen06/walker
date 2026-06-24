import { END, MemorySaver, START, StateGraph, StateSchema } from "@langchain/langgraph";
import z from "zod";
import { bedrock } from "../shared/llm";
import { generateText, Output } from 'ai';
import { LLMModel } from "../shared/llm";
import { buildPrompt, buildShouldWalkPrompt } from "./chat.prompt";

const ResponseSchema = z.object({
    response: z.string(),
    oneliner: z.string()
});

const WalkSchema = z.object({
    shouldWalk: z.boolean(),
})

const State = new StateSchema({
    history: z.string(),
    prompt: z.string(),
    walk: z.boolean().optional().default(false),
    response: z.string().optional(),
    inputTokens: z.number().default(0),
    outputTokens: z.number().default(0),
})

const workflow = new StateGraph(State)
    .addNode("process", async (state) => {
        const { text, totalUsage } = await generateText({
            model: bedrock(LLMModel.Bedrock.Gemini.Gemma3["12B"]),
            prompt: buildPrompt({ history: state.history, prompt: state.prompt }),
            output: Output.object({
                schema: ResponseSchema
            })
        });

        // const parsed = ResponseSchema.parse(JSON.parse(text));

        return { 
            response: text, 
            inputTokens: totalUsage.inputTokens ? state.inputTokens + totalUsage.inputTokens : state.inputTokens, 
            outputTokens: totalUsage.outputTokens ? state.outputTokens + totalUsage.outputTokens : state.outputTokens 
        };
    })
    .addNode("decider", async (state) => {
        const { text, totalUsage } = await generateText({
            model: bedrock(LLMModel.Bedrock.Gemini.Gemma3["12B"]),
            prompt: buildShouldWalkPrompt({ history: state.history, prompt: state.prompt }),
            output: Output.object({
                schema: WalkSchema
            })
        });

        const parsed = WalkSchema.parse(JSON.parse(text));

        return { 
            walk: parsed.shouldWalk,
            inputTokens: totalUsage.inputTokens ? state.inputTokens + totalUsage.inputTokens : state.inputTokens,
            outputTokens: totalUsage.outputTokens ? state.outputTokens + totalUsage.outputTokens : state.outputTokens
        };
    })
    .addNode("observe", async (state) => {
        console.log("State: ", { state });
        return state;
    })
    .addEdge(START, "process")
    .addEdge("process", "decider")
    .addEdge("decider", "observe")
    .addEdge("observe", END);

const memory = new MemorySaver();

export const graph = workflow.compile({
    checkpointer: memory,
})