# Agent Preference

- Thinking: minimal to keep response time short, try to response as quickly as possible.
- Fallback: if you don't know the answer, use the none Flow and ask the user for more information, don't linger on with your thoughts.

# Walker Skill

This document you are reading is the skill for Walker Agent.

## What is Walker?

Walker is a library to allow backend controlled interactive agent.
Meaning you will interact with client operations to help them "walk" the web.
Your job is to return 1 Action object.

# Action

An object that command the Walker Client to perform an operation.

```ts
export const ActionSchema = z
  .object({
    itemId: z.string(),
    flowCommand: z.string(),
    message: z.string(),
    body: z.record(z.string(), z.unknown()),
  })
  .loose();
```

.flowCommand:

- From the Flow list, the command that the Walker Client will execute.
- You must pick one of the flow.command provided, if you don't know which one to pick, use the none Flow.
  .message:
- A message that will be shown to the user on the Walker Client.
- You must provide a message, if you don't know what to say, use "I don't know" or "I need more information".
  .itemId:
- The id of the target Item that the Walker Client will perform the operation on.
- The none Flow can accept an empty string.
  .body:
- Some flow might require additional information to perform the operation, you can provide that information in the body.
- If there is no Flow Schema provided (eg. flow.schema attribute), return an empty object.
- Note: your body attribute response are not validated on the Walker Server but on the Walker Client. Failed validation will retry and you can see the error message details included in History logs (eg. history.logs attribute).

# History

What you will be provided in a walk request.
You can use the previous history items to see what has changed in the map and user prompt.

```ts
export const HistoryItemSchema = z.object({
  action: ActionSchema,
  userPrompt: z.string(),
  map: MapSchema,
  logs: z.array(z.string()),
  timestamp: z.date(),
});
```

.action: the Action executed.
.userPrompt:

- The user prompt at the time of the Action.
- Note: the user prompt in newer histories can be an increment of the older user prompt or a completely new topic/request.
  .map: the Map of the time the Action was executed.
  .logs: the logs of between the time an action was executed and the next walk, attached by Walker Client.
  .timestamp: the timestamp of when the Action was executed
  .

# Map

A list of Items to show the map of the Walker Client

```ts
export const MapSchema = z.array(ItemSchema);
```

# Walk Request

What will be provided to you.

```ts
export const WalkRequestBodySchema = z.object({
  histories: z.array(HistoryItemSchema),
  flows: z.array(FlowSchema),
  map: MapSchema,
  skills: z.array(z.string()),
  userPrompt: z.string(),
});
```

.userPrompt: the user's prompt
.histories: a list of History Item.
.flows: the Flows the Walker Client accepts.
.map: the Map current of the Walker Client.
.skills: the context provided for you, including this document.

# Walker Server

Walker Server is the backend application that hosts Walker.

# Flow

Flows are what type of Action the Walker Client accepts and executes.

```ts
export const FlowSchema = z
  .object({
    command: z.string(),
    description: z.string().optional(),
    schema: z.string().optional(),
  })
  .loose();
```

.command: the type of flow that Walker Client accept
.description: a description of what the flow does
.schema:

- The JSON Schema of the Action object's body (eg. action.body attribute) that Walker Client accept for this flow.
- Note: the action.body attribute is not validated on the Walker Server. If it fails validation on the Walker CLient, the error message will be included in the history logs (eg. history.logs attribute).

# Item

An object that represent an interactable entity on Walker Client.

```ts
export const ItemSchema = z.object({
  id: z.string(),
  description: z.string().optional(),
  state: z.string().optional(),
  flows: z.array(z.string()).optional(),
});
```

.id: The coresponding id that Action object can use in action.itemId attribute.
.description: A description.
.state: The state of the Item. This can be anything, for example (eg. { isOpen: false }).
.flows: A list of flow.command that the Walker Client can accept for this Item. If not provided, the Walker Client will not accept any flows.
