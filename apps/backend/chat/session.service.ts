import { randomUUID } from "crypto";
import { CreateSessionResponseDto, QuerySessionResponseDto } from "./session.interface";
import { ResponseDto } from "../shared/interface";
import SessionRepository from "./session.repo";

const SessionService = {
  createSession: async ({ userId }: { userId: string }): Promise<CreateSessionResponseDto> => {
    const result = await SessionRepository.createSession({ userId });
    const session = result[0];
    return {
      success: true,
      result: {
        id: session.id,
        userId: session.userId,
        title: session.title,
        deleted: session.deleted,
        retention: session.retention,
        createdAt: session.createdAt,
        updatedAt: session.updatedAt,
      },
      message: "Session created successfully",
    };
  },

  querySession: async ({ userId, sessionId }: { userId: string; sessionId: string }): Promise<QuerySessionResponseDto> => {
    const result = await SessionRepository.querySession({ userId, sessionId });
    if (result.length === 0) {
      return {
        success: false,
        message: "Session not found",
      };
    }
    const session = result[0];
    const messages = session.messages;
    return {
      success: true,
      result: {
        id: session.id,
        userId: session.userId,
        title: session.title,
        deleted: session.deleted,
        retention: session.retention,
        createdAt: session.createdAt,
        updatedAt: session.updatedAt,
        deletedAt: session.deletedAt,
        messages: messages,
      },
      message: "Session retrieved successfully",
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
};

export default SessionService;