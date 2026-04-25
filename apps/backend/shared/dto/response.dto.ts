export interface ResponseDto<T> {
  /** Indicates if the request was successful */
  success: boolean;
  /** Error message if the request was not successful */
  message?: string;
  /** The result of the request */
  result?: T;
}

export interface PaginatedResDto {
  /** Total number of results */
  count: number;
  /** Number of results per page */
  pageSize: number;
  /** Total number of pages */
  totalPages: number;
  /** Current page number */
  current: number;
}