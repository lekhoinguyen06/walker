import z from "zod";

export const MessageResponseSchema = z.object({
  status: z.number(),
  message: z.string(),
});

export type MessageResponseDTO = z.infer<typeof MessageResponseSchema>;
