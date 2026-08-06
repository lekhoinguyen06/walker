import { ActionSchema, type ActionType } from "../action/type";
import type { MapType } from "../map/type";
import {
  AdapterConfigSchema,
  ConfigSchema,
  type AdapterConfigType,
  type ConfigType,
} from "./type";
import z from "zod";
import debug from "debug";
import type { FlowType } from "../flow/type";
import { mapper } from "../map/mapper";

export type RuntimeType = typeof Runtime;

export class Runtime {
  private readonly config: ConfigType;
  private readonly actionStore: AdapterConfigType["actionStore"];
  private readonly historyStore: AdapterConfigType["historyStore"];
  private nextAction?: ActionType;
  private flows: FlowType[] = [];

  constructor({
    config,
    adapterConfig,
  }: {
    config: ConfigType;
    adapterConfig: AdapterConfigType;
  }) {
    console.log("Initializing Runtime with config:", config);
    this.config = ConfigSchema.parse(config);
    this.flows = this.config.flows;

    const adapterConfigParsed = AdapterConfigSchema.parse(adapterConfig);
    this.actionStore = adapterConfigParsed.actionStore;
    this.historyStore = adapterConfigParsed.historyStore;
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

  next() {
    this.nextAction = this.actionStore.popFront();

    while (this.nextAction) {
      console.log("Executing Action: %O", this.nextAction);

      const flow = this.flows.find(
        (f) => f.command === this.nextAction?.command,
      );

      if (!flow) {
        const errorMessage = `No flow found for command: ${this.nextAction.command}`;
        this.nextAction = undefined;
        throw new Error(errorMessage);
      }
      flow.handler(this.nextAction);
      this.nextAction = this.actionStore.popFront();
    }
  }

  manualWalk(inputActions: ActionType[]) {
    for (const action of inputActions) {
      this.actionStore.pushBack(action);
    }

    this.next();
  }

  rawWalk(inputActions: string) {
    const input = JSON.parse(inputActions);
    const parsedInput = z.array(ActionSchema).parse(input);
    this.manualWalk(parsedInput);
  }

  pause() {
    console.log("Pausing Runtime");
    this.config.isPaused = true;
  }

  resume() {
    console.log("Resuming Runtime");
    this.config.isPaused = false;
    this.next();
  }

  map() {
    console.log("Generating Map");
    const map: MapType = mapper();
    return map;
  }

  listHistory() {
    console.log("Listing History: %O", this.historyStore.list());
    return this.historyStore.list();
  }

  listFlows() {
    console.log("Listing Flows: %O", this.flows);
    return this.flows;
  }

  listActions() {
    console.log("Listing Actions: %O", this.actionStore.list());
    return this.actionStore.list();
  }

  cancel() {
    console.log("Cancelling walk");
    this.actionStore.clear();
  }
}
