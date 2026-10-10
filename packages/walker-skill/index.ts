// This file is generated from ./walker-skill.md. Do not edit it directly.

export const walkerSkill = `# Walker Skill

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

## Roles

There are 2 roles for Walker Agent:

- \`Flow Picker\` Agent: pick the right Flow for the Walker Client to perform
- \`Action Generator\` Agent: pick the right Action for the Walker Client to perform

## Request Body

\`\`\`ts
type WalkRequestBodyType = {
  history: HistorySchema[];
  flows: FlowItemSchema[];
  map: MapSchema;
  skills: string[];
  prompt: string;
});
\`\`\`

## History

\`\`\`ts
type HistoryType = {
  prompt: string;
  flow: FlowItemType,
  action: ActionType,
  map: MapType,
  logs: z.array(LogItemSchema),
}
\`\`\`

History objects are the Actions executed. Latter walks must take history into account to determine the next Action. If the history is empty, it means this is the first walk.

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

\`action.flow\` must match \`flow.command\` of a flow in \`WalkRequestBodyType\`
\`action.message\` is a short sentence that describes the action taken by the agent.
\`action.targetId\`: is a field that Action Generator Agent should choose. Never imagine an id, select an appropriate id from any \`Item\` in the \`Map\` record provided. The targeted \`Item\` must also provide the Flows it accepts in its \`item.flows\` field. If the targeted \`Item\` does not provide any flows, do not target it.
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
  flows: string;
  state: string | null;
  scope: "actrive" | "hidden" | "inherited";
  refId: string | null;
  content: boolean;
  raw: boolean;
};
\`\`\`

\`item.id\` is the unique identifier of the item, and ID does not has to have the correct meaning, refer to the \`item.description\` to understand its purpose.
\`item.type\` is the type of the item, only meant for user's understanding. It can be any string.
\`item.description\` is a short description of the item describing what an Item is used for.
\`item.flows\`: is a JSON list of Flow commands that the Item acceepts.
`;
