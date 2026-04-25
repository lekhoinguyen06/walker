import { api, StreamInOut } from "encore.dev/api";
import log from "encore.dev/log";
import { CreateSessionResponseDto, GetSessionsResponseDto, QuerySessionResponseDto, UpdateSessionBodyDto, UpdateSessionResponseDto } from "./session/session.dto";
import { ResponseDto } from "../shared/dto/response.dto";
import { getAuthData } from "~encore/auth";
import { AuthDto } from "../shared/dto/shared-auth.dto";
import { MessageDto } from "../shared/dto/shared-chat.dto";
import SessionService from "./session/session.service";
import { EmptyDto } from "../shared/dto/shared.dto";
import { CreateMsgBodyDto, InputMsgDto } from "./message/message.dto";
import { MessageRole } from "./message/message.const";
import MessageService from "./message/message.service";
import { graph } from "./llm";

const connectedStreams: Map<
  string,
  StreamInOut<InputMsgDto, MessageDto>
> = new Map();

interface HandshakeRequest {
  sessionId: string;
}

export const chat = api.streamInOut<HandshakeRequest, InputMsgDto, MessageDto>(
  { expose: true, auth: false, path: "/chat" },
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
              role: MessageRole.User,
              content: chatMessage.content,
            }
            const addedUserMsg = await MessageService.addMsg(addUserMsg);

            // Get history
            const sessionMsgs = await MessageService.getMsgs(handshake.sessionId);
            const history = sessionMsgs.map((msg) => {
              return {
                role: msg.role ?? MessageRole.User,
                content: msg.content,
              }
            });

            // Invoke
            const config = { configurable: { thread_id: handshake.sessionId } };
            const result = await graph.invoke({
              history: history,
            }, config)

            // Store agent message
            const agentMsg: CreateMsgBodyDto = {
              sessionId: handshake.sessionId,
              role: MessageRole.Assistant,
              content: result.response,
            }
            const addedAgentMsg = await MessageService.addMsg(agentMsg);

            // Return
            await val.send(addedAgentMsg);
          } catch (err) {
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

// HTTP
export const create = api(
  { expose: true, auth: true, method: "POST", path: "/chat" },
  async (_: EmptyDto): Promise<CreateSessionResponseDto> => {
    const auth = getAuthData() as AuthDto;

    return SessionService.createSession({ userId: auth.userID });
  }
);

export const query = api(
  { expose: true, auth: true, method: "GET", path: "/chat/:sessionId" },
  async ({ sessionId }: { sessionId: string }): Promise<QuerySessionResponseDto> => {
    const auth = getAuthData() as AuthDto;

    return SessionService.querySession({ userId: auth.userID, sessionId });
  }
);

export const update = api(
  { expose: true, auth: true, method: "PUT", path: "/chat/:sessionId" },
  async (params: { sessionId: string; } & UpdateSessionBodyDto): Promise<UpdateSessionResponseDto> => {
    const auth = getAuthData() as AuthDto;
    
    return SessionService.updateSession({ userId: auth.userID, ...params });
  }
);

export const list = api(
  { expose: true, auth: true, method: "GET", path: "/chat/list" },
  async (_: EmptyDto): Promise<GetSessionsResponseDto> => {
    const auth = getAuthData() as AuthDto;
    return SessionService.listSessions({ userId: auth.userID });
  }
);

export const deleteAll = api(
  { expose: true, auth: true, method: "DELETE", path: "/chat" },
  async (_: EmptyDto): Promise<ResponseDto<null>> => {
    const auth = getAuthData() as AuthDto;
    await SessionService.deleteAllSessions({ userId: auth.userID });
    return {
      success: true,
      message: "All sessions deleted successfully",
    };
  }
);


export const deleteSession = api(
  { expose: true, auth: true, method: "DELETE", path: "/chat/:sessionId" },
  async ({ sessionId }: { sessionId: string }): Promise<ResponseDto<null>> => {
    const auth = getAuthData() as AuthDto;
    
    return SessionService.deleteSession({ userId: auth.userID, sessionId });
  }
);

export const restoreSession = api(
  { expose: true, auth: true, method: "POST", path: "/chat/:sessionId/restore" },
  async ({ sessionId }: { sessionId: string }): Promise<ResponseDto<null>> => {
    const auth = getAuthData() as AuthDto;
    
    return SessionService.restoreSession({ userId: auth.userID, sessionId });
  }
);

export const restoreAllSessions = api(
  { expose: true, auth: true, method: "POST", path: "/chat/restore" },
  async (_: EmptyDto): Promise<ResponseDto<null>> => {
    const auth = getAuthData() as AuthDto;
    
    return SessionService.restoreAllSessions({ userId: auth.userID });
  }
);
