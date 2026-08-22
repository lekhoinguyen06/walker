import { ActionSchema, type ActionType } from "../action/action.dto";
import {
  AdapterSchema,
  type AdapterType,
  type RuntimePropsType,
} from "./runtime.dto";
import z from "zod";
import { FlowsSchema, type FlowsType, type FlowType } from "../flow/flow.dto";
import { mapper } from "../map/mapper";
import { ConfigSchema, type ConfigType } from "../config/config.dto";
import { HooksSchema, type HooksType } from "../hook/hook.dto";
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
      const flow = this.getFlow(this.nextAction.command);
      this.logger.debug({
        event: "Flow Object",
        flow: flow,
      });

      if (!flow) {
        const errorMessage = `No flow found for command: ${this.nextAction.command}`;
        this.nextAction = undefined;
        throw new Error(errorMessage);
      }

      try {
        await flow.handler({
          action: this.nextAction,
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
      }
    } else {
      this.logger.trace("No next action found.");
    }
  }

  countActionsInQueued() {
    return this.adapter.actionStore.list().length;
  }

  async addActions(inputActions: ActionType[]) {
    for (const action of inputActions) {
      this.adapter.actionStore.pushBack(action);
    }
  }

  async addRawActions(inputActions: string) {
    const input = JSON.parse(inputActions);
    const parsedInput = z.array(ActionSchema).parse(input);
    await this.addActions(parsedInput);
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

  cancel() {
    this.adapter.actionStore.clear();
  }

  getFlow(command: string): FlowType | undefined {
    return this.flows.find((f) => f.command === command);
  }

  getJoinedFlowsSchema() {
    const schemas = this.flows.map((f) => f.schema);
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
