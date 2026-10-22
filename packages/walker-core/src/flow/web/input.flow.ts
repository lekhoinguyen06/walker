import z from "zod";
import { wait } from "../../shared/utils/wait";
import { createFlowBodySchema } from "walker-shared";
import { createFlow, type CreateFlowProps } from "../flow.helpers";

type InputFlowSchemaType = z.ZodObject<
  {
    input: z.ZodString;
  },
  z.core.$strip
>;

const InputFlowBodySchema: InputFlowSchemaType = z.object({
  input: z.string(),
});

type InputFlowBody = z.infer<typeof InputFlowBodySchema>;

export const inputFlow: CreateFlowProps<InputFlowBody> =
  createFlow<InputFlowBody>({
    command: "input",
    description: "Input text into an element.",
    schema: createFlowBodySchema({
      flow: "input",
      schema: InputFlowBodySchema,
    }),
    route: "*",
    handler: async (props) => {
      const walker = document.getElementById(props.action.targetId);
      const element = walker?.firstElementChild;

      if (element instanceof HTMLInputElement) {
        const gap = props.context.config.gap;
        await wait(gap);
        await props.context.hooks.onMessage?.(props);
        await wait(gap);
        await props.context.hooks.onScroll?.(props);
        await wait(gap);
        await props.context.hooks.onMouse?.(props);
        await wait(gap > 1000 ? gap : 1000);
        if (props.action.body?.input) {
          // React specific, we may need to provided React flow later when we support more frameworks
          const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype,
            "value",
          )?.set;
          nativeInputValueSetter?.call(element, props.action.body.input);
          element.dispatchEvent(new Event("input", { bubbles: true }));
        }

        await props.context.hooks.onMouseReturn?.(props);
      }
    },
  });
