import { docsController, specsController } from "./routes/docs/docs.controller";
import { walkController } from "./routes/walk/walk.controller";

export const handler = {
  walk: walkController,
  docs: docsController,
  specs: specsController,
};
