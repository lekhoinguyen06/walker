import { ActionSchema, type ActionType } from "../action/type";
import type { MapType } from "../map/type";
import {
  AdapterSchema,
  ConfigSchema,
  type AdapterType,
  type ConfigType,
} from "./type";
import z from "zod";
import { FlowsSchema, type FlowsType, type FlowType } from "../flow/type";
import { mapper } from "../map/mapper";
import { MiddlewaresSchema, type MiddlewaresType } from "../middleware/type";

export type RuntimeType = typeof Runtime;

export class Runtime {
  private readonly config: ConfigType;
  private readonly adapter: AdapterType;
  private readonly flows: FlowsType = new Map();
  private readonly middlewares: MiddlewaresType = new Map();
  private nextAction: ActionType | undefined;

  constructor({
    config,
    adapter,
    flows,
    middlewares,
  }: {
    config: ConfigType;
    adapter: AdapterType;
    flows?: FlowsType;
    middlewares?: MiddlewaresType;
  }) {
    this.config = ConfigSchema.parse(config);
    this.adapter = AdapterSchema.parse(adapter);
    this.flows = FlowsSchema.parse(flows);
    this.middlewares = MiddlewaresSchema.parse(middlewares);
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
    this.nextAction = this.adapter.actionStore.popFront();
    console.log("Executing Action: %O", this.nextAction);

    if (this.nextAction) {
      const flow = this.flows.get(this.nextAction.command);

      if (!flow) {
        const errorMessage = `No flow found for command: ${this.nextAction.command}`;
        this.nextAction = undefined;
        throw new Error(errorMessage);
      }
      await flow.handler({
        action: this.nextAction,
        context: {
          config: this.config,
          middlewares: this.middlewares,
        },
      });
      if (this.nextAction.command === "select") {
        await this.next();
      }
    }
  }

  async manualWalk(inputActions: ActionType[]) {
    for (const action of inputActions) {
      this.adapter.actionStore.pushBack(action);
    }

    // await this.next();
  }

  async rawWalk(inputActions: string) {
    const input = JSON.parse(inputActions);
    const parsedInput = z.array(ActionSchema).parse(input);
    await this.manualWalk(parsedInput);
  }

  pause() {
    console.log("Pausing Runtime");
    this.config.isPaused = true;
  }

  async resume() {
    console.log("Resuming Runtime");
    this.config.isPaused = false;
    await this.next();
  }

  map() {
    const map: MapType = mapper();
    return map;
  }

  listHistory() {
    console.log("History: %O", this.adapter.historyStore.list());
    return this.adapter.historyStore.list();
  }

  listFlows() {
    console.log("Flows: %O", this.flows);
    return this.flows;
  }

  listActions() {
    console.log("Actions: %O", this.adapter.actionStore.list());
    return this.adapter.actionStore.list();
  }

  cancel() {
    console.log("Cancelling walk");
    this.adapter.actionStore.clear();
  }
}
