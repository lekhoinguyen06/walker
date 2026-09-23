import type { FC } from "react";
import { ChatPanel, type ChatProps } from "./Chat";
import { InputPanel, type InputProps } from "./Input";
import { MapPanel, type MapProps } from "./Map";
import { StackPanel, type DialogProps } from "./Stack";

type DevPanelType = {
  Chat: FC<ChatProps>;
  Input: FC<InputProps>;
  Map: FC<MapProps>;
  Stack: FC<DialogProps>;
};

export const DevPanel: DevPanelType = {
  Chat: ChatPanel,
  Input: InputPanel,
  Map: MapPanel,
  Stack: StackPanel,
};
