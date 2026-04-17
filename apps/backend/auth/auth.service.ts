import { create } from "domain";
import { ApiKeyResponse, CreateApiKeyDto, UpdateApiKeyDto } from "./auth.interface";
import { update } from "../users/user.controller";

const AuthService = {
    createApiKey: async (data: CreateApiKeyDto): Promise<ApiKeyResponse> => {
        return {
            success: true,
            result: {
                id: 1,
                name: data.name,
                key: "generated-api-key",
            },
        };
    },

    updateApiKey: async (data: UpdateApiKeyDto): Promise<ApiKeyResponse> => {
        return {
            success: true,
            result: {
                id: data.id || 1,
                name: data.name || "updated-api-key",
                key: "newly-generated-api-key",
            },
        };
    },

    deleteApiKey: async (id: number): Promise<ApiKeyResponse> => {
        return {
            success: true,
            message: `API key with ID ${id} has been deleted.`,
        };
    }
};

export default AuthService;