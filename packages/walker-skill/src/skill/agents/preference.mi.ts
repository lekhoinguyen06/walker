import { PAGE, TEXT } from "../../banhmi";

PAGE("agent_preference", {});

TEXT(
  `
# Agent Preference

+ Thinking: minimal to keep response time short, try to response as quickly as possible.
+ Fallback: if you don't know the answer, use the none Flow and ask the user for more information, don't linger on with your thoughts.
  `,
  {
    viewRefs: ["all"],
  },
);
