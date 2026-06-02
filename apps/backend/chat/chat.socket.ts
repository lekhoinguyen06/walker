import log from "encore.dev/log";
import { MessageDto } from "./message/message.model";
import { CreateMsgBodyDto, InputMsgDto } from "./message/message.dto";
import MessageService from "./message/message.service";
import { graph } from "./chat.graph";
import { MessageRole, MessageType } from "./message/message.const";
import { api, StreamInOut } from "encore.dev/api";

const connectedStreams: Map<
  string,
  StreamInOut<InputMsgDto, MessageDto>
> = new Map();

interface HandshakeRequest {
  sessionId: string;
}

export const chat = api.streamInOut<HandshakeRequest, InputMsgDto, MessageDto>(
  { expose: true, auth: false, path: "/ws/chat" },
  async (handshake, stream) => {
    connectedStreams.set(handshake.sessionId, stream);

    log.debug("Stream connected:", stream);
    try {
      // The stream object is an AsyncIterator that yields incoming messages.
      // The loop will continue as long as the client keeps the connection open.
      for await (const chatMessage of stream) {
        for (const [key, val] of connectedStreams) {
          try {
            log.debug("Received message:", chatMessage);

            // Store user message
            const addUserMsg: CreateMsgBodyDto = {
              sessionId: handshake.sessionId,
              type: MessageType.Question,
              role: MessageRole.User,
              content: chatMessage.content,
            }
            const addedUserMsg = await MessageService.addMsg(addUserMsg);

            // Get history
            const sessionMsgs = await MessageService.getMsgs({ sessionId: handshake.sessionId });
            const history = sessionMsgs.map((msg) => {
              return {
                role: msg.role ?? MessageRole.User,
                content: msg.content,
              }
            });

            // Invoke
            const config = { configurable: { thread_id: handshake.sessionId } };
            const result = await graph.invoke({
              prompt: `
                DESCRIPTION: You are an assistant helping user answer questions. 
                REQUIREMENT: You must answer the question based on the conversation history. 
                REQUIREMENT: If you don't know the answer, just say you don't know, don't try to make up an answer.
                HISTORY: ${JSON.stringify(history)}
              `,
              guardrail: `
                Guardrail: You must not answer questions that are not related to the conversation history.
                Guardrail: You must not answer questions that are harmful, unethical, or illegal.
                Message: ${chatMessage.content}
              `
            }, config)

            log.debug("LLM response:", result);

            // Store agent message
            const agentMsg: CreateMsgBodyDto = {
              sessionId: handshake.sessionId,
              role: MessageRole.Assistant,
              type: MessageType.Answer,
              content: result.response ?? "No response",
            }
            const addedAgentMsg = await MessageService.addMsg(agentMsg);

            log.debug("Added agent message:", addedAgentMsg);

            // Return
            await val.send({
              id: addedAgentMsg.id,
              sessionId: handshake.sessionId,
              role: MessageRole.Assistant,
              type: MessageType.Answer,
              content: result.response ?? "No response",
              createdAt: addedAgentMsg.createdAt,
              updatedAt: addedAgentMsg.updatedAt,
              deletedAt: addedAgentMsg.deletedAt,
              deleted: addedAgentMsg.deleted,
            });
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