import { CommandStatusType, TypeOfCommandPayload } from "./constant";
import { CommandPayload } from "./type";

export interface CommandDto<T = unknown | CommandPayload> {
    id: string;
    executionId: string;
    payloadType: TypeOfCommandPayload;
    payload: T;
    status: CommandStatusType;

    createdAt: Date;
    updatedAt: Date;
    completedAt: Date | null;
    deletedAt: Date | null;
    deleted: boolean;
}