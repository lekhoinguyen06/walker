import { useFocusId } from "../hooks/useFocus";
import type { FocusTree } from "../stores/focus.store";
import { getFoucusStyle } from "../style";
import {
  OpenRouterProviderForm,
  openrouterTree,
} from "./forms/OpenRouterProviderForm";
import { BedrockProviderForm, bedrockTree } from "./forms/BedrockProviderForm";
import {
  OpenAICompatibleProviderForm,
  openaicompatibleTree,
} from "./forms/OpenAICompatibleProviderForm";

export const configTree: FocusTree = {
  id: "config",
  children: [openrouterTree, bedrockTree, openaicompatibleTree],
};

function Config() {
  const { focusedId } = useFocusId();
  return (
    <box
      style={{
        flexGrow: 1,
        flexDirection: "column",
        ...getFoucusStyle({
          focusedId,
          id: "config",
        }),
      }}
    >
      <OpenRouterProviderForm />
      <BedrockProviderForm />
      <OpenAICompatibleProviderForm />
    </box>
  );
}

export default Config;
