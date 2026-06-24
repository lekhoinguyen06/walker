import { eq, and } from 'drizzle-orm';
import { db } from '../database';
import { messages, sessions } from '../schema';
import { UpdateSessionBodyDto } from './session.dto';
import { addDays, startOfDay } from 'date-fns';

const SessionRepository = {
  async createSession({ userId }: { userId: string }) {
    const result = await db
      .insert(sessions)
      .values({
        userId,
        title: 'New Session',
        retention: 30,
        expireAt: addDays(startOfDay(new Date()), 30),
      })
      .returning();

    return result[0];
  },

  querySession: ({
    userId,
    sessionId,
  }: {
    userId: string;
    sessionId: string;
  }) => {
    return db.query.sessions.findMany({
      where: and(
        eq(sessions.id, sessionId),
        eq(sessions.userId, userId),
        eq(sessions.deleted, false),
      ),
      with: {
        messages: {
          where: and(
            eq(messages.deleted, false),
            eq(messages.sessionId, sessionId),
          ),
        },
      },
    });
  },

  listSessions: ({ userId }: { userId: string }) => {
    return db.query.sessions.findMany({
      where: and(eq(sessions.userId, userId), eq(sessions.deleted, false)),
    });
  },

  updateSession: async ({
    userId,
    sessionId,
    newSession,
  }: UpdateSessionBodyDto & {
    userId: string;
    sessionId: string;
    newSession: UpdateSessionBodyDto;
  }) => {
    const result = await db
      .update(sessions)
      .set(newSession)
      .where(
        and(
          eq(sessions.id, sessionId),
          eq(sessions.userId, userId),
          eq(sessions.deleted, false),
        ),
      )
      .returning();
    return result[0];
  },

  deleteSession: ({
    userId,
    sessionId,
  }: {
    userId: string;
    sessionId: string;
  }) => {
    return db
      .update(sessions)
      .set({
        deleted: true,
        deletedAt: new Date(),
      })
      .where(
        and(
          eq(sessions.id, sessionId),
          eq(sessions.userId, userId),
          eq(sessions.deleted, false),
        ),
      );
  },

  restoreSession: ({
    userId,
    sessionId,
  }: {
    userId: string;
    sessionId: string;
  }) => {
    return db
      .update(sessions)
      .set({
        deleted: false,
        deletedAt: null,
      })
      .where(
        and(
          eq(sessions.id, sessionId),
          eq(sessions.userId, userId),
          eq(sessions.deleted, true),
        ),
      );
  },

  deleteAllSessions: ({ userId }: { userId: string }) => {
    return db
      .update(sessions)
      .set({
        deleted: true,
        deletedAt: new Date(),
      })
      .where(and(eq(sessions.userId, userId), eq(sessions.deleted, false)));
  },

  restoreAllSessions: ({ userId }: { userId: string }) => {
    return db
      .update(sessions)
      .set({
        deleted: false,
        deletedAt: null,
      })
      .where(and(eq(sessions.userId, userId), eq(sessions.deleted, true)));
  },

  permanentlyDeleteSession: ({
    userId,
    sessionId,
  }: {
    userId: string;
    sessionId: string;
  }) => {
    return db
      .delete(sessions)
      .where(
        and(
          eq(sessions.id, sessionId),
          eq(sessions.userId, userId),
          eq(sessions.deleted, true),
        ),
      );
  },

  permanentlyDeleteAllSessions: ({ userId }: { userId: string }) => {
    return db
      .delete(sessions)
      .where(and(eq(sessions.userId, userId), eq(sessions.deleted, true)));
  },
};

export default SessionRepository;
