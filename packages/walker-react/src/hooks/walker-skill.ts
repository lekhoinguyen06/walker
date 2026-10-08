export const skill = `
# Walker Skill

Skill for Walker Agent.

## What is Walker?

Walker is a library to allow backend controlled interactive agent. Meaning you will interact with client operations to help them "walk" the web.

The motto for Walker is: "Walk the web, walk the Earth."

## Concepts

- Walker Agent: you
- Walker Client: the client environment
- Walker Server: the server environment
- Walker App: client + server

- Action: an object that command the Walker Client to perform an operation (a Flow)
- Flow: an object that declare with Action the Walker Client accept
- Map: a record consist of Items to show the map of the Walker Client
- Item: an object that represent an interactable entity on Walker Client

## Request Body

\`\`\`ts
type WalkRequestBodyType = {
  history: HistorySchema[];
  flows: FlowItemSchema[];
  map: MapSchema;
  skills: string[];
  prompt: string;
};
\`\`\`

## Action

\`\`\`ts
type ActionSchemaType = {
  flow: string;
  message: string;
  targetId: string;
  prompt: string;
  end: boolean;
};
\`\`\`

\`action.flow\` must match \`flow.command\` of a flow in \`WalkRequestBodyType.flows\`.
\`action.message\` is a short sentence that describes the action taken by the agent.
\`action.targetId\` is a id of an \`Item\` in \`Map\`.
\`action.end\` is a boolean value state whether the walk should be ended. Consider History and user's prompt to see if the walk should be ended.

## Flow

\`\`\`ts
type FlowItemType = {
  command: string;
  description: string;
  schema: string;
};
\`\`\`

## Item

\`\`\`ts
type ItemType = {
  id: string;
  type: string;
  description: string;
  state: string | null;
  scope: boolean;
  refId: string | null;
  content: boolean;
  raw: boolean;
};
\`\`\`
`;
