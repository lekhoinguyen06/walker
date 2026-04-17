import { createHash, randomBytes } from "crypto";
import { ApiKeyDuration } from "./auth.interface";

export function generateApiKey(): string {
    return 'sk_' + randomBytes(32).toString('hex');
}

export function hashApiKey(apiKey: string): string {
    return createHash('sha256').update(apiKey).digest('hex');
}

export function calculateExpireAt(duration: ApiKeyDuration): Date {
    const now = new Date();
    switch (duration) {
        case "7d":
            now.setDate(now.getDate() + 7);
            break;
        case "30d":
            now.setDate(now.getDate() + 30);
            break;
        case "180d":
            now.setDate(now.getDate() + 180);
            break;
    }
    return now;
}