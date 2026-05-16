// Websocket /walk/execution/:executionId: can use the execution ID to subscribe/publish to the channel of that execution

import log from "encore.dev/log";
import { api, StreamInOut } from "encore.dev/api";
import { CommandDto, CommandPayloadType } from "./command";
import { ResponseDto } from "../shared/dto/response.dto";
import { ActionSchema } from "@repo/core";

const connectedStreams: Map<
  string,
  StreamInOut<CommandDto<string>, ResponseDto<CommandDto | any>>
> = new Map();

interface HandshakeRequest {
  sessionId: string;
}

export const walk = api.streamInOut<HandshakeRequest, CommandDto<string>, ResponseDto<CommandDto | any>>(
  { expose: true, auth: false, path: "/ws/walk" },
  async (handshake, stream) => {
    connectedStreams.set(handshake.sessionId, stream);

    log.debug("Stream connected:", stream);
    try {
      // The stream object is an AsyncIterator that yields incoming messages.
      // The loop will continue as long as the client keeps the connection open.
      for await (const command of stream) {
        for (const [key, val] of connectedStreams) {
          try {
            // Route
            switch (command.payloadType) {
              case CommandPayloadType.ACTION: {
                // Parse payload
                const payload = JSON.parse(command.payload);
                const parsed = ActionSchema.safeParse(payload);

                if (parsed.success) {
                    const action = parsed.data;
                    await val.send({
                      success: true,
                      message: "Action command received and processed successfully",
                      result: action,
                    } as ResponseDto);

                    break;
                } else {
                    await val.send({
                        success: false,
                        message: "Invalid action command payload",
                        error: parsed.error,
                    } as ResponseDto);

                    break;
                }
              }
              case CommandPayloadType.MAP: {
                // Parse payload (must be valid json)
                const map = JSON.parse(command.payload);
                
                // Mock response
                await val.send({
                  success: true,
                  message: "Map command received and processed successfully",
                  result: map,
                } as ResponseDto);

                break;
              }
              default: {
                await val.send({
                    success: false,
                    message: "Unknown command payload type",
                    error: new Error("Unknown command payload type. Excepted payload types are: " + Object.values(CommandPayloadType).join(", ")),
                } as ResponseDto)
              }
            }
            // Respond
          } catch (err) {
            log.error("Error processing message:", err);
            connectedStreams.delete(key);
          }
        }
      }
    } catch (err) {
      connectedStreams.delete(handshake.sessionId);
    }
    connectedStreams.delete(handshake.sessionId);
  },
);