import { ResponseDto } from "../shared/interface";

export interface ApiKeyDto {
  /** ID of the API key */
  id: number;
  /** Name of the API key */
  name: string;
  /** The API key value */
  key: string;
}

export interface CreateApiKeyDto {
  /** Name of the API key */
  name: string;
}

export interface UpdateApiKeyDto {
  /** ID of the API key */
  id: number;
  /** Name of the API key */
  name?: string;
}

export interface ApiKeyResponse extends ResponseDto<ApiKeyDto | ApiKeyDto[]> {}