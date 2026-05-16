import { ResponseDto } from "../shared/dto/response.dto";
import { CommandDto, CommandInputDto } from "./command";
import { ExecutionDto } from "./execution";
import { CreateExecutionDto, UpdateExecutionDto } from "./execution/dto";
import { ExecutionWithCommandsDto } from "./walk.dto";
import WalkRepository from "./walk.repo";


const WalkService = {
    // Command
    pushCommand: async (executionId: string, data: CommandInputDto<unknown>): Promise<ResponseDto<CommandDto<unknown>>> => {
        try {
            const result = await WalkRepository.pushCommand(executionId, data);
            return {
                success: true,
                message: "Command pushed successfully",
                result: result,
            };
        } catch (error) {
            return {
                success: false,
                message: "Failed to push command",
                error: error
            };
        }
    },

    findCommandsByExecutionId: async (executionId: string): Promise<ResponseDto<CommandDto<unknown>[]>> => {
        try {
            const result = await WalkRepository.findCommandsByExecutionId(executionId);
            return {
                success: true,
                message: "Commands found successfully",
                result: result,
            };
        } catch (error) {
            return {
                success: false,
                message: "Failed to find commands",
                error: error
            };
        }
    },

    softDeleteCommandsByExecutionId: async (executionId: string, commandId: string): Promise<ResponseDto<null>> => {
        try {
            await WalkRepository.softDeleteCommandByExecutionId(executionId, commandId);
            return {
                success: true,
                message: "Command deleted successfully",
            };
        } catch (error) {
            return {
                success: false,
                message: "Failed to delete command",
                error: error
            };
        }
    },

    restoreCommandsByExecutionId: async (executionId: string, commandId: string): Promise<ResponseDto<null>> => {
        try {
            await WalkRepository.restoreCommandByExecutionId(executionId, commandId);
            return {
                success: true,
                message: "Command restored successfully",
            };
        } catch (error) {
            return {
                success: false,
                message: "Failed to restore command",
                error: error
            };
        }
    },

    deleteCommandsByExecutionId: async (executionId: string, commandId: string): Promise<ResponseDto<null>> => {
        try {
            await WalkRepository.deleteCommandByExecutionId(executionId, commandId);
            return {
                success: true,
                message: "Command deleted successfully",
            };
        } catch (error) {
            return {
                success: false,
                message: "Failed to delete command",
                error: error
            };
        }
    },

    // Execution
    createExecution: async (data: CreateExecutionDto): Promise<ResponseDto<ExecutionDto>> => {
        try {
            const result = await WalkRepository.createExecution(data);
            return {
                success: true,
                message: "Execution created successfully",
                result: result,
            };
        } catch (error) {
            return {
                success: false,
                message: "Failed to create execution",
                error: error
            };
        }
    },

    updateExecution: async (id: string, data: UpdateExecutionDto): Promise<ResponseDto<null>> => {
        try {
            await WalkRepository.updateExecution(id, data);
            return {
                success: true,
                message: "Execution updated successfully",
            };
        } catch (error) {
            return {
                success: false,
                message: "Failed to update execution",
                error: error
            };
        }
    },

    findExecutionById: async (id: string): Promise<ResponseDto<ExecutionWithCommandsDto<unknown> | undefined>> => {
        try {
            const result = await WalkRepository.findExecutionById(id);
            return {
                success: true,
                message: "Execution found successfully",
                result: result,
            };
        } catch (error) {
            return {
                success: false,
                message: "Failed to find execution",
                error: error
            };
        }
    },

    findExecutionsBySessionId: async (sessionId: string): Promise<ResponseDto<ExecutionWithCommandsDto<unknown>[]>> => {
        try {
            const result = await WalkRepository.findExecutionsBySessionId(sessionId);
            return {
                success: true,
                message: "Executions found successfully",
                result: result,
            };
        } catch (error) {
            return {
                success: false,
                message: "Failed to find executions",
                error: error
            };
        }
    },

    softDeleteExecution: async (id: string): Promise<ResponseDto<null>> => {
        try {
            await WalkRepository.softDeleteExecution(id);
            return {
                success: true,
                message: "Execution deleted successfully",
            };
        } catch (error) {
            return {
                success: false,
                message: "Failed to delete execution",
                error: error
            };
        }
    },

    restoreExecution: async (id: string): Promise<ResponseDto<null>> => {
        try {
            await WalkRepository.restoreExecution(id);
            return {
                success: true,
                message: "Execution restored successfully",
            };
        } catch (error) {
            return {
                success: false,
                message: "Failed to restore execution",
                error: error
            };
        }
    },

    deleteExecution: async (id: string): Promise<ResponseDto<null>> => {
        try {
            await WalkRepository.deleteExecution(id);
            return {
                success: true,
                message: "Execution permanently deleted successfully",
            };
        } catch (error) {
            return {
                success: false,
                message: "Failed to permanently delete execution",
                error: error
            };
        }
    },
}

export default WalkService;