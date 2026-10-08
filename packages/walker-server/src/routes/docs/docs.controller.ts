import { openapiDocument } from "../../openapi";

const html = `
<!doctype html>
<html>
  <head>
    <title>API Reference</title>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <div id="app"></div>
    <script type="module">
      import { createApiReference } from 'https://cdn.jsdelivr.net/npm/@scalar/api-reference/esm.js'
      createApiReference('#app', {
        // The URL of the OpenAPI document
        url: 'http://localhost:6767/api/walker/specs',
      })
    </script>
  </body>
</html>
`;

export const docsController = async () => {
  return new Response(html, {
    headers: {
      "Content-Type": "text/html",
    },
  });
};

export const specsController = async () => {
  return openapiDocument;
};
