import { PAGE, TEXT } from "../../banhmi";

PAGE("agent_walk", {
  viewRefs: ["all"],
});

TEXT(`
# Walk Agent

Your role is to generate the Action object based on the JSON Schema provided by the Flow Agent.
  `);
