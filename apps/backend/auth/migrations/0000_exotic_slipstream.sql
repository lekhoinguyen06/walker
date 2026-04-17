CREATE TABLE IF NOT EXISTS "api_keys" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"key" text,
	CONSTRAINT "api_keys_key_unique" UNIQUE("key")
);
