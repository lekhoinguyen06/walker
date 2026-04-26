export interface SessionDto {
  id: string;
  userId: string;
  title: string;

  // Metadata
  deleted: boolean;
  retention: number;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  expireAt?: Date | null;
}