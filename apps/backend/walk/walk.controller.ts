import { api } from "encore.dev/api";
import WalkService from "./walk.service";
import { CreateExecutionDto, UpdateExecutionDto } from "./execution/dto";
import { ExecutionDto } from "./execution";
import { ResponseDto } from "../shared/dto/response.dto";
import { ExecutionWithCommandsDto } from "./walk.dto";

// REST /walk/execution: CRUD operations for a walk execution (creating a new execution returns the execution ID)
export const create = api(
  { expose: true, auth: true, method: "POST", path: "/walk/execution" },
  async (body: CreateExecutionDto): Promise<ResponseDto<ExecutionDto>> => {
    return await WalkService.createExecution(body);
  }
);

export const update = api(
  { expose: true, auth: true, method: "PUT", path: "/walk/execution/:id" },
  async ({id, body} : { id: string, body: UpdateExecutionDto }): Promise<ResponseDto<null>> => {
    return await WalkService.updateExecution(id, body);
  }
);

export const findById = api(
  { expose: true, auth: true, method: "GET", path: "/walk/execution/:id" },
  async ({id} : { id: string }): Promise<ResponseDto<ExecutionWithCommandsDto<unknown> | undefined>> => {
    return await WalkService.findExecutionById(id);
  }
);

export const findBySessionId = api(
  { expose: true, auth: true, method: "GET", path: "/walk/execution/session/:sessionId" },
  async ({sessionId} : { sessionId: string }): Promise<ResponseDto<ExecutionWithCommandsDto<unknown>[]>> => {
    return await WalkService.findExecutionsBySessionId(sessionId);
  }
);

export const restoreById = api(
  { expose: true, auth: true, method: "POST", path: "/walk/execution/:id/restore" },
  async ({id} : { id: string }): Promise<ResponseDto<null>> => {
    return await WalkService.restoreExecution(id);
  }
);

export const deleteById = api(
  { expose: true, auth: true, method: "DELETE", path: "/walk/execution/:id" },
  async ({id} : { id: string }): Promise<ResponseDto<null>> => {
    return await WalkService.softDeleteExecution(id);
  }
);