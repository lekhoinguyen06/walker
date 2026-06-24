// Websocket /walk/execution/:executionId: can use the execution ID to subscribe/publish to the channel of that execution

import log from 'encore.dev/log';
import { api, StreamInOut } from 'encore.dev/api';
import { ResponseDto } from '../shared/dto/response.dto';
import { graph } from './walk.graph';
import { Action, ActionSchema } from '@repo/core';
import WalkService from './walk.service';
import { CommandStatus } from './command';

type Input = {
  purpose: string;
  ask: string;
  map: string;
  hash: string;
};

const connectedStreams: Map<
  string,
  StreamInOut<Input, ResponseDto<Action>>
> = new Map();

interface HandshakeRequest {
  executionId: string;
}

export const walk = api.streamInOut<
  HandshakeRequest,
  Input,
  ResponseDto<Action>
>(
  { expose: true, auth: false, path: '/ws/walk' },
  async (handshake, stream) => {
    connectedStreams.set(handshake.executionId, stream);

    log.debug('Stream connected:', stream);
    try {
      // The stream object is an AsyncIterator that yields incoming messages.
      // The loop will continue as long as the client keeps the connection open.
      for await (const payload of stream) {
        for (const [key, val] of connectedStreams) {
          try {
            // Parse map
            const map: Record<string, unknown> = JSON.parse(payload.map);

            // Invoke
            const config = {
              configurable: { thread_id: handshake.executionId },
            };
            const commands = await WalkService.findCommandsByExecutionId(
              handshake.executionId,
              5,
            );
            const prompt = `
              DESCRIPTION: You are an assistant helping user walk the web. 
              REQUIREMENT: You are given a MAP and must decide on the next ACTION to take depend on what was asked from ASK.
              ASK: ${payload.ask}
              MAP: ${JSON.stringify(map)}
              STRUCTURE: The MAP object has ITEMS
              STRUCTURE: An ITEM has a uniqueKey, which is DOM-queryable, to select this item, the ACTION response should "query" field to the item "uniqueKey".
              "itemKey": {
                  "children": {
                    "itemKey": {
                      "children": {},
                      "content": {}
                      "data": {}
                      "options": {}
                  }
                  "content": {}
                  "data": {}
                  "options": {}
              }
              FORMAT: Output is an Action and must match the required schema exactly.
              HISTORY: ${JSON.stringify(commands.result)}
            `;
            const result = await graph.invoke(
              {
                prompt: prompt,
              },
              config,
            );

            // Validate response (type predicate)
            const action = ActionSchema.parse(result.response);

            // Save to database
            await WalkService.pushCommand({
              executionId: handshake.executionId,
              payload: action,
              status: CommandStatus.DRAFTING,
            });

            // Respond back to client
            await val.send({
              success: true,
              message: 'Command received and processed successfully',
              result: action,
            });
          } catch (err) {
            log.error('Error processing message:', err);
            await val.send({
              success: false,
              message: 'Error processing command',
              error: err instanceof Error ? err.message : String(err),
            });
            connectedStreams.delete(key);
          }
        }
      }
    } catch (err) {
      connectedStreams.delete(handshake.executionId);
    }
    connectedStreams.delete(handshake.executionId);
  },
);
