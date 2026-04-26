import { MessageDto } from "../message/message.model";
import { SessionDto } from "../session/session.model";

export interface SessionWithMessagesDto extends SessionDto {
  messages: MessageDto[];
}