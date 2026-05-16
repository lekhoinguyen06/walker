CREATE TYPE "public"."command_status" AS ENUM('drafting', 'executing', 'completed', 'cancelled', 'failed');--> statement-breakpoint
CREATE TYPE "public"."execution_status" AS ENUM('pending', 'running', 'completed', 'cancelled', 'failed');--> statement-breakpoint
CREATE TABLE "command" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"executionId" uuid NOT NULL,
	"payload" jsonb NOT NULL,
	"status" "command_status" DEFAULT 'drafting' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"completedAt" timestamp,
	"deletedAt" timestamp,
	"deleted" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "execution" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"sessionId" uuid NOT NULL,
	"purpose" text NOT NULL,
	"status" "execution_status" DEFAULT 'pending' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"completedAt" timestamp,
	"deletedAt" timestamp,
	"deleted" boolean DEFAULT false NOT NULL
);
