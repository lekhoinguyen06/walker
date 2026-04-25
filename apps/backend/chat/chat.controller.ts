import { api, StreamInOut } from "encore.dev/api";
import log from "encore.dev/log";
import claude from "./claude";
import { CreateSessionResponseDto, GetSessionsResponseDto, QuerySessionResponseDto, UpdateSessionBodyDto, UpdateSessionResponseDto } from "./session.interface";
import { EmptyDto, ResponseDto } from "../shared/interface";
import { getAuthData } from "~encore/auth";
import { AuthDto } from "../shared/shared-auth.interface";
import { randomUUID } from "node:crypto";
import { Message } from "../shared/shared-chat.interface";
import { Session } from "node:inspector/promises";
import SessionService from "./session.service";

const connectedStreams: Map<
  string,
  StreamInOut<Message, Message>
> = new Map();

interface HandshakeRequest {
  id: string;
}

export const chat = api.streamInOut<HandshakeRequest, Message, Message>(
  { expose: true, auth: false, path: "/chat" },
  async (handshake, stream) => {
    connectedStreams.set(handshake.id, stream);

    log.info("Stream connected:", stream);
    try {
      // The stream object is an AsyncIterator that yields incoming messages.
      // The loop will continue as long as the client keeps the connection open.
      for await (const chatMessage of stream) {
        for (const [key, val] of connectedStreams) {
          try {
            const res = await claude.invoke(chatMessage.content);
            await val.send({ ...chatMessage, role: "assistant", content: res.content.toString(), createdAt: new Date() });
          } catch (err) {
            connectedStreams.delete(key);
          }
        }
      }
    } catch (err) {
      connectedStreams.delete(handshake.id);
    }
    connectedStreams.delete(handshake.id);
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
