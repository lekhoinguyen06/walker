import { api } from "encore.dev/api";
import { CreateSessionResponseDto, GetSessionsResponseDto, QuerySessionResponseDto, UpdateSessionBodyDto, UpdateSessionResponseDto } from "./session/session.dto";
import { ResponseDto } from "../shared/dto/response.dto";
import { getAuthData } from "~encore/auth";
import { AuthDto } from "../shared/dto/shared-auth.dto";
import SessionService from "./session/session.service";
import { EmptyDto } from "../shared/dto/shared.dto";

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
  { expose: true, auth: true, method: "GET", path: "/chat" },
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
