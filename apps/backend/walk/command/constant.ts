export const CommandStatus = {
    DRAFTING: "drafting",
    EXECUTING: "executing",
    COMPLETED: "completed",
    CANCELLED: "cancelled",
    FAILED: "failed",
} as const;

export const CommandStatusEnum = Object.values(CommandStatus);

export const CommandBaseAction = {
    CLICK: "click",
    INPUT: "input",
    SCROLL: "scroll",
    NAVIGATE: "navigate",
    POLL: "poll",
} as const;

// Type exports
export type CommandStatusType = typeof CommandStatus[keyof typeof CommandStatus];
export type CommandBaseActionType = typeof CommandBaseAction[keyof typeof CommandBaseAction];

