import { eq } from "drizzle-orm";
import { db } from "../database";
import { messages } from "../schema";
import { CreateMsgBodyDto } from "./message.dto";

const MessageRepository = {
    addMsg(msg: CreateMsgBodyDto) {
        return db
            .insert(messages)
            .values(msg)
            .returning();
    },

    getMsgs({ sessionId }: { sessionId: string; }) {
        return db
            .select()
            .from(messages)
            .where(eq(messages.sessionId, sessionId))
            .orderBy(messages.createdAt);
    },

    deleteMsg({ msgId }: { msgId: string; }) {
        return db
            .update(messages)
            .set({
                deleted: true,
                deletedAt: new Date(),
            })
            .where(eq(messages.id, msgId));
    }
}

export default MessageRepository;