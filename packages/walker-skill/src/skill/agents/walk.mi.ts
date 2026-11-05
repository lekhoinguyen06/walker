import { PAGE, TEXT } from "../../banhmi";

PAGE("agent_walk", {});

TEXT(
  `
# Walk Agent

Your role is to generate the Action object based on the JSON Schema provided by the Flow Agent.
  `,
  {
    viewRefs: ["all"],
  },
);
