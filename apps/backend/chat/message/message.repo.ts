import { and, eq, lt } from "drizzle-orm";
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

    getMsgs({ sessionId, page, limit }: { sessionId: string; page: number; limit: number; }) {
        return db
            .select()
            .from(messages)
            .where(eq(messages.sessionId, sessionId))
            .orderBy(messages.createdAt)
            .limit(limit)
            .offset((page - 1) * limit);
    },

    deleteMsg({ msgId }: { msgId: string; }) {
        return db
            .update(messages)
            .set({
                deleted: true,
                deletedAt: new Date(),
            })
            .where(eq(messages.id, msgId));
    },

    hardDeleteMsgsBeforeMsgId({ sessionId, timestamp }: { sessionId: string; timestamp: Date; }) {
        return db
            .delete(messages)
            .where(
                and(
                    eq(messages.sessionId, sessionId),
                    lt(messages.createdAt, timestamp)
                )
            );
    }
}

export default MessageRepository;