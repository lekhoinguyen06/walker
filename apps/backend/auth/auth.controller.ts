import { api, APIError } from "encore.dev/api";
import { ApiKeyResponseDto, CreateApiKeyDto, DeleteAllApiKeysDto, DeleteApiKeyDto, QueryApiKeyDto, UpdateApiKeyDto } from "./auth.interface";
import AuthService from "./auth.service";
import { ResponseDto } from "../shared/interface";

export const createApiKey = api(
  { expose: true, method: "POST", path: "/auth/api-keys" },
  async (data: CreateApiKeyDto): Promise<ResponseDto<string>> => {
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

export const getApiKeys = api(
  { expose: true, method: "GET", path: "/auth/api-keys" },
  async (query: QueryApiKeyDto): Promise<ApiKeyResponseDto> => {
    try {
      const result = await AuthService.getApiKeys(query);
      return { success: true, result: result.result };
    } catch (error) {
      throw APIError.aborted(
        error?.toString() || "Error fetching API keys"
      );
    }
  }
);

export const updateApiKey = api(
  { expose: true, method: "PUT", path: "/auth/api-keys/:id" },
  async (data: UpdateApiKeyDto): Promise<ResponseDto<string>> => {
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
  async (body: DeleteApiKeyDto): Promise<ResponseDto<string>> => {
    try {
      const result = await AuthService.deleteApiKey(body);
      return { success: true, result: result.result };
    } catch (error) {
      throw APIError.aborted(
        error?.toString() || "Error deleting API key"
      );
    }
  }
);

export const hardDeleteAllApiKeys = api(
  { expose: true, method: "DELETE", path: "/auth/api-keys" },
  async (body: DeleteAllApiKeysDto): Promise<ResponseDto<string>> => {
    try {
      const result = await AuthService.hardDeleteAllApiKeys(body.userId);
      return { success: true, result: result.result };
    } catch (error) {
      throw APIError.aborted(
        error?.toString() || "Error permanently deleting all API keys"
      );
    }
  }
);