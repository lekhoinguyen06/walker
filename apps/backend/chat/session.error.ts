import { APIError } from "encore.dev/api";

export const SessionNotFoundError = APIError.notFound("Error.SessionNotFound");