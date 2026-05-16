import z from "zod";
import { InvalidUUIDError } from "./error";

export const isValidUUID = (id: string): boolean => {
    return z.uuid().safeParse(id).success;
}

export const validateUUID = (id: string): boolean => {
    if (!isValidUUID(id)) throw InvalidUUIDError;
    return true;
}