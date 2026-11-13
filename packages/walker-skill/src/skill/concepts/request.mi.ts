import { CODE, PAGE, TEXT } from "../../banhmi";

PAGE("concept_walk", {});

TEXT(
  `
# Walk Request

What will be provided to you.
  `,
  {
    viewRefs: ["all"],
  },
);

CODE(
  `
export const WalkRequestBodySchema = z.object({
  histories: z.array(HistoryItemSchema),
  flows: z.array(FlowSchema),
  map: MapSchema,
  skills: z.array(z.string()),
  userPrompt: z.string(),
});
  `,
  {
    language: "ts",
    viewRefs: ["all"],
  },
);

TEXT(
  `
.userPrompt: the user's prompt
.histories: a list of History Item.
.flows: the Flows the Walker Client accepts.
.map: the Map current of the Walker Client.
.skills: the context provided for you, including this document.
`,
  {
    viewRefs: ["all"],
  },
);
