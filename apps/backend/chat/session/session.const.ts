/** Session retention periods in days */
export const SessionRetention = {
    Day: 1,
    Week: 7,
    Month: 30,
    Year: 365,
} as const;

export type SessionRetention = typeof SessionRetention[keyof typeof SessionRetention];

