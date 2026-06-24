import { CommandDto } from '../command';
import { ExecutionStatusType } from './constant';

export interface ExecutionDto<T = unknown> {
  id: string;
  sessionId: string;
  purpose: string;
  status: ExecutionStatusType;
  commands: CommandDto[];

  createdAt: Date;
  updatedAt: Date;
  completedAt: Date | null;
  deletedAt: Date | null;
  deleted: boolean;
}
