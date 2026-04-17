import { CreateApiKeyDto, UpdateApiKeyDto } from "./auth.interface";
import { calculateExpireAt, generateApiKey, hashApiKey } from "./utils";
import { db } from "./database";
import { apiKeys } from "./schema";
import { eq } from "drizzle-orm";
import { ResponseDto } from "../shared/interface";

const AuthService = {
    createApiKey: async (data: CreateApiKeyDto): Promise<ResponseDto<string>> => {
        const newApiKey = generateApiKey();
        const hashedKey = hashApiKey(newApiKey);
        await db.insert(apiKeys).values({
            name: data.name,
            key: hashedKey,
            createdById: data.createdById,
            expireAt: calculateExpireAt(data.duration),
        });
        return {
            success: true,
            result: newApiKey,
        };
    },

    updateApiKey: async (data: UpdateApiKeyDto): Promise<ResponseDto<string>> => {
        const newApiKey = generateApiKey();
        const hashedKey = hashApiKey(newApiKey);
        await db.update(apiKeys)
            .set({
                name: data.name,
                key: hashedKey,
                expireAt: data.duration ? calculateExpireAt(data.duration) : undefined,
            })
            .where(eq(apiKeys.id, data.id));
        return {
            success: true,
            result: newApiKey,
        };
    },

    deleteApiKey: async (id: number): Promise<ResponseDto<string>> => {
        await db.delete(apiKeys).where(eq(apiKeys.id, id));
        return {
            success: true,
            result: `API key with ID ${id} has been deleted.`,
        };
    },
};

export default AuthService;