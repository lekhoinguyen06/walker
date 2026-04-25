import { Min } from "encore.dev/validate";
import { ResponseDto } from "../shared/interface";
import { Session, SessionWithMessages } from "../shared/shared-chat.interface";

export interface QuerySessionResponseDto extends ResponseDto<SessionWithMessages> {}

export interface GetSessionsResponseDto extends ResponseDto<Session[]> {}

export interface CreateSessionResponseDto extends ResponseDto<Session> {}

export interface UpdateSessionBodyDto extends Omit<CreateSessionResponseDto, "userId"> {} 

export interface DeleteSessionParamsDto {
  sessionId: number & (Min<0>);
}