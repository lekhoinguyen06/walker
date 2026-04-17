import { ResponseDto } from "../shared/interface";
export interface ApiKeyDto {
  id: number;
  name: string;
  key: string;

  deleted: boolean;
  createdAt: Date;
  expireAt: Date;

  createdById: number;
  deletedById?: number;
}

export type ApiKeyDuration = "7d" | "30d" | "180d";

export type CreateApiKeyDto = Pick<ApiKeyDto, "name" | "createdById"> & { duration: ApiKeyDuration; };

export type UpdateApiKeyDto = Partial<Pick<ApiKeyDto, "name" > & { duration: ApiKeyDuration; }> & { id: number; };

export interface ApiKeyResponse extends ResponseDto<ApiKeyDto | ApiKeyDto[]> {}