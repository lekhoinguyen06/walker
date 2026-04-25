import { randomUUID } from "crypto";
import { CreateSessionResponseDto, QuerySessionResponseDto } from "./session.interface";
import { ResponseDto } from "../shared/interface";

const SessionService = {
  createSession: async ({ userId }: { userId: string }): Promise<CreateSessionResponseDto> => {
    return {
      success: true,
      result: {
        id: randomUUID(),
        userId,
        title: "New Session",
        deleted: false,
        retention: 30,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      message: "Session created successfully",
    };
  },

  querySession: async ({ userId, sessionId }: { userId: string; sessionId: string }): Promise<QuerySessionResponseDto> => {
    return {
      success: true,
      result: {
        id: sessionId,
        userId,
        title: "New Session",
        deleted: false,
        retention: 30,
        createdAt: new Date(),
        updatedAt: new Date(),
        messages: [
          {
            id: randomUUID(),
            sessionId,
            role: "system",
            content: "Hello, how are you?",
            deleted: false,
            createdAt: new Date(),
            updatedAt: new Date(),
          }
        ]
      },
      message: "Session retrieved successfully",
    };
  },

  deleteSession: async ({ userId, sessionId }: { userId: string; sessionId: string }): Promise<ResponseDto<null>> => {
    return {
      success: true,
      result: null,
      message: `Session ${sessionId} deleted successfully`,
    };
  },
};

export default SessionService;