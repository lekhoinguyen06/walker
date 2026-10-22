import z from "zod";

const MessageSchema = z.object({
  role: z.enum(["user", "assistant", "system"]),
  content: z.string(),
});

export const ChatRequestBodySchema = z.object({
  messages: z.array(MessageSchema),
});

export type ChatRequestBodyDTO = z.infer<typeof ChatRequestBodySchema>;
