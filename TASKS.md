# Tasks

## Todo

- Lock walk input after submit
- Format json for Walk inspection using
- Error toasting

```ts
import * as prettier from "https://unpkg.com/prettier@3.9.6/standalone.mjs";

const jsonCode = `{"name":"John","age":30,"active":true}`;

const formatted = await prettier.format(jsonCode, {
  parser: "json",
});
```

- Use useObject for both generating object and await next()
- Provide ctx for mapper
- Detail logging
- Write v1 API tests
- Integrate Typedoc with Mintlify
- Deploy `@walker/core` v0.1.0 and `@walker/react` v0.1.0 to npm

## Backlog
