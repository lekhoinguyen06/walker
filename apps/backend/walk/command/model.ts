import { CommandStatusType } from './constant';

export interface CommandDto {
  id: string;
  executionId: string;
  payload: unknown;
  status: CommandStatusType;

  createdAt: Date;
  updatedAt: Date;
  completedAt: Date | null;
  deletedAt: Date | null;
  deleted: boolean;
}

export interface CreateCommandDto extends Pick<
  CommandDto,
  'executionId' | 'payload' | 'status'
> {}
