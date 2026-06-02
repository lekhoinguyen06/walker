import { claude, claudeBoolean } from "./chat.llm";
import { END, MemorySaver, START, StateGraph, StateSchema } from "@langchain/langgraph";
import log from "encore.dev/log";
import z from "zod";

const State = new StateSchema({
    prompt: z.string(),
    guardrail: z.string(),
    continue: z.boolean().default(true),
    walk: z.boolean().default(false),
    response: z.string().optional(),
})

const workflow = new StateGraph(State)
    .addNode("guardrail", async (state) => {
        // Guardrail
        const passGuardrail = await claudeBoolean.invoke(state.guardrail);
        return {...state, continue: passGuardrail };
    })
    .addNode("process", async (state) => {
        // This node processes the input and generates a response.
        const response = await claude.invoke(state.prompt);
        return { ...state, response: String(response.content) };
    })
    .addNode("decider", async (state) => {
        const shouldWalk = await claudeBoolean.invoke(
            `Based on the following response, should the user walk? 
            DESCRIPTION: You are a decider that determines if the conversation indicates the user need helps guiding on the website.
            ${state.response}`
        );
        return { ...state, walk: shouldWalk };
    })
    .addNode("observe", async (state) => {
        log.info("Observing state:", state);
        return state;
    })
    .addEdge(START, "guardrail")
    .addEdge("guardrail", "process")
    .addEdge("process", "decider")
    .addEdge("decider", "observe")
    .addEdge("observe", END);

const memory = new MemorySaver();

export const graph = workflow.compile({
    checkpointer: memory,
})