import { Min } from "encore.dev/validate";
import { ResponseDto } from "../shared/interface";
import { Session, SessionWithMessages } from "../shared/shared-chat.interface";

export interface QuerySessionResponseDto extends ResponseDto<SessionWithMessages> {}

export interface GetSessionsResponseDto extends ResponseDto<Session[]> {}

export interface CreateSessionResponseDto extends ResponseDto<Session> {}

export interface UpdateSessionBodyDto extends Partial<Pick<Session, "id" | "title" | "retention" | "expireAt">> {}

export interface UpdateSessionResponseDto extends ResponseDto<Session> {}

export interface DeleteSessionParamsDto {
  sessionId: number & (Min<0>);
}