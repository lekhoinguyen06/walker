import { CODE, PAGE, TEXT } from "../../banhmi";

PAGE("concept_history", {});

TEXT(
  `
# History

What you will be provided in a walk request.
  `,
  {
    viewRefs: ["all"],
  },
);

CODE(
  `
export const HistorySchema = z.object({
  prompt: z.string(),
  flow: FlowItemSchema,
  action: ActionSchema,
  map: MapSchema,
  logs: z.array(LogItemSchema),
});

export type HistoryType = z.infer<typeof HistorySchema>;
  `,
  {
    language: "ts",
    viewRefs: ["all"],
  },
);

TEXT(
  `
.flow: the flow executed.
.action: the action executed.
.map: the map of the time the action was executed.
- History map will be the old map, if the user prompt requires stateful walks, you can refer to this history items maps to see what changes.
.logs: the logs of between the time the action was executed and the next walk, attached by Walker Client.
.
`,
  {
    viewRefs: ["all"],
  },
);
