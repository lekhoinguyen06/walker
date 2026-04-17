import { PaginatedDto, ResponseDto } from "../shared/interface";

export interface UserDto {
  /** ID of the user */
  id: number;
  /** Name of the user */
  name: string;
  /** Surname of the user */
  surname: string;
}

export interface CreateUserDto {
  /** Name of the user */
  name: string;
  /** Surname of the user */
  surname: string;
}

export interface UpdateUserDto {
  /** Name of the user */
  name?: string;
  /** Surname of the user */
  surname?: string;
}

export interface UserResponse extends ResponseDto<UserDto | UserDto[]> {
  /** Pagination data */
  pagination?: PaginatedDto;
}