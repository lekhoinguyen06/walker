import { eq, and } from 'drizzle-orm';
import { db } from './database';
import { ExecutionDto } from './execution';
import { execution, command } from './schema';
import { CommandDto } from './command';

const WalkRepository = {
    // Command
    pushCommand<T>(executionId: string, data: CommandDto<T>) {
        return db.insert(command).values({ ...data, executionId })
    },

    findCommandsByExecutionId<T>(executionId: string) {
        return db.select().from(command).where(eq(command.executionId, executionId))
    },

    softDeleteCommandByExecutionId(executionId: string, commandId: string) {
        return db.update(command).set({ deleted: true, deletedAt: new Date() }).where(and(eq(command.executionId, executionId), eq(command.id, commandId)))
    },

    restoreCommandByExecutionId(executionId: string, commandId: string) {
        return db.update(command).set({ deleted: false, deletedAt: null }).where(and(eq(command.executionId, executionId), eq(command.id, commandId)))
    },

    deleteCommandByExecutionId(executionId: string, commandId: string) {
        return db.delete(command).where(and(eq(command.executionId, executionId), eq(command.id, commandId)))
    },

    // Execution
    createExecution(data: ExecutionDto) {
        return db.insert(execution).values(data)
    },

    updateExecution(id: string, data: Partial<ExecutionDto>) {
        return db.update(execution).set(data).where(eq(execution.id, id))
    },

    findExecutionById(id: string) {
        return db.query.execution.findFirst({
            where: eq(execution.id, id),
            with: {
                commands: true,
            },
        })
    },

    findExecutionsBySessionId(sessionId: string) {
        return db.query.execution.findMany({
            where: eq(execution.sessionId, sessionId),
            with: {
                commands: true,
            },
        })
    },

    softDeleteExecution(id: string) {
        return db.update(execution).set({ deleted: true, deletedAt: new Date() }).where(eq(execution.id, id))
    },

    restoreExecution(id: string) {
        return db.update(execution).set({ deleted: false, deletedAt: null }).where(eq(execution.id, id))
    },

    deleteExecution(id: string) {
        return db.delete(execution).where(eq(execution.id, id))
    },
}

export default WalkRepository;