import { Outlet } from "react-router";
import Header from "./components/Header";
import { Toaster } from "./components/ui/toast";
import { Item, useAction, useWalk } from "walker-react";
import {
  Panel,
  PanelContent,
  PanelInput,
  PanelMenu,
  PanelPopup,
} from "walker-react-panel";
import { SelectDemoFlowBodySchema } from "./walker/flows/selectDemo.flow";

function AppLayout() {
  const { pushAction } = useAction();
  return (
    <div className="w-full min-h-dvh justify-center flex flex-col lg:gap-24 md:gap-12 gap-6 lg:p-24 md:p-12 p-6 items-center overflow-y-scroll scrollbar-none">
      <Header />
      <Outlet />
      <Item
        id="walker-toast-container"
        description="The container for toast notifications. It is recommended to place this at the root of your application."
      >
        <Toaster />
      </Item>
      <Panel
        url={process.env.VITE_WALK_API_URL}
        context={{
          flows: [
            {
              command: "select-demo",
              description: "Interact with select component.",
              handler: async (action) => {
                const valid = SelectDemoFlowBodySchema.safeParse(action.body);
                if (!valid.success) {
                  return (
                    "ERROR: Invalid action body for select-demo flow. Expected { option: string }, got: " +
                    JSON.stringify(action.body)
                  );
                }
                pushAction({
                  flowCommand: "click",
                  itemId: action.itemId,
                  agentMessage: "Open select",
                  userMessage: action.userMessage,
                  body: {},
                });
                pushAction({
                  flowCommand: "click",
                  itemId: action.itemId + `::${valid.data.option}`,
                  agentMessage: "Select option: " + valid.data.option,
                  userMessage: action.userMessage,
                  body: {},
                });
              },
            },
          ],
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
    </div>
  );
}

export default AppLayout;
