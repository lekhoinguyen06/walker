import z from "zod";

export const MessageResponseSchema = z.object({
  status: z.number(),
  message: z.string(),
});

export type MessageResponseDTO = z.infer<typeof MessageResponseSchema>;

export const ErrorResponseSchema = z.object({
  status: z.number(),
  error: z.string(),
  message: z.string(),
});

export type ErrorResponseDTO = z.infer<typeof ErrorResponseSchema>;
