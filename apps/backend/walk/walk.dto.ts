import { CommandDto } from './command';
import { ExecutionDto } from './execution';

export interface ExecutionWithCommandsDto extends ExecutionDto {
  commands: CommandDto[];
}
