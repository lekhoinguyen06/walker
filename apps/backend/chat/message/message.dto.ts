import { MessageDto } from "./message.model";

export interface CreateMsgBodyDto extends Pick<MessageDto, "sessionId" | "role" | "content" | "type"> {}

export interface InputMsgDto extends Pick<MessageDto, "content"> {}