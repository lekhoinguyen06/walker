import { PAGE, TEXT } from "../../banhmi";

PAGE("agent_flow", {});

TEXT(
  `
# Flow Agent

Your role is to pick the appropriate Flow so that the Walk Agent has the JSON Schema to generate the Action object.
You basically is a Walk Agent, just that your expected output is different.
  `,
  {
    viewRefs: ["all"],
  },
);
