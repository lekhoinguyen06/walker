import { CommandDto } from "./command";
import { ExecutionDto } from "./execution";

export interface ExecutionWithCommandsDto<T = unknown> extends ExecutionDto {
    commands: CommandDto<T>[];
}