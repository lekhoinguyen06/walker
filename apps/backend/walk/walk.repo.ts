import { eq, and } from 'drizzle-orm';
import { db } from './database';
import { ExecutionDto } from './execution';
import { execution, command } from './schema';
import { CommandDto, CreateCommandDto } from './command';
import { CreateExecutionDto, UpdateExecutionDto } from './execution/dto';

const WalkRepository = {
    // Command
    async pushCommand(data: CreateCommandDto): Promise<CommandDto> {
        const result = await db.insert(command).values(data).returning();
        return result[0];
    },

    findCommandsByExecutionId(executionId: string) {
        return db.select().from(command).where(eq(command.executionId, executionId))
    },

    softDeleteCommandsByExecutionId(executionId: string) {
        return db.update(command).set({ deleted: true, deletedAt: new Date() }).where(eq(command.executionId, executionId))
    },

    restoreCommandsByExecutionId(executionId: string) {
        return db.update(command).set({ deleted: false, deletedAt: null }).where(eq(command.executionId, executionId))
    },

    deleteCommandsByExecutionId(executionId: string) {
        return db.delete(command).where(eq(command.executionId, executionId))
    },

    // Execution
    async createExecution(data: CreateExecutionDto): Promise<ExecutionDto> {
        const result = await db.insert(execution).values(data).returning();
        return { ...result[0], commands: [] };
    },

    updateExecution(id: string, data: UpdateExecutionDto) {
        return db.update(execution).set(data).where(eq(execution.id, id))
    },

    findExecutionById(id: string) {
        return db.query.execution.findFirst({
            where: and(eq(execution.id, id), eq(execution.deleted, false)),
            with: {
                commands: true,
            },
        })
    },

    findExecutionsBySessionId(sessionId: string) {
        return db.query.execution.findMany({
            where: and(eq(execution.sessionId, sessionId), eq(execution.deleted, false)),
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