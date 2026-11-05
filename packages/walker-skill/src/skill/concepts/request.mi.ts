import { CODE, PAGE, TEXT } from "../../banhmi";

PAGE("concept_walk", {});

TEXT(
  `
# Walk Request

What you be provided to you.
  `,
  {
    viewRefs: ["all"],
  },
);

CODE(
  `
export const WalkRequestBodySchema = z.object({
  history: z.array(HistorySchema),
  flows: z.array(FlowItemSchema),
  map: MapSchema,
  skills: z.array(z.string()),
  prompt: z.string(),
});
  `,
  {
    language: "ts",
    viewRefs: ["all"],
  },
);

TEXT(
  `
.prompt: the user's prompt
- A user prompt may be the same over multiple history items. If the user adds something more to the prompt than previous history items, it might mean they are providing more information for you.
.history: a list of history items.
.flows: the flows the Walker Client accepts.
.map: the map current of the Walker Client.
.skills: the context provided for you.
`,
  {
    viewRefs: ["all"],
  },
);
