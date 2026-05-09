import { ExecutionDto } from "./model";

export interface CreateExecutionDto extends Pick<ExecutionDto, "sessionId" | "purpose"> {}

export interface UpdateExecutionDto extends Partial<Pick<ExecutionDto, "sessionId" | "purpose" | "status" | "completedAt">> {}