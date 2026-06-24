import { APIError } from 'encore.dev/api';
import { ResponseDto } from '../shared/dto/response.dto';
import { CommandDto, CreateCommandDto } from './command';
import { ExecutionDto } from './execution';
import { CreateExecutionDto, UpdateExecutionDto } from './execution/dto';
import { ExecutionWithCommandsDto } from './walk.dto';
import WalkRepository from './walk.repo';
import log from 'encore.dev/log';
import { validateUUID } from '../shared/utils';
import { ExecutionNotFoundError } from './walk.error';

const WalkService = {
  // Command
  pushCommand: async (
    data: CreateCommandDto,
  ): Promise<ResponseDto<CommandDto>> => {
    const result = await WalkRepository.pushCommand(data);
    return {
      success: true,
      message: 'Command pushed successfully',
      result: result,
    };
  },

  findCommandsByExecutionId: async (
    executionId: string,
    limit: number,
  ): Promise<ResponseDto<CommandDto[]>> => {
    validateUUID(executionId);

    const result = await WalkRepository.findCommandsByExecutionId(
      executionId,
      limit,
    );
    return {
      success: true,
      message: 'Commands found successfully',
      result: result,
    };
  },

  // Execution
  createExecution: async (
    data: CreateExecutionDto,
  ): Promise<ResponseDto<ExecutionDto>> => {
    const result = await WalkRepository.createExecution(data);
    return {
      success: true,
      message: 'Execution created successfully',
      result: result,
    };
  },

  updateExecution: async (
    id: string,
    data: UpdateExecutionDto,
  ): Promise<ResponseDto<null>> => {
    validateUUID(id);

    await WalkRepository.updateExecution(id, data).then((result) => {
      if (result.rowCount === 0) {
        log.error('Execution not found for update', { id });
        throw APIError.notFound('Execution not found');
      }
    });

    return {
      success: true,
      message: 'Execution updated successfully',
    };
  },

  findExecutionById: async (
    id: string,
  ): Promise<ResponseDto<ExecutionWithCommandsDto | undefined>> => {
    validateUUID(id);

    const result = await WalkRepository.findExecutionById(id).then((result) => {
      if (!result) {
        throw ExecutionNotFoundError;
      } else {
        return result;
      }
    });

    return {
      success: true,
      message: 'Execution found successfully',
      result: result,
    };
  },

  findExecutionsBySessionId: async (
    sessionId: string,
  ): Promise<ResponseDto<ExecutionWithCommandsDto[]>> => {
    validateUUID(sessionId);

    const result = await WalkRepository.findExecutionsBySessionId(sessionId);

    return {
      success: true,
      message: 'Executions found successfully',
      result: result,
    };
  },

  softDeleteExecution: async (id: string): Promise<ResponseDto<null>> => {
    validateUUID(id);

    await WalkRepository.softDeleteExecution(id).then((result) => {
      if (result.rowCount === 0) {
        log.error('Execution not found for soft delete', { id });
        throw ExecutionNotFoundError;
      }
    });

    await WalkRepository.softDeleteCommandsByExecutionId(id);

    return {
      success: true,
      message: 'Execution deleted successfully',
    };
  },

  restoreExecution: async (id: string): Promise<ResponseDto<null>> => {
    validateUUID(id);

    await WalkRepository.restoreExecution(id).then((result) => {
      if (result.rowCount === 0) {
        log.error('Execution not found for restore', { id });
        throw ExecutionNotFoundError;
      }
    });

    await WalkRepository.restoreCommandsByExecutionId(id);
    return {
      success: true,
      message: 'Execution restored successfully',
    };
  },

  deleteExecution: async (id: string): Promise<ResponseDto<null>> => {
    validateUUID(id);

    await WalkRepository.deleteExecution(id).then((result) => {
      if (result.rowCount === 0) {
        log.error('Execution not found for delete', { id });
        throw APIError.notFound('Execution not found');
      }
    });

    await WalkRepository.deleteCommandsByExecutionId(id);
    return {
      success: true,
      message: 'Execution permanently deleted successfully',
    };
  },
};

export default WalkService;
