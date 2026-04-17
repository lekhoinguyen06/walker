import { api, APIError } from "encore.dev/api";
import { CreateApiKeyDto, UpdateApiKeyDto } from "./auth.interface";
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
  async ({ id }: { id: number }): Promise<ResponseDto<string>> => {
    try {
      const result = await AuthService.deleteApiKey(id);
      return { success: true, result: result.result };
    } catch (error) {
      throw APIError.aborted(
        error?.toString() || "Error deleting API key"
      );
    }
  }
);