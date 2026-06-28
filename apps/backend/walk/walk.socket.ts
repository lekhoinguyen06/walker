// Websocket /walk/execution/:executionId: can use the execution ID to subscribe/publish to the channel of that execution

import log from 'encore.dev/log';
import { api, StreamInOut } from 'encore.dev/api';
import { ResponseDto } from '../shared/dto/response.dto';
import { graph } from './walk.graph';
import { Action, ActionSchema } from '@repo/core';
import WalkService from './walk.service';
import { CommandStatus } from './command';
import { buildWalkPrompt } from './walk.prompt';

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
    const sessionId = handshake.executionId;
    connectedStreams.set(sessionId, stream);
    log.info('Stream connected', { sessionId });

    try {
      for await (const payload of stream) {
        for (const [key, val] of connectedStreams) {
          try {
            const map: Record<string, unknown> = JSON.parse(payload.map);

            const commands = await WalkService.findCommandsByExecutionId(
              handshake.executionId,
              5,
            );

            const config = {
              configurable: { thread_id: handshake.executionId },
            };
            const result = await graph.invoke(
              {
                prompt: payload.ask,
                history: JSON.stringify(commands),
              },
              config,
            );
            if (!result || !result.action) {
              log.warn('No response from graph', {
                sessionId,
                prompt: payload.ask,
              });
              continue;
            }
            await WalkService.pushCommand({
              executionId: handshake.executionId,
              payload: result.action,
              status: CommandStatus.DRAFTING,
            });

            await val.send({
              success: true,
              message: 'Command received and processed successfully',
              result: result.action,
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
