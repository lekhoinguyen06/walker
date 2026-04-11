import { FLOW_GAP_DEFAULT_TIME } from '@src/constants/flow.constants';
// import { useFlowStore } from "@src/store/flow/useFlowStore";
import {
  notifyNextAction,
  observer,
} from '@src/domains/action/event/observer';
import { dynamicNavigator } from '@src/utils/navigate';
import { wait } from '@src/utils/wait';
import { dynamicFlowSwitch } from '@src/domains/flow/helpers/dynamic-flow-switch';
import { ActionManager } from '@src/domains/action/action-manager';
import { FlowManager } from '@src/domains/flow/flow-manager';
import { listActions } from '@src/domains/action/helpers/list-action';
import { listFlows } from '@src/domains/flow/helpers/list-flow';
import type { Action } from '@src/types/action.types';
import { flowsParser } from '@src/domains/action/helpers/flows-parser';
// import { createMouse, moveMouseTo } from '@react/ui/Mouse';
import { MapManager } from '@src/domains/map/mapManager';
import { LogManager } from '@src/utils/logger';
import { AppManager } from '@src/utils/app';

// Type re-export
export type * from '@src/types/action.types';
export type * from '@src/types/app.types';
export type * from '@src/types/flow.types';
export type * from '@src/types/log.types';

// These are singletons (In JavaScript ES modules, top-level code executes once per module instantiation. The module is then cached, so any subsequent imports reference the same module record.)
export const flowManager = new FlowManager();
export const actionManager = new ActionManager();
export const mapManager = new MapManager();
export const logger = new LogManager();
export const app = new AppManager();

/**
 * Init function
 *
 * Purpose:
 * - To attach default and custom flows
 * - To set options config
 * - To attach adapters
 */
function initFlow() {
  // createMouse();
  // Default flows helpers.
  flowManager.add({
    action: 'navigate',
    description: 'Navigate from any route using URL',
    route: '*',
    handler: async ({ action, gap }) => {
      await wait(gap ?? FLOW_GAP_DEFAULT_TIME);
      if (action.message) confirm(action.message);
      await wait(gap ?? FLOW_GAP_DEFAULT_TIME);
      if (action.query) await dynamicNavigator(action.query);
    },
  });
  flowManager.add({
    action: 'route',
    description: 'Route from any route by clicking an element',
    route: '*',
    handler: async ({ action, gap }) => {
      await wait(gap ?? FLOW_GAP_DEFAULT_TIME);
      if (action.message) confirm(action.message);
      await wait(gap ?? FLOW_GAP_DEFAULT_TIME);
      if (action.query) {
        const element = document.querySelector(action.query) as HTMLElement;
        if (element) {
          element.click();
        }
      }
    },
  });
  flowManager.add({
    action: 'hover',
    description: 'Hover to any queried element from any route',
    route: '*',
    handler: async ({ action, gap }) => {
      await wait(gap ?? FLOW_GAP_DEFAULT_TIME);
      if (action.message) confirm(action.message);
      await wait(gap ?? FLOW_GAP_DEFAULT_TIME);
      if (action.query) {
        document.querySelector(action.query)?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    },
  });
  flowManager.add({
    action: 'click',
    description: 'Click any queried element from any route',
    route: '*',
    handler: async ({ action, gap }) => {
      console.log('DEBUG: Click handler called with action:', action, 'and gap:', gap);
      await wait(gap ?? FLOW_GAP_DEFAULT_TIME);
      if (action.message) confirm(action.message);
      await wait(gap ?? FLOW_GAP_DEFAULT_TIME);
      if (action.query) {
        console.log('DEBUG: Attempting to click element with query:', action.query);
        document.querySelector(action.query)?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
        const element = document.querySelector(action.query) as HTMLElement;
        if (element) {
          // await moveMouseTo(action.query);
          element.click();
        }
      }
    },
  });

  flowManager.add({
    action: 'input',
    description: 'Input any queried element from any route',
    route: '*',
    handler: async ({ action, gap }) => {
      await wait(gap ?? FLOW_GAP_DEFAULT_TIME);
      if (action.message) confirm(action.message);
      await wait(gap ?? FLOW_GAP_DEFAULT_TIME);
      if (action.query) {
        document.querySelector(action.query)?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
        const element = document.querySelector(
          action.query,
        ) as HTMLInputElement;
        if (element) {
          // await moveMouseTo(action.query);
          if (action.data) element.value = action.data;
        }
      }
    },
  });

  // Add custom flows here from some init file so that flows are only added once

  // Attach observer to listen to events
  observer();
}

/**
 * Receive and/or call the next action
 * @param string
 */
async function walk(input?: string) {
  const actions: Action[] = flowsParser(input);

  // Send new flows to Action Manager to queue up
  if (actions.length > 0) {
    actionManager.newActions(actions);
  }

  const nextAction = actionManager.nextAction();

  // Execute next action by calling dynamicSwitch
  if (flowManager && nextAction) {
    logger.add('1', {
      identifier: 1,
      domain: 'Action',
      title: 'Call next action',
      data: nextAction,
    });
    await dynamicFlowSwitch({
      flows: flowManager.list(),
      action: nextAction,
    });

    // Callback
    notifyNextAction();
  }
}

function map() {
  mapManager.map();
}

function logMap() {
  mapManager.map();
  logger.last();
}

function logPeak() {
  logger.peak();
}

export { initFlow, walk, listFlows, listActions, map, logMap, logPeak };
