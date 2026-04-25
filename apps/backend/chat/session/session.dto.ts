import { Min } from "encore.dev/validate";
import { ResponseDto } from "../../shared/dto/response.dto";
import { SessionDto, SessionWithMessagesDto } from "../../shared/dto/shared-chat.dto";

export interface QuerySessionResponseDto extends ResponseDto<SessionWithMessagesDto> {}

export interface GetSessionsResponseDto extends ResponseDto<SessionDto[]> {}

export interface CreateSessionResponseDto extends ResponseDto<SessionDto> {}

export interface UpdateSessionBodyDto extends Partial<Pick<SessionDto, "id" | "title" | "retention" | "expireAt">> {}

export interface UpdateSessionResponseDto extends ResponseDto<SessionDto> {}

export interface DeleteSessionParamsDto {
  sessionId: number & (Min<0>);
}