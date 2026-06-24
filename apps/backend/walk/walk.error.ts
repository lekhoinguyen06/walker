import { APIError } from 'encore.dev/api';

export const ExecutionNotFoundError = APIError.notFound(
  'Error.ExecutionNotFound',
);
