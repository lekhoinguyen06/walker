import z from "zod";
import type {
  ContextType,
  FlowWithHooksAndHandlerType,
  ActionType,
} from "walker-shared";
import { WalkerError } from "../error";

const InputFlowBodySchema = z.object({
  text: z.string(),
});

const InputFlowBodyJSONSchema = InputFlowBodySchema.toJSONSchema();

const InputFlowBodyJSONSchemaStringified = JSON.stringify(
  InputFlowBodyJSONSchema,
  null,
  2,
);

export type InputFlow = z.infer<typeof InputFlowBodySchema>;

export async function input(
  action: ActionType,
  ctx: ContextType,
): Promise<string | void> {
  console.log("[W][D]: Input Flow: ", action.itemId);
  const el = document.getElementById(action.itemId);
  const child = el?.firstElementChild;

  if (child instanceof HTMLElement) {
    const parsedAction = InputFlowBodySchema.safeParse(action.body);
    if (!parsedAction.success) {
      throw new WalkerError(
        `Input flow failed: Invalid action body for action.itemId: ${action.itemId}. Expected action's body to be of schema: ${InputFlowBodyJSONSchemaStringified}, got: ${JSON.stringify(action.body)}`,
      );
    }

    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value",
    )?.set;
    nativeInputValueSetter?.call(child, parsedAction.data.text);
    child.dispatchEvent(new Event("input", { bubbles: true }));
  } else {
    throw new WalkerError(
      `Input flow failed: No DOM element found for action.itemId: ${action.itemId}`,
    );
  }
}

export const inputFlow: FlowWithHooksAndHandlerType = {
  command: "input",
  description: "Input text into an Item.",
  schema: InputFlowBodyJSONSchemaStringified,
  handler: input,
};
