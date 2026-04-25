import { MessageDto } from "../../shared/dto/shared-chat.dto";

export interface CreateMsgBodyDto extends Pick<MessageDto, "sessionId" | "role" | "content"> {}

export interface InputMsgDto extends Pick<MessageDto, "content"> {}