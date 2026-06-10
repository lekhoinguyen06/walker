import { llm, llmBoolean } from "./chat.llm";
import { END, MemorySaver, START, StateGraph, StateSchema } from "@langchain/langgraph";
import log from "encore.dev/log";
import z from "zod";
import { buildShouldWalkPrompt } from "./chat.prompt";

const State = new StateSchema({
    prompt: z.string(),
    guardrailPrompt: z.string(),
    continue: z.boolean().default(true),
    walk: z.boolean().default(false),
    response: z.string().optional(),
})

const workflow = new StateGraph(State)
    .addNode("guardrail", async (state) => {
        // Guardrail
        const passGuardrail = await llmBoolean.invoke(state.guardrailPrompt);
        return { continue: passGuardrail };
    })
    .addNode("process", async (state) => {
        // This node processes the input and generates a response.
        const response = await llm.invoke(state.prompt);
        return { response: String(response.content) };
    })
    .addNode("decider", async (state) => {
        if (!state.response) {
            return { walk: false };
        }

        const shouldWalk = await llmBoolean.invoke(
            buildShouldWalkPrompt(state.response)
        );
        log.debug("Value of shouldWalk:", shouldWalk);
        return { walk: shouldWalk };
    })
    .addNode("observe", async (state) => {
        // log.info("Observing state:", state);
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