import { ActionSchema, type ActionType, validateAction } from "../action";
import {
  AdapterSchema,
  type AdapterType,
  type RuntimePropsType,
} from "./runtime.dto";
import z from "zod";
import { FlowsSchema, type FlowsType, type FlowType } from "../flow";
import { mapper } from "../map";
import { ConfigSchema, type ConfigType } from "../config";
import { HooksSchema, type HooksType } from "../hook";
import { getLogger, LoggerLevel } from "../shared/utils/logger";

export class Runtime {
  private readonly config: ConfigType;
  private readonly adapter: AdapterType;
  private readonly flows: FlowsType;
  private readonly hooks: HooksType;
  private nextAction: ActionType | undefined;
  private logger;

  constructor({ config, adapter, flows, hooks }: RuntimePropsType) {
    const level = !config.verbose ? LoggerLevel.INFO : LoggerLevel.TRACE;
    this.logger = getLogger(level);
    this.logger.trace("Initializing Runtime Instance");

    this.config = ConfigSchema.parse(config);
    this.logger.debug({
      event: "Inject Config",
      config: this.config,
    });

    this.adapter = AdapterSchema.parse(adapter);
    this.logger.debug({
      event: "Inject Adapter",
      adapter: this.adapter,
    });

    this.flows = FlowsSchema.parse(flows);
    this.logger.debug({
      event: "Inject Flows",
      flows: this.flows,
    });

    this.hooks = HooksSchema.parse(hooks);
    this.logger.debug({
      event: "Inject Hooks",
      hooks: this.hooks,
    });
  }

  async next() {
    this.logger.trace("Executing next function");
    this.nextAction = this.adapter.actionStore.popFront();
    this.logger.debug({
      event: "NextAction Object",
      nextAction: this.nextAction,
    });

    if (this.nextAction) {
      const action = validateAction({
        ctx: {
          config: this.config,
          logger: this.logger,
        },
        flows: this.flows,
        map: this.map(),
        action: this.nextAction,
      });

      const flow = this.getFlow(action.flow);
      this.logger.debug({
        event: "Flow Object",
        flow: flow,
      });

      if (!flow) {
        this.logger.error({
          event: "No flow found",
          nextAction: action,
        });
        throw new Error(
          `No flow found for action with action.flow : ${action.flow}`,
        );
      }

      try {
        this.adapter.historyStore.pushBack({
          action: this.nextAction,
          flow: {
            command: flow.command,
            description: flow.description,
          },
          map: this.map(),
          prompt: action.prompt,
        });

        await flow.handler({
          action,
          context: {
            config: this.config,
            logger: this.logger,
            hooks: this.hooks,
          },
        });
      } catch (error) {
        this.logger.error({
          event: "Error executing flow handler",
          error: error,
        });
        this.adapter.historyStore.updateBack({
          error: (error as Error).message.slice(0, 100),
        });
        throw error;
      }
    } else {
      this.logger.trace("No next action found.");
    }
  }

  countActionsInQueued() {
    return this.adapter.actionStore.list().length;
  }

  addActions(inputActions: ActionType[]) {
    for (const action of inputActions) {
      this.adapter.actionStore.pushBack(action);
    }
  }

  addRawActions(inputActions: string) {
    const input = JSON.parse(inputActions);
    const result = z.array(ActionSchema).safeParse(input);
    if (!result.success) {
      this.logger.error({
        event: "Error parsing actions",
        error: result.error,
      });
      throw new Error("Invalid Actions format");
    }

    this.addActions(result.data);
  }

  map() {
    return mapper({
      config: this.config,
      logger: this.logger,
    });
  }

  listHistory() {
    return this.adapter.historyStore.list();
  }

  listFlows() {
    return Array.from(this.flows.values()).map((f) => ({
      command: f.command,
      description: f.description,
      schema: f.schema.toJSONSchema(),
    }));
  }

  listActions() {
    return this.adapter.actionStore.list();
  }

  clear() {
    this.adapter.historyStore.clear();
    this.adapter.actionStore.clear();
    this.logger.trace("Runtime canceled: history and action stores cleared.");
  }

  getFlow(command: string): FlowType | undefined {
    return this.flows.get(command);
  }

  getJoinedFlowsSchema() {
    const schemas = Array.from(this.flows.values()).map((f) => f.schema);
    const joined = z.union(schemas);
    return joined;
  }

  getConfig() {
    return this.config;
  }

  getLogger() {
    return this.logger;
  }
}
