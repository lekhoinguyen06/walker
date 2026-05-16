// Websocket /walk/execution/:executionId: can use the execution ID to subscribe/publish to the channel of that execution

import log from "encore.dev/log";
import { api, StreamInOut } from "encore.dev/api";
import { CommandDto } from "./command";
import { ResponseDto } from "../shared/dto/response.dto";
import { graph } from "./walk.graph";
import WalkService from "./walk.service";
import { Action, ActionSchema } from "@repo/core";

type Input = {
  purpose: string;
  ask: string;
  map: string;
}

const connectedStreams: Map<
  string,
  StreamInOut<Input, ResponseDto<Action>>
> = new Map();

interface HandshakeRequest {
  executionId: string;
}

export const walk = api.streamInOut<HandshakeRequest, Input, ResponseDto<Action>>(
  { expose: true, auth: false, path: "/ws/walk" },
  async (handshake, stream) => {
    connectedStreams.set(handshake.executionId, stream);

    log.debug("Stream connected:", stream);
    try {
      // The stream object is an AsyncIterator that yields incoming messages.
      // The loop will continue as long as the client keeps the connection open.
      for await (const payload of stream) {
        for (const [key, val] of connectedStreams) {
          try {
            // Parse map
            const map: Record<string, unknown> = JSON.parse(payload.map);

            // Invoke
            const config = { configurable: { thread_id: handshake.executionId } };
            const prompt = `
              DESCRIPTION: You are an assistant helping user walk the web. 
              REQUIREMENT: You are given a MAP and must decide on the next ACTION to take depend on what was asked from ASK.
              ASK: ${payload.ask}
              MAP: ${JSON.stringify(map)}
              FORMAT: Output is an Action and must match the required schema exactly.
            `;
            const result = await graph.invoke({
              purpose: prompt,
              history: [],
            }, config)

            const action = ActionSchema.parse(result.response);

            await val.send({
              success: true,
              message: "Command received and processed successfully",
              result: action,
            });
          } catch (err) {
            log.error("Error processing message:", err);
            await val.send({
              success: false,
              message: "Error processing command",
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