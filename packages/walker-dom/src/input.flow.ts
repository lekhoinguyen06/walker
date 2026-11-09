import z from "zod";
import type {
  ContextType,
  FlowWithHooksAndHandlerType,
  ActionType,
} from "walker-shared";

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
  console.log("[W][D]: Input Flow: ", action.itemId);
  const el = document.getElementById(action.itemId);
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

export const inputFlow: FlowWithHooksAndHandlerType = {
  command: "input",
  description:
    "Input text into an Item. Schema: " + InputPropsSchema.toJSONSchema(),
  handler: input,
};
