import { openapiDocument } from "../src/openapi";

async function generate() {
  await Bun.write(
    "./walker-server.openapi.json",
    JSON.stringify(openapiDocument, null, 2),
  );
}

generate()
  .then(() => {
    console.log("OpenAPI document generated successfully.");
  })
  .catch((error) => {
    console.error("Error generating OpenAPI document:", error);
  });
