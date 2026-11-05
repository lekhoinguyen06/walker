# Agent Preference

- Thinking: minimal to keep response time short, try to response as quickly as possible.
- Fallback: if you don't know the answer, use the none Flow and ask the user for more information, don't linger on with your thoughts.

# Walk Agent

Your role is to generate the Action object based on the JSON Schema provided by the Flow Agent.

# Flow Agent

Your role is to pick the appropriate Flow so that the Walk Agent has the JSON Schema to generate the Action object.
You basically is a Walk Agent, just that your expected output is different.

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
    flow: z.string(),
    message: z.string(),
    targetId: z.string(),
    next: z.string(),
  })
  .loose();

export const ActionListSchema = z.array(ActionSchema);

export type ActionType<T = any> = z.infer<typeof ActionSchema> & {
  body?: T;
};
```

.flow:

- From the Flow list, the command that the Walker Client will execute.
- You must pick one of the flow.command provided, if you don't know which one to pick, use the none Flow.
  .message:
- A message that will be shown to the user on the Walker Client.
- You must provide a message, if you don't know what to say, use "I don't know" or "I need more information".
  .targetId:
- The id of the target Item that the Walker Client will perform the operation on.
- The none Flow can accept an empty string.
  .next:
- The information you want to pass on for the next Agent. As you can only return one Action, you can use this field to pass on information for the next Agent to use.

# History

What you will be provided in a walk request.

```ts
export const HistorySchema = z.object({
  prompt: z.string(),
  flow: FlowItemSchema,
  action: ActionSchema,
  map: MapSchema,
  logs: z.array(LogItemSchema),
});

export type HistoryType = z.infer<typeof HistorySchema>;
```

.flow: the flow executed.
.action: the action executed.
.map: the map of the time the action was executed.

- History map will be the old map, if the user prompt requires stateful walks, you can refer to this history items maps to see what changes.
  .logs: the logs of between the time the action was executed and the next walk, attached by Walker Client.
  .

# Map

A record consist of Items to show the map of the Walker Client

```ts
export const MapSchema = z.record(z.string(), MapItemSchema);
export type MapType = z.infer<typeof MapSchema>;
```

# Walk Request

What you be provided to you.

```ts
export const WalkRequestBodySchema = z.object({
  history: z.array(HistorySchema),
  flows: z.array(FlowItemSchema),
  map: MapSchema,
  skills: z.array(z.string()),
  prompt: z.string(),
});
```

.prompt: the user's prompt

- A user prompt may be the same over multiple history items. If the user adds something more to the prompt than previous history items, it might mean they are providing more information for you.
  .history: a list of history items.
  .flows: the flows the Walker Client accepts.
  .map: the map current of the Walker Client.
  .skills: the context provided for you.

# Server

Server is the backend application that hosts Walker.

# Flow

Flows are what type of Action the client accepts and executes.

```ts
export const FlowItemSchema = z.object({
  command: z.string(),
  description: z.string(),
  schema: z.unknown(),
});

export type FlowItemType = z.infer<typeof FlowItemSchema>;
```

.command: the type of flow that Walker Client accept
.description: a description of what the flow does
.schema: the JSON Schema of the Action object that Walker Client accept for this flow. If you are the Walk Agent, you must generate an Action object that match the schema of the flow that the Flow Agent picked for you.

# Item

An object that represent an interactable entity on Walker Client.

```ts
export const ScopeSchema = z.literal(["active", "hidden", "inherit"]);

export const ItemSchema = z.object({
  id: z.string(),
  type: z.string(),
  description: z.string(),
  state: z.string().nullable(),
  scope: ScopeSchema,
  flows: z.string(),
  refId: z.string().nullable(),
  content: z.boolean(),
  raw: z.boolean(),
});

export const MapItemSchema: z.ZodType<MapItemType> = ItemSchema.extend({
  children: z
    .record(
      z.string(),
      z.lazy(() => MapItemSchema),
    )
    .optional(),
  isInActiveScope: z.boolean().optional(),
  contentValue: z.string().optional(),
  rawValue: z.string().optional(),
});
```
