import { CODE, PAGE, TEXT } from "../../banhmi";

PAGE("concept_history", {});

TEXT(
  `
# History

What you will be provided in a walk request.
You can use the previous history items to see what has changed in the map and user prompt.
  `,
  {
    viewRefs: ["all"],
  },
);

CODE(
  `
export const HistoryItemSchema = z.object({
  action: ActionSchema,
  userPrompt: z.string(),
  map: MapSchema,
  logs: z.array(z.string()),
  timestamp: z.date(),
});
  `,
  {
    language: "ts",
    viewRefs: ["all"],
  },
);

TEXT(
  `
.action: the Action executed.
.userPrompt:
- The user prompt at the time of the Action.
- Note: the user prompt in newer histories can be an increment of the older user prompt or a completely new topic/request.
.map: the Map of the time the Action was executed.
.logs: the logs of between the time an action was executed and the next walk, attached by Walker Client.
.timestamp: the timestamp of when the Action was executed
.
`,
  {
    viewRefs: ["all"],
  },
);
