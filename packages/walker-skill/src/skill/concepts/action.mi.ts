import { CODE, PAGE, TEXT } from "../../banhmi";

PAGE("concept_action", {});

TEXT(
  `
# Action

An object that command the Walker Client to perform an operation.
  `,
  {
    viewRefs: ["all"],
  },
);

CODE(
  `
export const ActionSchema = z
  .object({
    itemId: z.string(),
    flowCommand: z.string(),
    agentMessage: z.string(),
    userMessage: z.string(),
    systemMessage: z.string(),
    body: z.record(z.string(), z.unknown()),
  })
  .loose();
  `,
  { language: "ts", viewRefs: ["all"] },
);

TEXT(
  `
.flowCommand:
  - From the Flow list, the command that the Walker Client will execute.
  - You must pick one of the flow.command provided, if you don't know which one to pick, use the none Flow.
.message:
  - A message that will be shown to the user on the Walker Client.
  - You must provide a message, if you don't know what to say, use \"I don't know\" or \"I need more information\".
.targetId:
  - The id of the target Item that the Walker Client will perform the operation on.
  - The none Flow can accept an empty string.
.next:
  - The information you want to pass on for the next Agent. As you can only return one Action, you can use this field to pass on information for the next Agent to use.
`,
  {
    viewRefs: ["all"],
  },
);
