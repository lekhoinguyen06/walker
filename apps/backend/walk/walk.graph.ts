import claude from "./walk.llm";
import { END, MemorySaver, START, StateGraph, StateSchema } from "@langchain/langgraph";
import { ActionSchema } from "@repo/core";
import z from "zod";

const State = new StateSchema({
    purpose: z.string(),
    history: z.array(z.string()),
    response: ActionSchema.optional(),
});

const workflow = new StateGraph(State)
    .addNode("start", async (state) => {
        return state;
    })
    .addNode("process", async (state) => {
        const response = await claude.invoke(state.purpose);
        return { ...state, response};
    })
    .addNode("end", async (state) => {
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