/**
 * Since Cloudflare Page does not inject environment variables into the build and every frontend variables are non-sensitive, we manually set them in the code.
 */
export function envFactory(mode: string) {
  console.log("mode", mode);
  if (mode === "production") {
    return {
      "process.env.VITE_APP_ENV": JSON.stringify("production"),
      "process.env.VITE_CHAT_API_URL": JSON.stringify(
        "https://playground-server.khoinguyenbenz.workers.dev",
      ),
      "process.env.VITE_WALK_API_URL": JSON.stringify(
        "https://playground-server.khoinguyenbenz.workers.dev",
      ),
    };
  } else if (mode === "development" || mode === "test") {
    return {
      "process.env.VITE_APP_ENV": JSON.stringify("development"),
      "process.env.VITE_CHAT_API_URL": JSON.stringify("http://localhost:6767"),
      "process.env.VITE_WALK_API_URL": JSON.stringify("http://localhost:6767"),
    };
  } else {
    throw new Error(`Unknown mode: ${mode}`);
  }
}
