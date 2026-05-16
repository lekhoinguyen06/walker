import claude from "./walk.llm";
import { END, MemorySaver, START, StateGraph, StateSchema } from "@langchain/langgraph";
import { ActionSchema } from "@repo/core";
import z from "zod";

const State = new StateSchema({
    purpose: z.string(),
    history: z.array(z.string()),
    response: ActionSchema
});

const workflow = new StateGraph(State)
    .addNode("start", async (state) => {
        // This is the starting node of the workflow. It receives the initial input.
        return state;
    })
    .addNode("process", async (state) => {
        // This node processes the input and generates a response.
        const response = await claude.invoke(state.history);

        // Parsing
        const parsed = ActionSchema.safeParse(response.content);
        return { ...state, response: parsed.success ? parsed.data : undefined };
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