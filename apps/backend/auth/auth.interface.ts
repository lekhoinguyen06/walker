import { MaxLen, Min, MinLen } from "encore.dev/validate";
import { ResponseDto } from "../shared/interface";
export interface ApiKeyDto {
  id: number & (Min<0>);
  name: string & (MinLen<8> & MaxLen<50>);
  key: string;

  deleted: boolean;
  createdAt: Date;
  expireAt: Date;

  createdById: number & (Min<0>);
  deletedById?: number & (Min<0>) | null;
}

export type ApiKeyDuration = "7d" | "30d" | "180d";

export type CreateApiKeyDto = Pick<ApiKeyDto, "name"> & { userId: number; duration: ApiKeyDuration; };

export type QueryApiKeyDto = { userId: number; };

export type UpdateApiKeyDto = Partial<Pick<ApiKeyDto, "name"> & { duration: ApiKeyDuration; }> & { id: number; userId: number; };

export type DeleteApiKeyDto = Pick<ApiKeyDto, "id"> & { userId: number; };

export type DeleteAllApiKeysDto = { userId: number; };

export interface ApiKeyResponseDto extends ResponseDto<Pick<ApiKeyDto, "name" | "createdById" | "createdAt" | "expireAt">[]> {}