import { getApiWalkerHealth } from "./client";
import { createClient } from "./client/client";

const walkerClient = createClient({
  baseUrl: "http://localhost:6767",
});

const result = await getApiWalkerHealth({
  client: walkerClient,
});

console.log(result.data);
