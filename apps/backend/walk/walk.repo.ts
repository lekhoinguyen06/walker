import { eq, and } from 'drizzle-orm';
import { db } from './database';
import { ExecutionDto } from './execution';
import { execution, command } from './schema';
import { CommandDto } from './command';

const WalkRepository = {
    // Command
    push<T>(executionId: string, data: CommandDto<T>) {
        return db.insert(command).values({ ...data, executionId })
    },

    modifyByExecutionId<T>(executionId: string, commandId: string, data: Partial<CommandDto<T>>) {
        return db.update(command).set(data).where(and(eq(command.executionId, executionId), eq(command.id, commandId)))
    },

    findCommandsByExecutionId<T>(executionId: string) {
        return db.select().from(command).where(eq(command.executionId, executionId))
    },

    softDeleteByExecutionId(executionId: string, commandId: string) {
        return db.update(command).set({ deleted: true, deletedAt: new Date() }).where(and(eq(command.executionId, executionId), eq(command.id, commandId)))
    },

    restoreByExecutionId(executionId: string, commandId: string) {
        return db.update(command).set({ deleted: false, deletedAt: null }).where(and(eq(command.executionId, executionId), eq(command.id, commandId)))
    },

    deleteByExecutionId(executionId: string, commandId: string) {
        return db.delete(command).where(and(eq(command.executionId, executionId), eq(command.id, commandId)))
    },

    // Execution
    create(data: ExecutionDto) {
        return db.insert(execution).values(data)
    },

    update(id: string, data: Partial<ExecutionDto>) {
        return db.update(execution).set(data).where(eq(execution.id, id))
    },

    findById(id: string) {
        return db.select().from(execution).where(eq(execution.id, id))
    },

    findBySessionId(sessionId: string) {
        return db.select().from(execution).where(eq(execution.sessionId, sessionId))
    },

    softDelete(id: string) {
        return db.update(execution).set({ deleted: true, deletedAt: new Date() }).where(eq(execution.id, id))
    },

    restore(id: string) {
        return db.update(execution).set({ deleted: false, deletedAt: null }).where(eq(execution.id, id))
    },

    delete(id: string) {
        return db.delete(execution).where(eq(execution.id, id))
    },
}

export default WalkRepository;