import { ResponseDto } from "../shared/dto/response.dto";
import { CommandDto, CreateCommandDto } from "./command";
import { ExecutionDto } from "./execution";
import { CreateExecutionDto, UpdateExecutionDto } from "./execution/dto";
import { ExecutionWithCommandsDto } from "./walk.dto";
import WalkRepository from "./walk.repo";


const WalkService = {
    // Command
    pushCommand: async (data: CreateCommandDto): Promise<ResponseDto<CommandDto>> => {
        try {
            const result = await WalkRepository.pushCommand(data);
            return {
                success: true,
                message: "Command pushed successfully",
                result: result,
            };
        } catch (error) {
            throw error;
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

    findExecutionById: async (id: string): Promise<ResponseDto<ExecutionWithCommandsDto | undefined>> => {
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

    findExecutionsBySessionId: async (sessionId: string): Promise<ResponseDto<ExecutionWithCommandsDto[]>> => {
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
            await WalkRepository.softDeleteCommandsByExecutionId(id);
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
            await WalkRepository.restoreCommandsByExecutionId(id);
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
            await WalkRepository.deleteCommandsByExecutionId(id);
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