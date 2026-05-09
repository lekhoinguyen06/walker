import { ResponseDto } from "../shared/dto/response.dto";
import { CommandDto } from "./command";
import { ExecutionDto } from "./execution";
import { ExecutionWithCommandsDto } from "./walk.dto";
import WalkRepository from "./walk.repo";


const WalkService = {
    // Command
    push: async (executionId: string, data: CommandDto<unknown>): Promise<void> => {
        await WalkRepository.pushCommand(executionId, data);
    },

    findCommandsByExecutionId: async (executionId: string): Promise<CommandDto<unknown>[]> => {
        return await WalkRepository.findCommandsByExecutionId(executionId);
    },

    softDeleteByExecutionId: async (executionId: string, commandId: string): Promise<void> => {
        await WalkRepository.softDeleteCommandByExecutionId(executionId, commandId);
    },

    restoreByExecutionId: async (executionId: string, commandId: string): Promise<void> => {
        await WalkRepository.restoreCommandByExecutionId(executionId, commandId);
    },

    deleteByExecutionId: async (executionId: string, commandId: string): Promise<void> => {
        await WalkRepository.deleteCommandByExecutionId(executionId, commandId);
    },

     // Execution
     create: async (data: ExecutionDto): Promise<void> => {
        await WalkRepository.createExecution(data);
    },

    update: async (id: string, data: Partial<ExecutionDto>): Promise<void> => {
        await WalkRepository.updateExecution(id, data);
    },

    findById: async (id: string): Promise<ExecutionWithCommandsDto<unknown> | undefined> => {
        return await WalkRepository.findExecutionById(id);
    },

    findBySessionId: async (sessionId: string): Promise<ExecutionWithCommandsDto<unknown>[] | null> => {
        return await WalkRepository.findExecutionsBySessionId(sessionId);
    },

    softDelete: async (id: string): Promise<ResponseDto<void>> => {
        await WalkRepository.softDeleteExecution(id);
        return {
            success: true,
            message: "Execution soft deleted successfully",
        };
    },

    restore: async (id: string): Promise<ResponseDto<void>> => {
        await WalkRepository.restoreExecution(id);
        return {
            success: true,
            message: "Execution restored successfully",
        };
    },

    delete: async (id: string): Promise<ResponseDto<void>> => {
        await WalkRepository.deleteExecution(id);
        return {
            success: true,
            message: "Execution deleted successfully",
        };
    },
}

export default WalkService;