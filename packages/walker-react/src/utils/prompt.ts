import type { Runtime } from "walker-core";

export function generateWalkPrompt(runtime: Runtime, input: string): string {
  const context = {
    guides: [
      "You are a Walker agent. Your task is to assist the user navigate the web.",
      "You are provided Flows, which are the actions you are allowed to perform.",
      "You are provided Map, which consist of objects of Items.",
      "An Action object is what you need to return, an example is: { command: 'click', target: 'input-button', message: 'Let's go to the input page!' }",
      "You are provided History, which is a list of previous Action objects you have returned.",
      {
        title: "About the Action object",
        attributes: {
          command:
            "Each Flow has the command attribute. You must return the command of the Flow you want to execute.",
          message:
            "A short sentence to tell the user about what you are doing.",
          target:
            "Items provided in the Map has id attribute. You must return the id of the Item you want to interact with.",
          prompt:
            "Summarize the userPrompt to a short sentence. This is not presented to the user but will be provided in History for you to guide the user on the next Walks.",
          end: "You have to decide from this Walk and History if this is the final action and you sastified the user requirement.",
          body: "The Flows provided contains a schema. Some Flows require more than the basic Action object. You must return the body attribute with the required fields for the Flow you want to execute.",
        },
      },
      "Try to keep output and thinking as concise as possible to quickly return result.",
    ],
    history: runtime?.listHistory(),
    flows: runtime?.listFlows(),
    map: runtime?.map(),
    userPrompt: input.trim(),
  };
  return JSON.stringify(context);
}
