import { CreateSessionResponseDto, GetSessionsResponseDto, QuerySessionResponseDto, UpdateSessionBodyDto, UpdateSessionResponseDto } from "./session.dto";
import { ResponseDto } from "../../shared/dto/response.dto";
import SessionRepository from "./session.repo";
import { SessionNotFoundError } from "./session.error";
import { startOfDay, addDays } from "date-fns";

const SessionService = {
  createSession: async ({ userId }: { userId: string }): Promise<CreateSessionResponseDto> => {
    const result = await SessionRepository.createSession({ userId });
    const session = result[0];
    return {
      success: true,
      result: session,
      message: "Session created successfully",
    };
  },

  querySession: async ({ userId, sessionId }: { userId: string; sessionId: string }): Promise<QuerySessionResponseDto> => {
    const result = await SessionRepository.querySession({ userId, sessionId });
    if (result.length === 0) throw SessionNotFoundError;
    const session = result[0];
    const messages = session.messages;
    return {
      success: true,
      result: session,
      message: "Session retrieved successfully",
    };
  },

  listSessions: async ({ userId }: { userId: string }): Promise<GetSessionsResponseDto> => {
    const result = await SessionRepository.listSessions({ userId });
    return {
      success: true,
      result: result,
      message: "Sessions retrieved successfully",
    };
  },

  updateSession: async ({ userId, sessionId, title, retention }: UpdateSessionBodyDto & { userId: string; sessionId: string; }): Promise<UpdateSessionResponseDto> => {
    const oldSession = (await SessionRepository.querySession({ userId, sessionId }))[0];
    if (!oldSession) throw SessionNotFoundError;
    const result = await SessionRepository.updateSession({ 
      userId, 
      sessionId, 
      newSession: {
        ...oldSession,
        title: title ?? oldSession.title,
        retention: retention ?? oldSession.retention,
        expireAt: retention ? addDays(startOfDay(new Date(oldSession.createdAt)), retention) : oldSession.expireAt,
      }
    });

    if (result.length === 0) throw SessionNotFoundError;

    return {
      success: true,
      result: result[0],
      message: `Session ${sessionId} updated successfully`,
    };
  },

  deleteSession: async ({ userId, sessionId }: { userId: string; sessionId: string }): Promise<ResponseDto<null>> => {
    await SessionRepository.deleteSession({ userId, sessionId });
    return {
      success: true,
      result: null,
      message: `Session ${sessionId} deleted successfully`,
    };
  },

  deleteAllSessions: async ({ userId }: { userId: string }): Promise<ResponseDto<null>> => {
    await SessionRepository.deleteAllSessions({ userId });
    return {
      success: true,
      result: null,
      message: "All sessions deleted successfully for user " + userId,
    };
  },

  restoreSession: async ({ userId, sessionId }: { userId: string; sessionId: string }): Promise<ResponseDto<null>> => {
    await SessionRepository.restoreSession({ userId, sessionId });
    return {
      success: true,
      result: null,
      message: `Session ${sessionId} restored successfully`,
    };
  },

  restoreAllSessions: async ({ userId }: { userId: string }): Promise<ResponseDto<null>> => {
    await SessionRepository.restoreAllSessions({ userId });
    return {
      success: true,
      result: null,
      message: "All sessions restored successfully for user " + userId,
    };
  },
};

export default SessionService;