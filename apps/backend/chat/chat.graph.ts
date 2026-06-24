import { END, MemorySaver, START, StateGraph, StateSchema } from "@langchain/langgraph";
import z from "zod";
import { bedrock } from "../shared/llm/bedrock.llm";
import { generateText } from 'ai';
import { LLMModel } from "../shared/llm";


const State = new StateSchema({
    history: z.string(),
    prompt: z.string(),
    continue: z.boolean().default(true),
    walk: z.boolean().default(false),
    response: z.string().optional(),
})

const workflow = new StateGraph(State)
    .addNode("guardrail", async (state) => {
    })
    .addNode("process", async (state) => {
        const { text } = await generateText({
            model: bedrock(LLMModel.Bedrock.Gemini.Gemma3["12B"]),
            prompt: state.prompt,
        });

        return { response: text };
    })
    .addNode("decider", async (state) => {
    })
    .addNode("observe", async (state) => {
        console.log("State: ", { state });
        return state;
    })
    .addEdge(START, "guardrail")
    .addEdge(START, "process")
    .addEdge("guardrail", "decider")
    .addEdge("process", "decider")
    .addEdge("decider", "observe")
    .addEdge("observe", END);

const memory = new MemorySaver();

export const graph = workflow.compile({
    checkpointer: memory,
})