import { ActionSchema, type ActionType } from "../action/action.dto";
import { type ContextType } from "../context/context.dto";
import type { FlowsType } from "../flow/flow.dto";
import { type MapType } from "../map/map.dto";
import { flattenMap } from "../map/map.helpers";

function isActionTargetInMap({
  map,
  action,
}: {
  map: MapType;
  action: ActionType;
}): boolean {
  const items = flattenMap(map);
  const target = items.find((item) => item.id === action.targetId);

  return target !== undefined;
}

function isActionFlowExist({
  flows,
  action,
}: {
  flows: FlowsType;
  action: ActionType;
}): boolean {
  return flows.has(action.flow);
}

function isActionComplyFlowSchema({
  flows,
  action,
}: {
  flows: FlowsType;
  action: ActionType;
}): boolean {
  const flow = flows.get(action.flow);
  const schema = flow?.schema;
  if (schema) {
    if (!schema.safeParse(action).success) {
      console.error(schema.safeParse(action).error);
      return false;
    }
  }
  return true;
}

function isActionTargetActiveScope({
  map,
  action,
}: {
  map: MapType;
  action: ActionType;
}): boolean {
  const item = flattenMap(map).find((item) => item.id === action.targetId);
  return item?.isInActiveScope ?? false;
}

type ActionValidatorProps = {
  ctx: ContextType;
  flows: FlowsType;
  map: MapType;
  action: unknown;
};

export function validateAction({
  ctx,
  flows,
  map,
  action,
}: ActionValidatorProps): ActionType {
  const result = ActionSchema.parse(action);

  if (!isActionTargetInMap({ map, action: result })) {
    ctx.logger.error(`Action targetId "${result.targetId}" not found in map`);
    throw new Error(`Action targetId "${result.targetId}" not found in map`);
  }

  if (!isActionFlowExist({ flows, action: result })) {
    ctx.logger.error(`Action flow "${result.flow}" not found in flows`);
    throw new Error(`Action flow "${result.flow}" not found in flows`);
  }

  if (!isActionComplyFlowSchema({ flows, action: result })) {
    ctx.logger.error(`Action body does not comply with flow schema`);
    throw new Error(`Action body does not comply with flow schema`);
  }

  if (!isActionTargetActiveScope({ map, action: result })) {
    ctx.logger.error(
      `Action targetId "${result.targetId}" is not in active scope`,
    );
    throw new Error(
      `Action targetId "${result.targetId}" is not in active scope`,
    );
  }

  return result;
}
