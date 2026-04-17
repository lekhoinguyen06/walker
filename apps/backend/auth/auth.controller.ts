import { api, APIError } from "encore.dev/api";
import { ApiKeyResponse, CreateApiKeyDto, UpdateApiKeyDto } from "./auth.interface";
import AuthService from "./auth.service";

export const createApiKey = api(
  { expose: true, method: "POST", path: "/auth/api-keys" },
  async (data: CreateApiKeyDto): Promise<ApiKeyResponse> => {
    try {
      const result = await AuthService.createApiKey(data);
      return { success: true, result: result.result };
    } catch (error) {
      throw APIError.aborted(
        error?.toString() || "Error creating API key"
      );
    }
  }
);

export const updateApiKey = api(
  { expose: true, method: "PUT", path: "/auth/api-keys/:id" },
  async (data: UpdateApiKeyDto): Promise<ApiKeyResponse> => {
    try {
      const result = await AuthService.updateApiKey(data);
      return { success: true, result: result.result };
    } catch (error) {
      throw APIError.aborted(
        error?.toString() || "Error updating API key"
      );
    }
  }
);

export const deleteApiKey = api(
  { expose: true, method: "DELETE", path: "/auth/api-keys/:id" },
  async ({ id }: { id: number }): Promise<ApiKeyResponse> => {
    try {
      const result = await AuthService.deleteApiKey(id);
      return { success: true, message: result.message };
    } catch (error) {
      throw APIError.aborted(
        error?.toString() || "Error deleting API key"
      );
    }
  }
);