ALTER TABLE "api_keys" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "api_keys" ALTER COLUMN "key" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "api_keys" ADD COLUMN "deleted" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "api_keys" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "api_keys" ADD COLUMN "expireAt" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "api_keys" ADD COLUMN "createdById" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "api_keys" ADD COLUMN "deletedById" integer;