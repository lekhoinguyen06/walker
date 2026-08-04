import { ActionSchema, type ActionType } from "../action/type";
import type { MapType } from "../map/type";
import { ConfigSchema, type ConfigType } from "./type";
import z from "zod";
import debug from "debug";

export type RuntimeType = typeof Runtime;

export class Runtime {
  private readonly config: ConfigType;
  private readonly actionStore: ConfigType["actionStore"];
  private readonly historyStore: ConfigType["historyStore"];
  private readonly flowStore: ConfigType["flowStore"];
  private nextAction: ConfigType["nextAction"];
  private isPaused: ConfigType["isPaused"];
  // private readonly currentMap: MapType;

  constructor(config: ConfigType) {
    debug("Initializing Runtime with config: %O")(config);
    this.config = ConfigSchema.parse(config);
    this.actionStore = this.config.actionStore;
    this.historyStore = this.config.historyStore;
    this.flowStore = this.config.flowStore;
    this.isPaused = this.config.isPaused;
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
      debug("Executing Action: %O")(this.nextAction);

      const flow = this.flowStore.find({
        command: this.nextAction.command,
      });
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
      this.config.actionStore.pushBack(action);
    }

    this.next();
  }

  rawWalk(inputActions: string) {
    const input = JSON.parse(inputActions);
    const parsedInput = z.array(ActionSchema).parse(input);
    this.manualWalk(parsedInput);
  }

  pause() {
    this.isPaused = true;
  }

  resume() {
    this.isPaused = false;
    this.next();
  }

  listHistory() {
    debug("Listing history: %O")(this.historyStore.list());
    return this.historyStore.list();
  }

  listFlows() {
    debug("Listing flows: %O")(this.flowStore.list());
    return this.flowStore.list();
  }

  listActions() {
    debug("Listing actions: %O")(this.actionStore.list());
    return this.actionStore.list();
  }

  cancel() {
    this.config.actionStore.clear();
  }
}
