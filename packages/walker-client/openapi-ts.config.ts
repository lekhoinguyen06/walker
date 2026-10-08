import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "../walker-server/walker-server.openapi.json",
  output: "src/client",
});
