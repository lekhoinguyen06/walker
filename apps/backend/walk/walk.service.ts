import { APIError } from "encore.dev/api";
import { ResponseDto } from "../shared/dto/response.dto";
import { CommandDto, CreateCommandDto } from "./command";
import { ExecutionDto } from "./execution";
import { CreateExecutionDto, UpdateExecutionDto } from "./execution/dto";
import { ExecutionWithCommandsDto } from "./walk.dto";
import WalkRepository from "./walk.repo";
import log from "encore.dev/log";
import z from "zod";

const isValidUUID = (id: string): boolean => {
    return z.uuid().safeParse(id).success;
}


const WalkService = {
    // Command
    pushCommand: async (data: CreateCommandDto): Promise<ResponseDto<CommandDto>> => {
        const result = await WalkRepository.pushCommand(data);
        return {
            success: true,
            message: "Command pushed successfully",
            result: result,
        };
    },

    // Execution
    createExecution: async (data: CreateExecutionDto): Promise<ResponseDto<ExecutionDto>> => {
        const result = await WalkRepository.createExecution(data);
        return {
            success: true,
            message: "Execution created successfully",
            result: result,
        };
    },

    updateExecution: async (id: string, data: UpdateExecutionDto): Promise<ResponseDto<null>> => {
        if (!isValidUUID(id)) {
            log.error("Invalid execution ID", { id });
            throw APIError.invalidArgument("Invalid execution ID");
        }

        await WalkRepository.updateExecution(id, data).then((result) => {
            if (result.rowCount === 0) {
                log.error("Execution not found for update", { id });
                throw APIError.notFound("Execution not found");
            }
        });

        return {
            success: true,
            message: "Execution updated successfully",
        };
    },

    findExecutionById: async (id: string): Promise<ResponseDto<ExecutionWithCommandsDto | undefined>> => {
        if (!isValidUUID(id)) {
            log.error("Invalid execution ID", { id });
            throw APIError.invalidArgument("Invalid execution ID");
        }
        const result = await WalkRepository.findExecutionById(id);

        if (!result) {
            log.error("Execution not found", { id });
            throw APIError.notFound("Execution not found");
        }

        return {
            success: true,
            message: "Execution found successfully",
            result: result,
        };
    },

    findExecutionsBySessionId: async (sessionId: string): Promise<ResponseDto<ExecutionWithCommandsDto[]>> => {
        if (!isValidUUID(sessionId)) {
            log.error("Invalid session ID", { sessionId });
            throw APIError.invalidArgument("Invalid session ID");
        }
        
        const result = await WalkRepository.findExecutionsBySessionId(sessionId);
        return {
            success: true,
            message: "Executions found successfully",
            result: result,
        };
    },

    softDeleteExecution: async (id: string): Promise<ResponseDto<null>> => {
        if (!isValidUUID(id)) {
            log.error("Invalid execution ID", { id });
            throw APIError.invalidArgument("Invalid execution ID");
        }
        
        await WalkRepository.softDeleteExecution(id).then((result) => {
            if (result.rowCount === 0) {
                log.error("Execution not found for soft delete", { id });
                throw APIError.notFound("Execution not found");
            }
        });

        await WalkRepository.softDeleteCommandsByExecutionId(id);

        return {
            success: true,
            message: "Execution deleted successfully",
        };
    },

    restoreExecution: async (id: string): Promise<ResponseDto<null>> => {
        if (!isValidUUID(id)) {
            log.error("Invalid execution ID", { id });
            throw APIError.invalidArgument("Invalid execution ID");
        }
        
        await WalkRepository.restoreExecution(id).then((result) => {
            if (result.rowCount === 0) {
                log.error("Execution not found for restore", { id });
                throw APIError.notFound("Execution not found");
            }
        });

        await WalkRepository.restoreCommandsByExecutionId(id);
        return {
            success: true,
            message: "Execution restored successfully",
        };
    },

    deleteExecution: async (id: string): Promise<ResponseDto<null>> => {
        if (!isValidUUID(id)) {
            log.error("Invalid execution ID", { id });
            throw APIError.invalidArgument("Invalid execution ID");
        }

        await WalkRepository.deleteExecution(id).then((result) => {
            if (result.rowCount === 0) {
                log.error("Execution not found for delete", { id });
                throw APIError.notFound("Execution not found");
            }
        });

        await WalkRepository.deleteCommandsByExecutionId(id);
        return {
            success: true,
            message: "Execution permanently deleted successfully",
        };
    },
}

export default WalkService;