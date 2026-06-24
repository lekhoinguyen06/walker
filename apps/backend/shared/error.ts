import { APIError } from 'encore.dev/api';

export const InvalidUUIDError = APIError.invalidArgument('Error.InvalidUUID');
