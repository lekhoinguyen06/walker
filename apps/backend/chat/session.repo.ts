import { eq, and } from "drizzle-orm";
import { db } from "./database";
import { messages, sessions } from "./schema";

const SessionRepository = {
    createSession: ({ userId }: { userId: string; }) => {
        return db
            .insert(sessions)
            .values({
                userId,
                title: "New Session",
            })
            .returning();
    },

    querySession: ({ userId, sessionId }: { userId: string; sessionId: string; }) => {
        return db.query.sessions.findMany({
            where: and(eq(sessions.id, sessionId), eq(sessions.userId, userId), eq(sessions.deleted, false)),
            with: {
                messages: {
                    where: and(eq(messages.deleted, false), eq(messages.sessionId, sessionId)),
                },
            },
        });
    },

    deleteSession: ({ userId, sessionId }: { userId: string; sessionId: string; }) => {
        return db
            .update(sessions)
            .set({
                deleted: true,
                deletedAt: new Date(),
            })
            .where(and(eq(sessions.id, sessionId), eq(sessions.userId, userId), eq(sessions.deleted, false)));
    }
}

export default SessionRepository;