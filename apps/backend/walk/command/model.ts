import { CommandStatusType } from "./constant";
import type { Action } from "@repo/core";

export interface CommandDto {
    id: string;
    executionId: string;
    payload: Action;
    status: CommandStatusType;

    createdAt: Date;
    updatedAt: Date;
    completedAt: Date | null;
    deletedAt: Date | null;
    deleted: boolean;
}