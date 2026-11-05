import { CODE, PAGE, TEXT } from "../../banhmi";

PAGE("concept_history", {
  viewRefs: ["all"],
});

TEXT(`
# History

What you will be provided in a walk request.
  `);

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
  },
);
