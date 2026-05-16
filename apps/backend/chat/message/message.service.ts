import { MessageDto } from "./message.model";
import { CreateMsgBodyDto } from "./message.dto";
import MessageRepository from "./message.repo";
import { MessageLimits } from "./message.const";
import log from "encore.dev/log";
import { isValidUUID } from "../../shared/utils";
import { APIError } from "encore.dev/api";

const MessageService = {
    async addMsg(msg: CreateMsgBodyDto): Promise<MessageDto> {
        const result = await MessageRepository.addMsg(msg);
        const [addedMsg] = result;
        return addedMsg;
    },

    async getMsgs({sessionId, page = 1, limit = MessageLimits.MaxTopic}: {sessionId: string; page?: number; limit?: number}): Promise<MessageDto[]> {
        if (!isValidUUID(sessionId)) {
            log.error("Invalid session UUID", { sessionId });
            throw APIError.invalidArgument("Invalid session UUID");
        }
        
        const msgs = await MessageRepository.getMsgs({ sessionId, page, limit });
        const length = msgs.length;
        if (length >= MessageLimits.MaxTopic) {
            // Delete previous messages using oldest message as reference
            log.debug('Msgs before this msg will be deleted:', msgs[MessageLimits.MaxPaginationLimit - 1]);
            const oldestMsg = msgs[MessageLimits.MaxPaginationLimit - 1];
            await MessageRepository.hardDeleteMsgsBeforeMsgId({ sessionId, timestamp: oldestMsg.createdAt });
            return await MessageRepository.getMsgs({ sessionId, page, limit });
        }
        return msgs;
    },
    
    async deleteMsg(msgId: string): Promise<void> {
        if (!isValidUUID(msgId)) {
            log.error("Invalid message UUID", { msgId });
            throw APIError.invalidArgument("Invalid message UUID");
        }
        await MessageRepository.deleteMsg({ msgId });
    }
}

export default MessageService;