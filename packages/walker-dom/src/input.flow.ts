import z from "zod";
import { scrollHook } from "./scroll.hook";
import type { ContextType } from "./type";
import type { ActionType, FlowType } from "walker-shared";

type InputProps = {
  input: string;
};

const InputPropsSchema = z.object({
  input: z.string(),
});

function validate(action: ActionType): action is ActionType & {
  body: InputProps;
} {
  const result = InputPropsSchema.safeParse(action.body);
  return result.success;
}

export async function input(
  action: ActionType,
  ctx: ContextType,
): Promise<string | void> {
  const el = document.getElementById("walker-" + action.itemId);
  const child = el?.firstElementChild;
  const parsedAction = validate(action) ? action : null;
  if (!parsedAction) {
    return (
      "ERROR: Invalid action body for input flow. Expected { input: string }, got: " +
      JSON.stringify(action.body)
    );
  }

  if (child instanceof HTMLElement) {
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value",
    )?.set;
    nativeInputValueSetter?.call(child, parsedAction.body.input);
    child.dispatchEvent(new Event("input", { bubbles: true }));
  } else {
    return (
      "ERROR: No Item found for input flow with action.itemId: " + action.itemId
    );
  }
}

export const inputFlow: FlowType = {
  command: "input",
  description:
    "Input text into an Item. Schema: " + InputPropsSchema.toJSONSchema(),
  beforeHooks: [scrollHook],
  handler: input,
};
