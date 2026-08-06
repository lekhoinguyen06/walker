import { wait } from "../shared/utils/wait";
import type {
  MiddlewarePropsType,
  MiddlewareResponseType,
  MiddlewareType,
} from "./type";

async function message(props: MiddlewarePropsType): MiddlewareResponseType {
  await wait(props.context.config.gap);
  console.log("Message Middleware: %O", props.action.message);
  alert(props.action.message);
}

export const messageMiddleware: MiddlewareType = {
  name: "message",
  description: "Displays a message to the user",
  handler: message,
};
