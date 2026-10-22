import { chatController } from "./routes/chat/chat.controller";
import { docsController, specsController } from "./routes/docs/docs.controller";
import { walkController } from "./routes/walk/walk.controller";

export const handler = {
  chat: chatController,
  walk: walkController,
  docs: docsController,
  specs: specsController,
};
