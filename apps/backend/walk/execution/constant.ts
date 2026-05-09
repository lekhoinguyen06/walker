export const ExecutionStatus = {
    PENDING: "pending",
    RUNNING: "running",
    COMPLETED: "completed",
    CANCELLED: "cancelled",
    FAILED: "failed",
} as const;

export const ExecutionStatusEnum = Object.values(ExecutionStatus);

// Type exports
export type ExecutionStatusType = typeof ExecutionStatus[keyof typeof ExecutionStatus];