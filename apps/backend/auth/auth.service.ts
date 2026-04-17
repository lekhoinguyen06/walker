import { ApiKeyResponseDto, CreateApiKeyDto, DeleteApiKeyDto, QueryApiKeyDto, UpdateApiKeyDto } from "./auth.interface";
import { calculateExpireAt, generateApiKey, hashApiKey } from "./utils";
import { db } from "./database";
import { apiKeys } from "./schema";
import { eq, and } from "drizzle-orm";
import { ResponseDto } from "../shared/interface";
import { APIError } from "encore.dev/api";

const AuthService = {
    createApiKey: async (data: CreateApiKeyDto): Promise<ResponseDto<string>> => {
        const newApiKey = generateApiKey();
        const hashedKey = hashApiKey(newApiKey);

        const existingKey = await db.select().from(apiKeys).where(and(eq(apiKeys.name, data.name), eq(apiKeys.createdById, data.userId), eq(apiKeys.deleted, false)));

        if (existingKey.length > 0) {
            throw APIError.alreadyExists("An API key with the same name already exists for this user.");
        }

        await db.insert(apiKeys).values({
            name: data.name,
            key: hashedKey,
            createdById: data.userId,
            expireAt: calculateExpireAt(data.duration),
        })
        return {
            success: true,
            result: newApiKey,
        };
    },

    getApiKeys: async (query: QueryApiKeyDto): Promise<ApiKeyResponseDto> => {
        const result = await db.select().from(apiKeys).where(and(eq(apiKeys.deleted, false), eq(apiKeys.createdById, query.userId)));

        if (result.length === 0) {
            throw APIError.notFound("No API keys found for this user.");
        }
        
        return {
            success: true,
            result: result.map((key) => ({
                name: key.name,
                createdAt: key.createdAt,
                expireAt: key.expireAt,
                createdById: key.createdById,
            })),
        };
    },

    updateApiKey: async (data: UpdateApiKeyDto): Promise<ResponseDto<string>> => {
        const newApiKey = generateApiKey();
        const hashedKey = hashApiKey(newApiKey);

        const doesKeyExist = await db.select().from(apiKeys).where(and(eq(apiKeys.id, data.id), eq(apiKeys.createdById, data.userId), eq(apiKeys.deleted, false)));

        if (doesKeyExist.length === 0) {
            throw APIError.notFound("API key not found for this user.");
        }

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

    deleteApiKey: async (body: DeleteApiKeyDto): Promise<ResponseDto<string>> => {
        await db.update(apiKeys)
            .set({ deleted: true, deletedById: body.userId })
            .where(eq(apiKeys.id, body.id));
        return {
            success: true,
            result: `API key with ID ${body.id} has been deleted.`,
        };
    },

    // DEV ONLY: Permanently deletes all API keys for a user. Use with caution.
    hardDeleteAllApiKeys: async (userId: number): Promise<ResponseDto<string>> => {
        await db.delete(apiKeys).where(eq(apiKeys.createdById, userId));
        return {
            success: true,
            result: `All API keys for user with ID ${userId} have been permanently deleted.`,
        };
    },
};

export default AuthService;