import log from "encore.dev/log";
import { MessageDto } from "./message/message.model";
import { CreateMsgBodyDto, InputMsgDto } from "./message/message.dto";
import MessageService from "./message/message.service";
import { graph } from "./chat.graph";
import { MessageRole, MessageType } from "./message/message.const";
import { api, StreamInOut } from "encore.dev/api";

const connectedStreams: Map<
  string,
  StreamInOut<InputMsgDto, CreateMsgBodyDto>
> = new Map();

interface HandshakeRequest {
  sessionId: string;
}

export const chat = api.streamInOut<HandshakeRequest, InputMsgDto, CreateMsgBodyDto>(
  { expose: true, auth: false, path: "/ws/chat" },
  async (handshake, stream) => {
    const { sessionId } = handshake;
    connectedStreams.set(sessionId, stream);
    log.info("Stream connected", { sessionId });

    try {
      for await (const chatMessage of stream) {
        try {
          const userMsg: CreateMsgBodyDto = {
            sessionId,
            type: MessageType.Question,
            role: MessageRole.User,
            content: chatMessage.content,
          };

          const config = { configurable: { thread_id: sessionId } };
          const result = await graph.invoke({ history: JSON.stringify({}), prompt: chatMessage.content }, config).then((res) => res.response);

          if (!result) {
            log.warn("No response from graph", { sessionId, prompt: chatMessage.content });
            continue;
          }

          const agentMsg: CreateMsgBodyDto = {
            sessionId,
            role: MessageRole.Assistant,
            type: MessageType.Answer,
            content: result,
          };

          await MessageService.addMsg(userMsg);
          await MessageService.addMsg(agentMsg);
          await stream.send({ sessionId, role: MessageRole.Assistant, type: MessageType.Answer, content: result });
        } catch (err) {
          log.error("Error processing message", { sessionId, err: String(err) });
          // Don't rethrow — keep the stream alive for next message
        }
      }

      log.info("Stream closed by client", { sessionId });
    } catch (err) {
      log.error("Stream fatal error", { sessionId, err: String(err) });
    } finally {
      connectedStreams.delete(sessionId);
      log.info("Stream cleaned up", { sessionId });
    }
  },
);