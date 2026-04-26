import { MessageDto } from "./message.model";
import { CreateMsgBodyDto } from "./message.dto";
import MessageRepository from "./message.repo";

const MessageService = {
    async addMsg(msg: CreateMsgBodyDto): Promise<MessageDto> {
        const result = await MessageRepository.addMsg(msg);
        const [addedMsg] = result;
        return addedMsg;
    },

    async getMsgs(sessionId: string): Promise<MessageDto[]> {
        const msgs = await MessageRepository.getMsgs({ sessionId });
        return msgs;
    },
    
    async deleteMsg(msgId: string): Promise<void> {
        await MessageRepository.deleteMsg({ msgId });
    }
}

export default MessageService;