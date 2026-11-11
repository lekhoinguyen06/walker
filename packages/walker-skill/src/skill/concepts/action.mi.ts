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
    message: z.string(),
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
.itemId:
  - The id of the target Item that the Walker Client will perform the operation on.
  - The none Flow can accept an empty string.
.body:
  - Some flow might require additional information to perform the operation, you can provide that information in the body.
  - If there is no Flow Schema provided (eg. flow.schema attribute), return an empty object.
  - Note: your body attribute response are not validated on the Walker Server but on the Walker Client. Failed validation will retry and you can see the error message details included in History logs (eg. history.logs attribute).

`,
  {
    viewRefs: ["all"],
  },
);
