import { ActionSchema, type ActionType } from "../action/action.dto";
import type { MapType } from "../map/map.dto";
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
import log from "loglevel";

export class Runtime {
  private readonly config: ConfigType;
  private readonly adapter: AdapterType;
  private readonly flows: FlowsType = new Map();
  private readonly hooks: HooksType = {
    onScroll: async () => {},
    onMessage: async () => {},
    onMouse: async () => {},
  };
  private nextAction: ActionType | undefined;
  private logger = log;

  constructor({ config, adapter, flows, hooks }: RuntimePropsType) {
    this.logger.setDefaultLevel("TRACE");
    this.logger.trace("[TRACE]: Initializing Runtime Instance");
    this.config = ConfigSchema.parse(config);
    this.logger.debug({
      event: "[DEBUG]: Inject Config",
      config: this.config,
    });
    this.adapter = AdapterSchema.parse(adapter);
    this.logger.debug({
      event: "[DEBUG]: Inject Adapter",
      adapter: this.adapter,
    });
    this.flows = FlowsSchema.parse(flows);
    this.logger.debug({
      event: "[DEBUG]: Inject Flows",
      flows: this.flows,
    });
    this.hooks = HooksSchema.parse(hooks);
    this.logger.debug({
      event: "[DEBUG]: Inject Hooks",
      hooks: this.hooks,
    });
  }

  // async walk(prompt: string) {
  //   const actions = await this.walker.send({
  //     flows: this.flowStore.list(),
  //     history: this.historyStore.list(),
  //     prompt,
  //     map: this.currentMap,
  //   })

  //   const parsedActions = z.array(ActionSchema).parse(actions);
  //   for (const action of parsedActions) {
  //     this.config.actionStore.pushBack(action);
  //   }
  // }

  async next() {
    this.logger.trace("[TRACE]: Executing next function");
    this.nextAction = this.adapter.actionStore.popFront();
    this.logger.debug({
      event: "[DEBUG]: NextAction Object",
      nextAction: this.nextAction,
    });

    if (this.nextAction) {
      const flow = this.flows.get(this.nextAction.command);
      this.logger.debug({
        event: "[DEBUG]: Flow Object",
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
            hooks: this.hooks,
          },
        });
      } catch (error) {
        this.logger.error("Error executing flow handler:", error);
      }
      if (this.nextAction.command === "select") {
        this.logger.trace(
          "[TRACE]: Current Action has the select command, which triggers next function programmatrically.",
        );
        await this.next();
      }
    }
  }

  async manualWalk(inputActions: ActionType[]) {
    for (const action of inputActions) {
      this.adapter.actionStore.pushBack(action);
    }
  }

  async rawWalk(inputActions: string) {
    const input = JSON.parse(inputActions);
    const parsedInput = z.array(ActionSchema).parse(input);
    await this.manualWalk(parsedInput);
  }

  map() {
    const map: MapType = mapper();
    return map;
  }

  listHistory() {
    return this.adapter.historyStore.list();
  }

  listFlows() {
    return this.flows;
  }

  listActions() {
    return this.adapter.actionStore.list();
  }

  cancel() {
    this.adapter.actionStore.clear();
  }
}
