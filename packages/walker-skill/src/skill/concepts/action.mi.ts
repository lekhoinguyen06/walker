import { CODE, PAGE, TEXT } from "../../banhmi";

PAGE("concept_action", {
  viewRefs: ["all"],
});

TEXT(`
# Action

An object that command the Walker Client to perform an operation.
  `);

CODE(
  `
export const ActionSchema = z
  .object({
    flow: z.string(),
    message: z.string(),
    targetId: z.string(),
    next: z.string(),
  })
  .loose();

export const ActionListSchema = z.array(ActionSchema);

export type ActionType<T = any> = z.infer<typeof ActionSchema> & {
  body?: T;
};
  `,
  { language: "ts" },
);
