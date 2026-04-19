// export const sessions = p.pgTable("sessions", {
//   id: p.serial().primaryKey(),
//   userId: p.integer().notNull(),
//   sessionData: p.jsonb().notNull(),
// });

import { Min } from "encore.dev/validate";

export interface Session {
  id: number & (Min<0>);
  userId: number & (Min<0>);
  sessionData: string; 
}

export interface CreateSessionBodyDto {
  userId: number & (Min<0>);
}

export interface CreateSessionResponseDto {
  id: number;
  userId: number;
  sessionData: string;
}

export interface UpdateSessionBodyDto extends Omit<CreateSessionResponseDto, "userId"> {} 

export interface DeleteSessionParamsDto {
  sessionId: number & (Min<0>);
}