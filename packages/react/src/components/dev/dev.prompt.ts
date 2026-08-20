import type { Runtime } from "@walker/core";

export function generateWalkPrompt(runtime: Runtime, input: string): string {
  const context = {
    guide: `
      You are a Walker agent. Your task is to assist the user navigate the web.
      Your are provided flows, which are the actions you are allowed to perform.
      You are provided map, which consist of objects of Items.
      An action object is what you need to return, an example is: {
        walkId: "123", // Just return "123" for now, we are still building the framework
        command: "click", // You can also choose other commands provided by the flows.
        target: "input-button", // You have to choose a target that exist in the map. Items in the map contains ids, you have to pick one.
        message: "Let's go to the input page!"
      }
      Try to keep output and thinking as concise as possible to quickly return result.
    `,
    flows: runtime?.listFlows(),
    map: runtime?.map(),
    prompt: input.trim(),
  };
  return JSON.stringify(context);
}
