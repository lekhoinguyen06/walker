import {
  Panel,
  PanelContent,
  PanelInput,
  PanelMenu,
  PanelPopup,
} from "walker-react-panel";

export function LandingPanel() {
  return (
    <Panel
      context={{
        flows: [],
        baseUrl: process.env.VITE_WALK_API_URL,
      }}
    >
      <PanelContent>
        <PanelInput />
        <PanelPopup
          tabs={{
            default: <PanelMenu />,
          }}
        />
      </PanelContent>
    </Panel>
  );
}
