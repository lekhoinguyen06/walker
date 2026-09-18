import { ActionSchema, type ActionType } from "../action";
import type { ContextType } from "../context";
import type { FlowItemType, FlowType } from "../flow";
import type { HistoryType } from "../history";
import { map, type MapType } from "../map";

function getFlow(ctx: ContextType, command: string): FlowType | undefined {
  return ctx.flows.get(command);
}

function getFlowItem(
  ctx: ContextType,
  command: string,
): FlowItemType | undefined {
  const flow = getFlow(ctx, command);
  if (!flow) return undefined;
  return {
    command: flow.command,
    description: flow.description,
    schema: flow.schema.toJSONSchema(),
  };
}

async function next(ctx: ContextType) {
  ctx.logger.trace("Executing next function");
  const action = ctx.adapter.actionStore.popFront();
  ctx.logger.debug({
    event: "NextAction Object",
    nextAction: action,
  });

  if (action) {
    // const action = validateAction({
    //   ctx: {
    //     config: ctx.config,
    //     logger: ctx.logger,
    //   },
    //   flows: ctx.flows,
    //   map: ctx.map(),
    //   action: ctx.nextAction,
    // });

    const flow = getFlow(ctx, action.flow);
    const flowItem = getFlowItem(ctx, action.flow);
    ctx.logger.debug({
      event: "Flow Object",
      flow: flow,
    });

    if (!flow || !flowItem) {
      ctx.logger.error({
        event: "No flow found",
        nextAction: action,
      });
      throw new Error(
        `No flow found for action with action.flow : ${action.flow}`,
      );
    }

    try {
      ctx.adapter.historyStore.pushBack({
        action,
        flow: flowItem,
        map: map(ctx),
        prompt: action.prompt,
        logs: [],
      });

      await flow.handler({
        action,
        context: ctx,
      });
    } catch (error) {
      ctx.logger.error({
        event: "Error executing flow handler",
        error: error,
      });
      ctx.adapter.historyStore.pushLog((error as Error).message.slice(0, 100));
      throw error;
    }
  } else {
    ctx.logger.trace("No next action found.");
  }
}

export function countActionsInQueued(ctx: ContextType): number {
  return ctx.adapter.actionStore.list().length;
}

export function addActions(ctx: ContextType, inputActions: ActionType[]): void {
  for (const action of inputActions) {
    ctx.adapter.actionStore.pushBack(action);
  }
}

export function addRawActions(ctx: ContextType, inputActions: string): void {
  const input = JSON.parse(inputActions);
  const result = z.array(ActionSchema).safeParse(input);
  if (!result.success) {
    ctx.logger.error({
      event: "Error parsing actions",
      error: result.error,
    });
    throw new Error("Invalid Actions format");
  }

  addActions(ctx, result.data);
}

export function listHistory(ctx: ContextType): HistoryType[] {
  return ctx.adapter.historyStore.list();
}

export function listFlows(ctx: ContextType): FlowItemType[] {
  return Array.from(ctx.flows.values()).map((f) => ({
    command: f.command,
    description: f.description,
    schema: f.schema.toJSONSchema(),
  }));
}

export function listActions(ctx: ContextType): ActionType[] {
  return ctx.adapter.actionStore.list();
}

export function clear(ctx: ContextType): void {
  ctx.adapter.historyStore.clear();
  ctx.adapter.actionStore.clear();
  ctx.logger.trace("Runtime canceled: history and action stores cleared.");
}

export interface RuntimeType {
  next: () => Promise<void>;
  map: () => MapType;
  countActionsInQueued: () => number;
  addActions: (inputActions: ActionType[]) => void;
  addRawActions: (inputActions: string) => void;
  listHistory: () => HistoryType[];
  listFlows: () => FlowItemType[];
  listActions: () => ActionType[];
  clear: () => void;
}

export default function runtime(ctx: ContextType): RuntimeType {
  return {
    next: () => next(ctx),
    map: () => map(ctx),
    countActionsInQueued: () => countActionsInQueued(ctx),
    addActions: (inputActions: ActionType[]) => addActions(ctx, inputActions),
    addRawActions: (inputActions: string) => addRawActions(ctx, inputActions),
    listHistory: () => listHistory(ctx),
    listFlows: () => listFlows(ctx),
    listActions: () => listActions(ctx),
    clear: () => clear(ctx),
  };
}
