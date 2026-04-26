import claude from "./claude";
import { END, MemorySaver, START, StateGraph, StateSchema } from "@langchain/langgraph";
import z from "zod";
import { MessageRole } from "./message/message.const";

const State = new StateSchema({
    history: z.array(z.object({
        role: z.enum([MessageRole.User, MessageRole.Assistant, MessageRole.System]),
        content: z.string(),
    })),
    response: z.string().optional(),
})

const workflow = new StateGraph(State)
    .addNode("start", async (state) => {
        // This is the starting node of the workflow. It receives the initial input.
        return state;
    })
    .addNode("process", async (state) => {
        // This node processes the input and generates a response.
        const response = await claude.invoke(state.history);
        return { ...state, response: String(response.content) };
    })
    .addNode("end", async (state) => {
        // This is the ending node of the workflow. It can perform any finalization if needed.
        return state;
    })
    .addEdge(START, "start")
    .addEdge("start", "process")
    .addEdge("process", "end")
    .addEdge("end", END);

const memory = new MemorySaver();

export const graph = workflow.compile({
    checkpointer: memory,
})